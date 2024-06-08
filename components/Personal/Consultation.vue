<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { sectors, options, experiences } from "@/utils/constants";
import { v4 as uuidv4 } from "uuid";
import { toast } from "vue-sonner";

const { paystackScriptLoaded, payWithPaystack, generateReferance } = usePaystack();
const supabase = useSupabaseClient();

const rules = {
    sector: { required },
    years_of_experience: { required },
    goals: { required },
    has_updated_resume: { required },
    email: { required, email },
};
const form = reactive({
    sector: "",
    years_of_experience: "",
    goals: "",
    has_updated_resume: "",
    email: "",
    services: [],
    turnaround: "",
});
const file = ref<File>();
const v$ = useVuelidate(rules, form, { $autoDirty: true });

const containerRef = ref<HTMLDivElement | null>(null);
const formIsInvalid = ref(false);
const currentView = ref<"consultation" | "successful">("consultation");
const isLoading = ref(false);

const amountPayable = computed(() => {
    return 1000 * 100;
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
                    currentView.value = "successful";
                    await nextTick();
                    containerRef.value?.scrollIntoView({ behavior: "smooth" });
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

const handlePaymentCancelled = () => {
    isLoading.value = false;
    toast.error("Payment was cancelled.");
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
        <div ref="containerRef" class="app-container">
            <div v-if="currentView === 'consultation'" class="flex flex-col gap-[80px]">
                <div class="flex flex-col items-center justify-center text-center">
                    <h1 class="section-header">Let’s get to know you</h1>
                    <p class="paragraph">Please fill the form below to help us give you the best Linkedin profile</p>
                </div>
                <div class="flex flex-col gap-10 w-full max-w-[948px] mx-auto">
                    <AppSelect v-model="form.sector" :options="sectors" label="What sector do you operate in?" placeholder="Select" />
                    <AppSelect
                        v-model="form.years_of_experience"
                        :options="experiences"
                        label="How many years of work experience do you have?"
                        placeholder="Select" />
                    <AppTextarea
                        v-model="form.goals"
                        label="Goals - e.g, example of a title that you wanna get"
                        placeholder="example of a title that you wanna get"
                        class="font-circular"
                        label-class="!font-normal"
                        input-class="bg-white border border-[#D9DDE3] font-circular text-lg !placeholder:text-lg !placeholder:font-normal h-[156px]" />
                    <AppSelect
                        v-model="form.has_updated_resume"
                        :options
                        label="Do you have your updated resume with your recent workplace for upload?"
                        placeholder="Select" />
                    <FileUploader v-model:file="file" />
                    <AppInput
                        v-model="form.email"
                        label="Email Address"
                        placeholder="enter your email address"
                        label-class="!font-normal"
                        input-class="bg-white py-[10px] px-[14px] border border-[#D9DDE3] font-circular !font-normal !text-lg placeholder:text-lg !placeholder:font-normal"
                        class="font-circular" />
                    <div class="flex flex-col gap-[6px]">
                        <p class="text-[#505050] tetx-lg -tracking-[4%]">Which of these services will you like?</p>
                        <ul class="flex flex-col gap-5">
                            <AppCheckbox v-model="form.services" id="resume" label="Resume/CV Review" name="service" value="Resume/CV Review" />
                            <AppCheckbox v-model="form.services" id="linkedin" label="LinkedIn Optimization" name="service" value="LinkedIn Optimization" />
                            <AppCheckbox v-model="form.services" id="cover-letter" label="Cover Letter" name="service" value="Cover Letter" />
                            <AppCheckbox
                                v-model="form.services"
                                id="biography-portfolio"
                                label="Biography/Portfolio"
                                name="service"
                                value="Biography/Portfolio" />
                        </ul>
                    </div>
                    <div class="flex flex-col gap-[6px]">
                        <p class="text-[#505050] tetx-lg -tracking-[4%]">Do you want a faster turnaround time? This will require a 25% extra charge</p>
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
                        class="border border-black text-black bg-white hover:bg-black hover:text-white w-fit mx-auto px-6 py-[10px] rounded-[24px] transition-colors duration-300 flex items-center gap-1"
                        @click="beginConsultation">
                        Next
                        <AppIcon name="arrow-right-line" />
                    </button>
                </div>
            </div>
            <div v-if="currentView === 'successful'" class="flex flex-col gap-10 text-center items-center justify-center max-w-[793px] mx-auto">
                <h1 class="section-header">Payment Successful</h1>
                <span class="h-[200px] w-[200px] rounded-full flex items-center justify-center bg-[#23A26D1F] successful">
                    <AppIcon name="successful" />
                </span>
                <p class="paragraph text-[#121212]">
                    Your payment has been received and a receipt has been sent to your email. A member of our team will reachout to you within the next 48 hours
                </p>
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
