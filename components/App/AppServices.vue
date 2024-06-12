<script setup lang="ts">
const services = [
    {
        image: "resume",
        title: "Resume/CV review",
        content:
            "Your CV makes the first impression, make it count. We will work with you to create a value packed resume highlighting your strengths and experience.",
    },
    {
        image: "cover-letter",
        title: "Cover Letter",
        content: "RepMedia collaborates with you to craft  compelling  personal statements or cover letter for your job applications.",
    },
    {
        image: "linkedin",
        title: "LinkedIn Optimization",
        content: "Leverage the power of LinkedIn to elevate your personal profile and enhance your professional network and visibility. ",
    },
    {
        image: "business",
        title: "Business Plan",
        content: "Book consultation sessions with our business development team to develop and document business roadmaps tailored to your business goals.",
    },
    {
        image: "portfolio",
        title: "Portfolio Review",
        content: "Take your portfolio from good to great. Let industry experts review your portfolio for a compelling showcase of your work and projects.",
    },
    {
        image: "marketing",
        title: "Marketing Strategy",
        content: "Get tips based on evolving market trends and insights to position your brand/business for growth.",
    },
];

const howWeWork = [
    { icon: "article", image: "data.webp", title: "Get Client Data", description: "You send in your current information via our data page / client form." },
    {
        icon: "bank-card",
        image: "payment.webp",
        title: "Make Payment",
        description: "Carefully selecting your category & service interest, make payment to us.",
    },
    {
        icon: "folder",
        image: "finalization.webp",
        title: "Delivery & Review",
        description: "Our standard completion time is 3-4 working days, with a 24-hour emergency option available upon request for an additional fee.",
    },
];
const selected = ref(howWeWork[0]);
</script>

<template>
    <section id="services" class="pt-5">
        <div class="app-container space-y-[60px]">
            <div class="flex flex-col gap-5 items-center justify-center">
                <p class="section-title !normal-case">What we do</p>
                <ul class="services grid gap-5 max-w-[1017px] mx-auto w-full">
                    <ServicesCard v-for="service in services" :key="service.image" :service />
                </ul>
            </div>
            <div
                class="flex flex-wrap items-center justify-between gap-5 max-w-[1017px] mx-auto bg-white border border-[#667085] rounded-[12px] py-10 p-5 md:p-8 lg:p-10">
                <div class="space-y-6">
                    <div class="flex items-center gap-3 lg:gap-5">
                        <span class="block h-[1px] w-8 lg:w-[52px] bg-black"></span>
                        <h1 class="font-medium text-[#0C141D] text-2xl lg:text-[48px] lg:leading-[72px]">How we work</h1>
                    </div>
                    <ul class="space-y-6">
                        <li v-for="item in howWeWork" :key="item.icon" class="flex gap-3 max-w-[406px] cursor-pointer" @click="selected = item">
                            <span
                                class="h-6 w-6 flex items-center justify-center shrink-0 border rounded-full"
                                :class="[item.icon === selected.icon ? 'border-[#3782CA] text-[#3782CA]' : 'border-[#0C141D] text-black']">
                                <AppIcon :name="item.icon" />
                            </span>
                            <div class="space-y-1 md:space-y-2">
                                <h6
                                    class="text-lg lg:text-2xl lg:leading-9 font-medium"
                                    :class="[item.icon === selected.icon ? 'text-[#3782CA]' : 'text-[#0C141D]']">
                                    {{ item.title }}
                                </h6>
                                <p class="text-base text-[#667085]">{{ item.description }}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="">
                    <img :src="`/images/${selected.image}`" :alt="`${selected.title}`" class="block mx-auto max-h-full max-w-full" />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.services {
    grid-template-columns: repeat(auto-fit, minmax(309px, 1fr));
}
</style>
