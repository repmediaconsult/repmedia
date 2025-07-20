<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { experiences, currencies, tone, tone_2, portfolio_type } from "@/utils/constants";
import { v4 as uuidv4 } from "uuid";
import { toast } from "vue-sonner";
import pricing from "@/data/pricing.json";
import { useRuntimeConfig } from '#app';

// const { paystackScriptLoaded, payWithPaystack } = usePaystack();
const { flutterwaveScriptMounted, payWithFlutterwave } = useFlutterwave();

const supabase = useSupabaseClient();
// const config = useRuntimeConfig();

const isChecked1 = ref(false);
const isChecked2 = ref(false);
const isChecked3 = ref(false);
const isChecked4 = ref(false);

const rules = computed(() => ({
    goals: isChecked1.value ? { required } : {},
    years_of_experience: isChecked1.value ? { required } : {},
    role: isChecked1.value ? { required } : {},
    milestones: isChecked1.value ? { required } : {},
    email: { required, email },
    currency: { required },
    name: { required },
    strengths: isChecked1.value ? { required } : {},
    cv_keywords: isChecked1.value ? { required } : {},
    job_description: isChecked2.value ? { required } : {},
    motivation: isChecked2.value ? { required } : {},
    top_skills: isChecked2.value ? { required } : {},
    direct_experience: isChecked2.value ? { required } : {},
    tone: isChecked2.value ? { required } : {},
    linkedin: isChecked3.value ? { required } : {},
    current_job: isChecked3.value ? { required } : {},
    opportunities_types: isChecked3.value ? { required } : {},
    skills: isChecked3.value ? { required } : {},
    profile_tone: isChecked3.value ? { required } : {},
    achievements: isChecked3.value ? { required } : {},
    sections_optimization: isChecked3.value ? { required } : {},
    portfolio_link: isChecked4.value ? { required } : {},
    portfolio_type: isChecked4.value ? { required } : {},
    target_audience: isChecked4.value ? { required } : {},
    proud_projects: isChecked4.value ? { required } : {},
    design_recommendations: isChecked4.value ? { required } : {},
    preferred_platform: isChecked4.value ? { required } : {},
    faster_turnaround: isChecked1.value || isChecked2.value || isChecked3.value ? { required } : {},
}));

const form = reactive({
    goals: "",
    years_of_experience: "",
    role: "",
    milestones: "",
    email: "",
    services: [],
    faster_turnaround: "",
    currency: "",
    name: "",
    whatsapp: "",
    strengths: "",
    cv_keywords: "",
    job_description: "",
    motivation: "",
    top_skills: "",
    direct_experience: "",
    tone: "",
    challenge: "",
    linkedin: "",
    current_job: "",
    opportunities_types: "",
    skills: "",
    profile_tone: "",
    achievements: "",
    sections_optimization: "",
    portfolio_link: "",
    portfolio_type: "",
    target_audience: "",
    proud_projects: "",
    testimonials_or_metrics: "",
    design_recommendations: "",
    preferred_platform: ""
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
        return amount - (amount * 0.1);
    }
    return 0;
});

const config = useRuntimeConfig();

const convertedAmount = ref(0);
const convertedData = ref("");
const lastConversion = ref("");

const sentForm = ref<string[]>([]);

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
    prepareForm();
    paymentDetails.value = "Payment details<br><ul>";
    sentForm.value.map(val => {
        paymentDetails.value += `<li>${val.toUpperCase()}: ${Array.isArray(form[val]) ? form[val].join(', ') : form[val]}</li>`;
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
                to: form.email,
                subject: `Your ${services} Payment Has Been Received`
            }
        },
    });
    console.log(res);
}

const updateForm = (data: Array<any>) => {
    if(data[0] == 1) isChecked1.value = data[1];
    if(data[0] == 2) isChecked2.value = data[1];
    if(data[0] == 3) isChecked3.value = data[1];
    if(data[0] == 4) isChecked4.value = data[1];
}

const prepareForm = () => {
    const req = ['services', 'name', 'email', 'currency'];
    const service_vals = {
        "CV Review": ['whatsapp', 'years_of_experience', 'role', 'strengths', 'goals', 'milestones', 'cv_keywords', 'job_description', 'faster_turnaround'],
        "Cover Letter": ['job_description', 'motivation', 'top_skills', 'direct_experience', 'tone', 'challenge', 'faster_turnaround'],
        "LinkedIn Optimisation": ['linkedin', 'current_job', 'opportunities_types', 'skills', 'profile_tone', 'achievements', 'sections_optimization', 'faster_turnaround'],
        "Biography/Portfolio": ['portfolio_link', 'portfolio_type', 'target_audience', 'proud_projects', 'testimonials_or_metrics', 'design_recommendations', 'preferred_platform'],
    }

    const merged_array = Object.entries(service_vals).filter(([key]) => form.services.includes(key)).flatMap(([_, value]) => value);
    sentForm.value = [...req, ...merged_array];
}

watch(() => form, (newForm) => {
    paymentMeta.value = {...form};
    paymentMeta.value.services = paymentMeta.value.services.join(', ');
}, { deep: true }
);
</script>

<template>
    <section id="consultation" class="pb-10">
        <div class="app-container flex flex-col gap-[40px]">
            <div class="flex flex-col items-center justify-center text-center max-w-[948px] mx-auto space-y-5">
                <h1 class="section-header">We’d like to know more about you</h1>
                <p class="paragraph">
                    All the information we ask of you is crucial and will be carefully considered to tailor our services to your specific needs. We kindly
                    request you provide detailed responses for each field.
                </p>
            </div>
            <div class="flex flex-col gap-10 w-full max-w-[948px] mx-auto">
                <div class="flex flex-col gap-[6px]">
                    <p class="paragraph">Select the services you're interested in.</p>
                    <ul class="flex flex-col gap-5">
                        <AppCheckbox :position="1" @update:checked="updateForm" v-model="form.services" id="resume" label="CV Review" name="service" value="CV Review" />
                        <AppCheckbox :position="2" @update:checked="updateForm" v-model="form.services" id="cover-letter" label="Cover Letter" name="service" value="Cover Letter" />
                        <AppCheckbox :position="3" @update:checked="updateForm" v-model="form.services" id="linkedin" label="LinkedIn Optimisation" name="service" value="LinkedIn Optimisation" />
                        <AppCheckbox :position="4" @update:checked="updateForm" v-model="form.services" id="biography-portfolio" label="Biography/Portfolio" name="service" value="Biography/Portfolio" />
                    </ul>
                </div>
                <AppInput
                    v-model="form.name"
                    name="name"
                    label="Full Name"
                    placeholder=""
                    label-class="!font-normal"
                    input-class="bg-white py-[10px] h-[56px] px-[14px] border border-[#D9DDE3] font-circular !font-normal !text-lg placeholder:text-lg !placeholder:font-normal"
                    class="font-circular" />
                <AppInput
                    v-model="form.email"
                    name="email"
                    label="Email Address"
                    placeholder=""
                    label-class="!font-normal"
                    input-class="bg-white py-[10px] h-[56px] px-[14px] border border-[#D9DDE3] font-circular !font-normal !text-lg placeholder:text-lg !placeholder:font-normal"
                    class="font-circular" />

                    <!-- CV Review -->
                <AppInput
                    v-if="isChecked1"
                    v-model="form.whatsapp"
                    name="whatsapp"
                    label="WhatsApp Number (optional)"
                    placeholder="+44 XXXXX XXXXX"
                    label-class="!font-normal"
                    input-class="bg-white py-[10px] h-[56px] px-[14px] border border-[#D9DDE3] font-circular !font-normal !text-lg placeholder:text-lg !placeholder:font-normal"
                    class="font-circular" />
                    <!-- CV Review -->
                    <!-- Cover letter -->
                <AppInput
                    v-if="isChecked2"
                    v-model="form.job_description"
                    label="Would you like your CV tailored for a specific job posting? If so, paste the job description or link here"
                    placeholder=""
                    label-class="!font-normal"
                    input-class="bg-white py-[10px] h-[56px] px-[14px] border border-[#D9DDE3] font-circular !font-normal !text-lg placeholder:text-lg !placeholder:font-normal"
                    class="font-circular" />
                    <!-- Cover letter -->
                    <!-- Linkedin profile -->
                <AppInput
                    v-if="isChecked3"
                    v-model="form.linkedin"
                    label="Link to your current LinkedIn profile (if available)"
                    placeholder=""
                    label-class="!font-normal"
                    input-class="bg-white py-[10px] h-[56px] px-[14px] border border-[#D9DDE3] font-circular !font-normal !text-lg placeholder:text-lg !placeholder:font-normal"
                    class="font-circular" />
                    <!-- Linkedin profile -->
                    <!-- Portfolio review -->
                <AppInput
                    v-if="isChecked4"
                    v-model="form.portfolio_link"
                    label="Link to your current portfolio (if available)"
                    placeholder=""
                    label-class="!font-normal"
                    input-class="bg-white py-[10px] h-[56px] px-[14px] border border-[#D9DDE3] font-circular !font-normal !text-lg placeholder:text-lg !placeholder:font-normal"
                    class="font-circular" />
                    <!-- Portfolio review -->

                <FileUploader v-model:file="file" />

                <!-- CV Review -->
                <AppSelect
                    v-if="isChecked1"
                    v-model="form.years_of_experience"
                    :options="experiences"
                    label="How many years of total work experience do you have?"
                    placeholder="Select" />
                <AppInput
                    v-if="isChecked1"
                    v-model="form.role"
                    label="What type of role and industry are you targeting with your new CV?"
                    placeholder="e.g., Product Manager - Fintech, Banking"
                    class="font-circular"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] h-[56px] font-circular text-lg !placeholder:text-lg !placeholder:font-normal" />
                <AppInput
                    v-if="isChecked1"
                    v-model="form.strengths"
                    label="What are your top 3 professional strengths or areas of expertise?"
                    placeholder="e.g., Project management, product marketing, data visualisation"
                    class="font-circular"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] h-[56px] font-circular text-lg !placeholder:text-lg !placeholder:font-normal" />
                <AppTextarea
                    v-if="isChecked1"
                    v-model="form.goals"
                    label="What do you do effortlessly as it relates to work?"
                    placeholder="e.g., I know how to turn business ideas into appealing user-centric products"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] font-circular text-lg !placeholder:text-lg !placeholder:font-normal h-[141px]"
                    class="font-circular" />
                <AppTextarea
                    v-if="isChecked1"
                    v-model="form.milestones"
                    label="Please outline notable accomplishments in your work history?"
                    placeholder="e.g., Sr. Product Manager - Jan. 2025 till date. I led the launch of Apple Pay in 5 new markets, securing payments for over 40 million users."
                    class="font-circular"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] font-circular text-lg !placeholder:text-lg !placeholder:font-normal h-[156px]" />
                <AppInput
                    v-if="isChecked1"
                    v-model="form.cv_keywords"
                    label="Do you have any specific keywords, phrases, or skills you'd like emphasized in your CV?"
                    placeholder="e.g., Agile Methodologies, API Design & Experimentation, SQL, Tableau"
                    class="font-circular"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] h-[56px] font-circular text-lg !placeholder:text-lg !placeholder:font-normal" />
                <AppInput
                    v-if="isChecked1"
                    v-model="form.job_description"
                    label="Would you like your CV tailored for a specific job posting? If so, upload or paste the job description or link (Optional)"
                    placeholder=""
                    class="font-circular"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] h-[56px] font-circular text-lg !placeholder:text-lg !placeholder:font-normal" />
                    <!-- CV Review -->

                    <!-- Cover letter -->
                <AppTextarea
                    v-if="isChecked2"
                    v-model="form.motivation"
                    label="What motivates you about this particular role or company?"
                    placeholder=""
                    class="font-circular"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] font-circular text-lg !placeholder:text-lg !placeholder:font-normal h-[156px]" />

                <AppInput
                    v-if="isChecked2"
                    v-model="form.top_skills"
                    label="What are the top 2-3 skills or experiences you want highlighted in your cover letter? "
                    placeholder=""
                    class="font-circular"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] h-[56px] font-circular text-lg !placeholder:text-lg !placeholder:font-normal" />

                <AppInput
                    v-if="isChecked2"
                    v-model="form.direct_experience"
                    label="Have you had any direct experience or success that aligns with the responsibilities of the role?"
                    placeholder="e.g., led a similar project, worked in same industry"
                    class="font-circular"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] h-[56px] font-circular text-lg !placeholder:text-lg !placeholder:font-normal" />

                <AppSelect
                    v-if="isChecked2"
                    v-model="form.tone"
                    :options="tone"
                    label="What tone would you like your cover letter to reflect?"
                    placeholder="Select tone" />

                <AppTextarea
                    v-if="isChecked2"
                    v-model="form.challenge"
                    label="Is there any specific challenge or gap (e.g., career break, job switch) you'd like us to address in the letter? (Optional)"
                    placeholder=""
                    class="font-circular"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] font-circular text-lg !placeholder:text-lg !placeholder:font-normal h-[156px]" />
                    <!-- Cover letter -->

                    <!-- Linkedin profile -->
                <AppInput
                    v-if="isChecked3"
                    v-model="form.current_job"
                    label="What is your current job title and industry?"
                    placeholder="e.g., Project Manager - FinTech"
                    class="font-circular"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] h-[56px] font-circular text-lg !placeholder:text-lg !placeholder:font-normal" />

                <AppInput
                    v-if="isChecked3"
                    v-model="form.opportunities_types"
                    label="What type of opportunities are you hoping to attract via LinkedIn?"
                    placeholder="e.g., recruiters, clients, speaking engagements, new job roles"
                    class="font-circular"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] h-[56px] font-circular text-lg !placeholder:text-lg !placeholder:font-normal" />

                <AppTextarea
                    v-if="isChecked3"
                    v-model="form.skills"
                    label="What are your key skills or unique selling points you'd like to emphasize?"
                    placeholder=""
                    class="font-circular"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] font-circular text-lg !placeholder:text-lg !placeholder:font-normal h-[156px]" />

                <AppSelect
                    v-if="isChecked3"
                    v-model="form.profile_tone"
                    :options="tone_2"
                    label="What tone would you like your profile to have?"
                    placeholder="Select tone" />

                <AppTextarea
                    v-if="isChecked3"
                    v-model="form.achievements"
                    label="Are there achievements, projects, or stories you'd like woven into your profile summary? (Optional)"
                    placeholder=""
                    class="font-circular"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] font-circular text-lg !placeholder:text-lg !placeholder:font-normal h-[156px]" />

                <div v-if="isChecked3" class="flex flex-col gap-[6px]">
                    <p class="paragraph">
                        Would you like us to optimize your headline, about section, and experience section?
                    </p>
                    <div class="flex items-center gap-5">
                        <AppRadio v-model="form.sections_optimization" id="yes" value="yes" name="optimization" label="Yes" />
                        <AppRadio v-model="form.sections_optimization" id="no" value="no" name="optimization" label="No" />
                    </div>
                </div>
                    <!-- Linkedin profile -->

                    <!-- Portfolio review -->
                <AppSelect
                    v-if="isChecked4"
                    v-model="form.portfolio_type"
                    :options="portfolio_type"
                    label="What type of portfolio are you aiming for?"
                    placeholder="Select tone" />

                <AppInput
                    v-if="isChecked4"
                    v-model="form.target_audience"
                    label="Who is your target audience?"
                    placeholder="e.g., recruiters, clients, investors"
                    class="font-circular"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] h-[56px] font-circular text-lg !placeholder:text-lg !placeholder:font-normal" />

                <AppTextarea
                    v-if="isChecked4"
                    v-model="form.proud_projects"
                    label="What 3 projects or pieces are you most proud of and why?"
                    placeholder=""
                    class="font-circular"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] font-circular text-lg !placeholder:text-lg !placeholder:font-normal h-[156px]" />

                <AppTextarea
                    v-if="isChecked4"
                    v-model="form.testimonials_or_metrics"
                    label="Do you have testimonials or metrics you'd like us to include? (Optional)"
                    placeholder=""
                    class="font-circular"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] font-circular text-lg !placeholder:text-lg !placeholder:font-normal h-[156px]" />

                <div v-if="isChecked4" class="flex flex-col gap-[6px]">
                    <p class="paragraph">
                        Would you like help with layout/design recommendations as well?
                    </p>
                    <div class="flex items-center gap-5">
                        <AppRadio v-model="form.design_recommendations" id="yes" value="yes" name="tunraround" label="Yes" />
                        <AppRadio v-model="form.design_recommendations" id="no" value="no" name="tunraround" label="No" />
                    </div>
                </div>

                <AppInput
                    v-if="isChecked4"
                    v-model="form.preferred_platform"
                    label="Do you have a preferred platform for your portfolio?"
                    placeholder="e.g. PDF, Behance, personal website"
                    class="font-circular"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] h-[56px] font-circular text-lg !placeholder:text-lg !placeholder:font-normal" />
                    <!-- Portfolio review -->

                <div v-if="isChecked1 || isChecked2 || isChecked3" class="flex flex-col gap-[6px]">
                    <p class="paragraph">
                        Our standard turnaround time is 3-4 working days. Would you like a 24-hour express service?
                    </p>
                    <div class="flex items-center gap-5">
                        <AppRadio v-model="form.faster_turnaround" id="yes" value="yes" name="tunraround" label="Yes (incurs a 50% surcharge)" />
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
