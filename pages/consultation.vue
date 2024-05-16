<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

const sectors = [{ value: "technology", label: "Technology" }];
const experiences = [
    { value: "0_5", label: "0-5 years" },
    { value: "0_5", label: "5-10 years" },
    { value: "0_5", label: "11-15 years" },
    { value: "0_5", label: "15years+" },
];
const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
];

const rules = {
    sector: { required },
    experience: { required },
    goals: { required },
    updated: { required },
    email: { required, email },
};
const form = reactive({
    sector: "",
    experience: "",
    goals: "",
    updated: "",
    email: "",
    services: [],
});
const v$ = useVuelidate(rules, form, { $autoDirty: true });

const formRef = ref<HTMLDivElement | null>(null);
const formIsInvalid = ref(false);

const beginConsultation = () => {
    v$.value.$touch();
    if (v$.value.$invalid) {
        formIsInvalid.value = true;
        return;
    }
};
</script>

<template>
    <section class="pt-[161px] pb-[80px]">
        <div class="app-container flex flex-col gap-[80px]">
            <div class="flex flex-col gap-10 justify-center items-center max-w-[919px] mx-auto">
                <div class="text-center space-y-5">
                    <h1 class="section-header font-bold">Make your career goals come true</h1>
                    <p class="paragraph max-w-[684px] mx-auto text-[#505050]">
                        When you need to improve your resume and meet your career targets, come to us, relax and be taken care of
                    </p>
                </div>
                <button class="btn btn-outline py-[10px] px-[24px]" @click="formRef?.scrollIntoView({ behavior: 'smooth' })">
                    Get Started
                    <AppIcon name="arrow-right-line" />
                </button>
                <div class="relative">
                    <div
                        class="absolute left-4 md:left-6 lg:-left-[53.25px] top-4 md:top-8 bg-white projects px-4 md:px-5 py-2 md:py-[15px] rounded-[16px] flex flex-col items-center justify-center">
                        <span class="flex items-center gap-0.5 font-medium text-[10px] md:text-xs uppercase">
                            <AppIcon name="star" />
                            <span class="opacity-50">Great Project</span>
                        </span>
                        <span class="font-bold text-[#1D1D1D] text-lg md:text-xl lg:text-2xl">800+ CVs</span>
                    </div>
                    <img src="/images/consultation-page.png" alt="consulation" class="block mx-auto h-auto max-w-full max-h-full" />
                </div>
            </div>
            <div ref="formRef" class="flex flex-col items-center justify-center text-center">
                <h1 class="section-header">Let’s get to know you</h1>
                <p class="paragraph">Please fill the form below to help us give you the best Linkedin profile</p>
            </div>
            <div class="flex flex-col gap-10 w-full max-w-[948px] mx-auto">
                <AppSelect v-model="form.sector" :options="sectors" label="What sector do you operate in?" placeholder="Select" />
                <AppSelect v-model="form.experience" :options="experiences" label="How many years of work experience do you have?" placeholder="Select" />
                <AppTextarea
                    v-model="form.goals"
                    label="Goals - e.g, example of a title that you wanna get"
                    placeholder="example of a title that you wanna get"
                    class="font-circular"
                    label-class="!font-normal"
                    input-class="bg-white border border-[#D9DDE3] font-circular text-lg !placeholder:text-lg !placeholder:font-normal h-[156px]" />
                <AppSelect
                    v-model="form.updated"
                    :options
                    label="Do you have your updated resume with your recent workplace for upload?"
                    placeholder="Select" />
                <FileUploader />
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
                        <AppCheckbox v-model="form.services" id="resume" label="Resume/CV Review" name="service" value="resume" />
                        <AppCheckbox v-model="form.services" id="linkedin" label="LinkedIn Optimization" name="service" value="linkedin" />
                    </ul>
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
    </section>
</template>

<style scoped>
.projects {
    box-shadow: 0px 8px 24px 0px #00000026;
}
</style>
