<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { experiences, currencies } from "@/utils/constants";
import { v4 as uuidv4 } from "uuid";
import { toast } from "vue-sonner";
import pricing from "@/data/pricing.json";
import { useRuntimeConfig } from '#app';

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
    currency: { required },
};
const form = reactive({
    goals: "",
    years_of_experience: "",
    role: "",
    milestones: "",
    email: "",
    services: [],
    faster_turnaround: "",
    currency: "",
});
const file = ref<File>();
const base64File = ref("");
const paymentDetails = ref("");
const v$ = useVuelidate(rules, form, { $autoDirty: true });

const formIsInvalid = ref(false);
const isLoading = ref(false);
const paymentCancelled = ref(false);
const flwObj = ref({});
const paymentMeta = ref({});

const selectedPricing = computed(() => {
    if (form.years_of_experience && form.services.length) {
        const selected = pricing.data.find(
            (pricing) => pricing.year_of_experience === form.years_of_experience && form.services.every((service) => pricing.combinations.includes(service))
        );
        const amount = (selected?.amount ?? 1) * (form.faster_turnaround.toLowerCase() === "yes" ? 1.5 : 1);
        return amount - (amount * 0.25);
    }
    return 0;
});

const config = useRuntimeConfig();

const convertedAmount = ref(0);
const convertedData = ref("");
const lastConversion = ref("");

if (process.client) {
  convertedData.value = localStorage.getItem("currencyConversions");
  lastConversion.value = localStorage.getItem("lastConversion");
}

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
            body: { id: response.transaction_id, amount: form.currency == "USD" ? selectedPricing.value : convertedAmount.value, currency: form.currency },
        });
        if (success && data.data.status === "successful") {
            sendPaymentNotification(data);
            sendCustomerEmail();
            isLoading.value = false;

            flwObj.value.close();
            navigateTo({ name: "success" });
        } else navigateTo({ name: "error" });
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
        const { res } = await $fetch<any>("/api/services/email/sg", {
            method: "POST",
            body: {
                content: `Details<br><ul><li>EMAIL: ${form.email}</li><li>ORDER NUMBER: ${order_number}</li></ul>`,
                email: {
                    subject: "Payment cancelled"
                }
            },
        });
        console.log(res);
    }
};

const beginConsultation = async () => {
    v$.value.$touch();
    if (v$.value.$invalid || form.services.length === 0) {
        formIsInvalid.value = true;
        return;
    }

    readFileAsBase64();
    if(form.currency != "USD"){
        if(!convertedData.value){
            await getCurrencyConversions();
        } else{
            const timestamp = Math.round(new Date().getTime() / 1000);
            const min_diff = (timestamp - parseInt(lastConversion.value)) / 60;
            if(min_diff > 60){
                await getCurrencyConversions();
            }
        }

        const converted = convertAmount();
        if(!converted){
            toast.error("An error occurred trying to get currency conversion. Please try again");
            return;
        }
    }
    // Pay with paystack
    // if (paystackScriptLoaded.value) {
    //     isLoading.value = true;
    //     const amount = selectedPricing.value * 100 * 1500;
    //     payWithPaystack({ email: form.email, amount, onSuccess: handlePaymentSuccess, onCancel: handlePaymentCancelled });
    // }
    if (flutterwaveScriptMounted.value) {
        isLoading.value = true;
        const amount = form.currency == "USD" ? selectedPricing.value : convertedAmount.value;
        flwObj.value = payWithFlutterwave({
            customer: { email: form.email, phone_number: "", name: "" },
            currency: form.currency,
            payment_options: "card, banktransfer, ussd",
            amount,
            meta: paymentMeta.value,
            callback: handlePaymentSuccess,
            onclose: handlePaymentCancelled,
        });
    }
};

const getCurrencyConversions = async () => {
    const { success, data } = await $fetch<any>("/api/services/currency/conversions");
    if (success && data?.result === "success") {
        if (process.client) {
            localStorage.setItem("currencyConversions", JSON.stringify(data.conversion_rates ?? null));
            localStorage.setItem("lastConversion", Math.round(new Date().getTime() / 1000).toString());

            convertedData.value = localStorage.getItem("currencyConversions");
            lastConversion.value = localStorage.getItem("lastConversion");
        }
    }
}

const convertAmount: () => boolean = () => {
    if(!localStorage.getItem("currencyConversions")) return false;
    const curr_data = JSON.parse(convertedData.value);
    const amount = (curr_data[form.currency] * selectedPricing.value).toFixed(2);
    convertedAmount.value = parseFloat(amount);
    return true;
}

const readFileAsBase64 = () => {
    const reader = new FileReader();

    reader.onloadend = () => {
        const base64String = reader.result;
        base64File.value = base64String.split(',')[1];
    };

    reader.onerror = (error) => {
        console.error('Error reading file:', error);
    };

    reader.readAsDataURL(file.value);
}

const sendPaymentNotification = async (data: object) => {
    paymentDetails.value = "Payment details<br><ul>";
    Object.entries(form).forEach(([key, value]) => {
        paymentDetails.value += `<li>${key.toUpperCase()}: ${Array.isArray(value) ? value.join(', ') : value}</li>`;
    });
    paymentDetails.value += `<li>PAYMENT REF: ${data.data.tx_ref}</li><li>PAYMENT CHANNEL: ${data.data.payment_type}</li><li>PAYMENT AMOUNT: ${data.data.amount}</li></ul>`;

    const { res } = await $fetch<any>("/api/services/email/sg", {
        method: "POST",
        body: {
            content: paymentDetails.value,
            ...(file.value ? {
                file: {
                    file_name: file.value.name, 
                    base64_file: base64File.value, 
                    type: file.value.type
                }
                }: {}),
            email: {
                subject: "Payment received for consultation"
            }
        },
    });
    console.log(res);
}

const sendCustomerEmail = async () => {
    const services = form.services.join(' | ');
    const content = `Dear Customer,<br><br>
        We're pleased to confirm that your payment has been received, and your ${services} is now in
        progress. The RepMedia team is ready to get started and tailor the results to reflect the best of
        your brand.<br><br>
        Thank you for choosing us to support your professional journey. Once your ${services} is
        complete, we will send it straight to your inbox.<br><br>
        In the meantime, feel free to connect with us on Instagram, LinkedIn or Facebook. If you would
        like to share your experience, we would be grateful for a review. Be sure to tag us as we always
        enjoy hearing from clients like you.<br><br>
        Warm regards<br>
        Bamiyo<br>
        <i>RepMedia</i>`;

    const { res } = await $fetch<any>("/api/services/email/sg", {
        method: "POST",
        body: {
            content,
            email: {
                from: "bamiyo@repmediaconsult.com",
                to: form.email,
                subject: `Your ${services} Payment Has Been Received`
            }
        },
    });
    console.log(res);
}

watch(() => form, (newForm) => {
    paymentMeta.value = {...form};
    paymentMeta.value.services = paymentMeta.value.services.join(', ');
}, { deep: true }
);
</script>

<template>
    <section id="consultation" class="pb-10">
        <div class="app-container flex flex-col gap-[80px]">
            <div class="flex flex-col items-center justify-center text-center max-w-[948px] mx-auto space-y-5">
                <h1 class="section-header">We’d like to know more about you</h1>
                <p class="paragraph">
                    All the information we ask of you is crucial and will be carefully considered to tailor our services to your specific needs. We kindly
                    request you provide detailed responses for each field.
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
                <AppSelect
                    v-model="form.currency"
                    :options="currencies"
                    label="What currency would you like to pay in?"
                    placeholder="Select currency" />
                <p class="text-sm text-[#7E8492]">
                    We are fully GDPR-compliant and you can rest assured that any information you give us
                    is completely secure. Check out our <NuxtLink to="/privacypolicy" class="text-[#3782CA] underline">privacy policy</NuxtLink> for more information.
                </p>
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
