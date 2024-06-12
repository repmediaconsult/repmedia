<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { sectors, options, experiences } from "@/utils/constants";
import { v4 as uuidv4 } from "uuid";
import { toast } from "vue-sonner";

const { paystackScriptLoaded, payWithPaystack } = usePaystack();
const supabase = useSupabaseClient();

const rules = {
    sector: { required },
    milestones: { required },
    years_of_experience: { required },
    goals: { required },
    has_updated_resume: { required },
    email: { required, email },
};
const form = reactive({
    sector: "",
    years_of_experience: "",
    goals: "",
    milestones: "",
    has_updated_resume: "",
    email: "",
    services: [],
    turnaround: "",
});
const file = ref<File>();
const v$ = useVuelidate(rules, form, { $autoDirty: true });
const paymentCancelled = ref(false);

const formIsInvalid = ref(false);
const isLoading = ref(false);

const amountPayable = computed(() => {
    return 10 * 100;
});

/*
    Handle Paystack Payment Response
    - First of, there's the need to verify the transaction that it works and what not
    - After we confirm that payment was successful,we first then create a new record in the payments data
    - Once payment have been confirmed, we can then go ahead to create the entry for this submission in the database
    - TODO: Maybe email handling and all whatnot
*/
const handlePaymentSuccess = async (response: any) => {
    try {
        const { success, data } = await $fetch<any>(`/api/services/verify/${response.reference}`);

        if (success && data.data.status === "success") {
            // creates a new payment record in the DB
            const paymentUUID = uuidv4();
            const { error } = await supabase.from("payments").insert({
                id: paymentUUID,
                payment_ref: data.data.reference,
                email: data.data.customer.email,
                transaction: data.data.id,
                amount: String(data.data.amount),
                status: data.data.status,
                channel: data.data.channel,
                currency: data.data.currency,
            });
            if (!error) {
                // upload file
                await supabase.storage.from("submission_files").upload(file.value?.name, file.value, { upsert: false });

                // create a new submission record in the db
                const { error } = await supabase.from("submissions").insert({
                    id: uuidv4(),
                    ...form,
                    services: form.services.join(", "),
                    file: file.value?.name,
                    payment_id: paymentUUID,
                });
                if (!error) {
                    isLoading.value = false;
                    navigateTo({ name: "success" });
                }
            }
        }
    } catch (error) {
        isLoading.value = false;
        toast.error("An error occurred trying to complete your request. Please try again");
    } finally {
        isLoading.value = false;
    }
};

const handlePaymentCancelled = async (order_number: string) => {
    isLoading.value = false;
    toast.error("Payment was cancelled.");
    if (!paymentCancelled) {
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
    if (paystackScriptLoaded) {
        isLoading.value = true;
        payWithPaystack({ email: form.email, amount: amountPayable.value, onSuccess: handlePaymentSuccess, onCancel: handlePaymentCancelled });
    }
};
</script>

<template>
    <section id="consultation" class="pb-10">
        <div class="app-container flex flex-col gap-[80px]">
            <div class="flex flex-col items-center justify-center text-center">
                <h1 class="section-header">We’d like to learn more more about you. Let’s get started.</h1>
                <p class="paragraph">
                    All the information we ask of you is crucial and will be carefully considered to tailor our services to your specific needs. We kindly
                    request you provide detailed responses for each field. We are fully GDPR-compliant and you can rest assured that any information you give us
                    is completely secure. Check out our privacy policy for more information.
                </p>
            </div>
            <div class="flex flex-col gap-10 w-full max-w-[948px] mx-auto">
                <AppSelect
                    v-model="form.sector"
                    :options="sectors"
                    label="What do you do effortlessly (This as to pertain to your career / business goals)?"
                    placeholder="Select" />
                <AppSelect
                    v-model="form.years_of_experience"
                    :options="experiences"
                    label="How many years of work experience do you have ?"
                    placeholder="Select" />
                <AppTextarea
                    v-model="form.goals"
                    label="What role(s) or job title(s) would you like to apply for?"
                    placeholder=""
                    class="font-circular"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] font-circular text-lg !placeholder:text-lg !placeholder:font-normal h-[156px]" />
                <!-- <AppSelect
                    v-model="form.has_updated_resume"
                    :options
                    label="Do you have your updated resume with your recent workplace for upload?"
                    placeholder="Select" /> -->
                <AppTextarea
                    v-model="form.milestones"
                    label="Did you achieve any notable milestones during your time at the previously mentioned positions in your CV? If so, please specify (e.g., promotions, sales growth, acquiring new company accounts, receiving awards for projects)."
                    placeholder=""
                    class="font-circular"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] font-circular text-lg !placeholder:text-lg !placeholder:font-normal h-[156px]" />
                <FileUploader v-model:file="file" />
                <AppInput
                    v-model="form.email"
                    name="email"
                    label="Email Address"
                    placeholder="enter your email address"
                    label-class="!font-normal"
                    input-class="bg-white py-[10px] px-[14px] border border-[#D9DDE3] font-circular !font-normal !text-lg placeholder:text-lg !placeholder:font-normal"
                    class="font-circular" />
                <div class="flex flex-col gap-[6px]">
                    <p class="text-[#505050] tetx-lg -tracking-[4%]">Select the services you're interested in.</p>
                    <ul class="flex flex-col gap-5">
                        <AppCheckbox v-model="form.services" id="resume" label="CV Review" name="service" value="CV Review" />
                        <AppCheckbox v-model="form.services" id="linkedin" label="LinkedIn Optimisation" name="service" value="LinkedIn Optimisation" />
                        <AppCheckbox v-model="form.services" id="cover-letter" label="Cover Letter" name="service" value="Cover Letter" />
                        <AppCheckbox
                            v-model="form.services"
                            id="biography-portfolio"
                            label="Biography / Portfolio"
                            name="service"
                            value="Biography / Portfolio" />
                    </ul>
                </div>
                <div class="flex flex-col gap-[6px]">
                    <p class="text-[#505050] tetx-lg -tracking-[4%]">
                        Our standard turnaround time is 3-4 working days. Would you like a 24hours service? This option incurs a 50% surcharge.
                    </p>
                    <div class="flex items-center gap-5">
                        <AppRadio v-model="form.turnaround" id="yes" value="yes" name="tunraround" label="Yes" />
                        <AppRadio v-model="form.turnaround" id="no" value="no" name="tunraround" label="No" />
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
                    <p>Please select an option here</p>
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
