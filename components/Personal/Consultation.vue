<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { experiences } from "@/utils/constants";
import { v4 as uuidv4 } from "uuid";
import { toast } from "vue-sonner";
import pricing from "@/data/pricing.json";

// const { paystackScriptLoaded, payWithPaystack } = usePaystack();
const { flutterwaveScriptMounted, payWithFlutterwave } = useFlutterwave();

const supabase = useSupabaseClient();
// const config = useRuntimeConfig();

const rules = {
    goals: { required },
    years_of_experience: { required },
    role: { required },
    milestones: { required },
    email: { required, email },
};
const form = reactive({
    goals: "",
    years_of_experience: "",
    role: "",
    milestones: "",
    email: "",
    services: [],
    faster_turnaround: "",
});
const file = ref<File>();
const v$ = useVuelidate(rules, form, { $autoDirty: true });

const formIsInvalid = ref(false);
const isLoading = ref(false);
const paymentCancelled = ref(false);

const selectedPricing = computed(() => {
    if (form.years_of_experience && form.services.length) {
        const selected = pricing.data.find(
            (pricing) => pricing.year_of_experience === form.years_of_experience && form.services.every((service) => pricing.combinations.includes(service))
        );
        return (selected?.amount ?? 1) * (form.faster_turnaround.toLowerCase() === "yes" ? 1.5 : 1);
    }
    return 0;
});

/*
    Handle Paystack/Flutterwave Payment Response
    - First of, there's the need to verify the transaction that it works and what not
    - After we confirm that payment was successful,we first then create a new record in the payments data
    - Once payment have been confirmed, we can then go ahead to create the entry for this submission in the database
    - TODO: Maybe email handling and all whatnot
*/
const handlePaymentSuccess = async (response: any) => {
    try {
        const { success, data } = await $fetch<any>("/api/services/flutterwave/verify", {
            method: "POST",
            body: { id: response.transaction_id, amount: selectedPricing.value, currency: "USD" },
        });
        if (success && data.data.status === "successful") {
            // creates a new payment record in the DB
            const paymentUUID = uuidv4();
            const { error } = await supabase.from("payments").insert({
                id: paymentUUID,
                payment_ref: data.data.tx_ref,
                email: data.data.customer.email,
                transaction: data.data.id,
                amount: String(data.data.amount),
                status: data.data.status,
                channel: data.data.payment_type,
                currency: data.data.currency,
            });
            if (!error) {
                // upload file and get download url
                let download_url = "";
                const fileName = `${new Date().getTime()}_${file.value?.name}`;
                const { error: uploadError } = await supabase.storage.from("submission_files").upload(fileName, file.value, { upsert: false });
                if (!uploadError) {
                    const { data } = await supabase.storage.from("submission_files").getPublicUrl(fileName, { download: true });
                    if (data.publicUrl) download_url = data.publicUrl;
                }
                // create a new submission record in the db
                const commonPayload = {
                    id: uuidv4(),
                    ...form,
                    years_of_experience: experiencesMap[form.years_of_experience],
                    faster_turnaround: form.faster_turnaround || "no",
                    services: form.services.join(", "),
                    file: fileName,
                    payment_id: paymentUUID,
                };
                const { error } = await supabase.from("submissions").insert(commonPayload);
                if (!error) {
                    await $fetch("/api/services/email/success", {
                        method: "POST",
                        body: {
                            ...commonPayload,
                            payment_ref: data.data.tx_ref,
                            currency: data.data.currency,
                            amount: Number(data.data.amount).toLocaleString(),
                            download_url,
                        },
                    });
                    isLoading.value = false;
                    navigateTo({ name: "success" });
                }
            }
        }
    } catch (error) {
        isLoading.value = false;
        console.log(error);
        toast.error("An error occurred trying to complete your request. Please try again");
    } finally {
        isLoading.value = false;
    }
};

const handlePaymentCancelled = async (incomplete: boolean, order_number: string) => {
    console.log('incomplete', incomplete, order_number)
    isLoading.value = false;
    if (incomplete) toast.error("Payment was cancelled.");
    if (!paymentCancelled.value && incomplete) {
        paymentCancelled.value = true;
        await $fetch("/api/services/email/cancelled", { method: "POST", body: { email: form.email, order_number } });
    }
};

const beginConsultation = async () => {
    v$.value.$touch();
    if (v$.value.$invalid || form.services.length === 0) {
        formIsInvalid.value = true;
        return;
    }
    // Pay with paystack
    // if (paystackScriptLoaded.value) {
    //     isLoading.value = true;
    //     const amount = selectedPricing.value * 100 * 1500;
    //     payWithPaystack({ email: form.email, amount, onSuccess: handlePaymentSuccess, onCancel: handlePaymentCancelled });
    // }
    if (flutterwaveScriptMounted.value) {
        isLoading.value = true;
        const amount = selectedPricing.value;
        payWithFlutterwave({
            customer: { email: form.email, phone_number: "", name: "" },
            currency: "USD",
            payment_options: "card, banktransfer, ussd",
            amount,
            callback: handlePaymentSuccess,
            onclose: handlePaymentCancelled,
        });
    }
};
</script>

<template>
    <section id="consultation" class="pb-10">
        <div class="app-container flex flex-col gap-[80px]">
            <div class="flex flex-col items-center justify-center text-center max-w-[948px] mx-auto space-y-5">
                <h1 class="section-header">We’d like to know more about you</h1>
                <p class="paragraph">
                    All the information we ask of you is crucial and will be carefully considered to tailor our services to your specific needs. We kindly
                    request you provide detailed responses for each field. We are fully GDPR-compliant and you can rest assured that any information you give us
                    is completely secure. Check out our <NuxtLink to="/" class="text-[#3782CA] underline">privacy policy</NuxtLink> for more information.
                </p>
            </div>
            <div class="flex flex-col gap-10 w-full max-w-[948px] mx-auto">
                <AppTextarea
                    v-model="form.goals"
                    label="What do you do effortlessly?"
                    placeholder="This as to pertain to your career / business goals"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] font-circular text-lg !placeholder:text-lg !placeholder:font-normal h-[141px]"
                    class="font-circular" />
                <AppSelect
                    v-model="form.years_of_experience"
                    :options="experiences"
                    label="How many years of work experience do you have ?"
                    placeholder="Select" />
                <AppInput
                    v-model="form.role"
                    label="What role(s) or job title(s) would you like to apply for?"
                    placeholder="Enter"
                    class="font-circular"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] h-[56px] font-circular text-lg !placeholder:text-lg !placeholder:font-normal" />
                <FileUploader v-model:file="file" />
                <AppTextarea
                    v-model="form.milestones"
                    label="Did you achieve any notable milestones during your time at the previously mentioned positions in your CV? If so, please specify (e.g., promotions, sales growth, acquiring new company accounts, receiving awards for projects)."
                    placeholder=""
                    class="font-circular"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] font-circular text-lg !placeholder:text-lg !placeholder:font-normal h-[156px]" />
                <AppInput
                    v-model="form.email"
                    name="email"
                    label="Email Address"
                    placeholder="Email address"
                    label-class="!font-normal"
                    input-class="bg-white py-[10px] h-[56px] px-[14px] border border-[#D9DDE3] font-circular !font-normal !text-lg placeholder:text-lg !placeholder:font-normal"
                    class="font-circular" />
                <div class="flex flex-col gap-[6px]">
                    <p class="text-[#505050] tetx-lg -tracking-[4%]">Select the services you're interested in.</p>
                    <ul class="flex flex-col gap-5">
                        <AppCheckbox v-model="form.services" id="resume" label="CV Review" name="service" value="CV Review" />
                        <AppCheckbox v-model="form.services" id="linkedin" label="LinkedIn Optimisation" name="service" value="LinkedIn Optimisation" />
                        <AppCheckbox v-model="form.services" id="cover-letter" label="Cover Letter" name="service" value="Cover Letter" />
                        <AppCheckbox v-model="form.services" id="biography-portfolio" label="Biography/Portfolio" name="service" value="Biography/Portfolio" />
                    </ul>
                </div>
                <div class="flex flex-col gap-[6px]">
                    <p class="text-[#505050] tetx-lg -tracking-[4%]">
                        Our standard turnaround time is 3-4 working days. Would you like a 24 hours service? This option incurs a 50% surcharge.
                    </p>
                    <div class="flex items-center gap-5">
                        <AppRadio v-model="form.faster_turnaround" id="yes" value="yes" name="tunraround" label="Yes" />
                        <AppRadio v-model="form.faster_turnaround" id="no" value="no" name="tunraround" label="No" />
                    </div>
                </div>
            </div>
            <div class="relative w-full">
                <div
                    v-if="formIsInvalid"
                    class="absolute min-w-[308px] -top-[100px] space-y-1 border-[3px] border-[#D30808] py-3 px-5 bg-[#A7081D] rounded-[20px] text-white w-fit mx-auto left-[50%] -translate-x-[50%]">
                    <div class="flex justify-between items-start">
                        <p class="font-medium text-2xl">Oh snap!</p>
                        <button @click="formIsInvalid = false">
                            <AppIcon name="close" />
                        </button>
                    </div>
                    <p>Kindly confirm your inputs</p>
                </div>
                <button
                    class="btn btn-outline hover:!bg-[#3782CA] hover:border-[transparent] w-fit mx-auto px-6 py-[10px] rounded-[24px] transition-colors duration-300 flex items-center gap-1"
                    @click="beginConsultation">
                    Next
                    <AppIcon name="arrow-right-line" />
                </button>
            </div>
        </div>
        <AppLoader :active="isLoading" text="Processing Payment" />
    </section>
</template>

<style scoped>
.projects {
    box-shadow: 0px 8px 24px 0px #00000026;
}
</style>
