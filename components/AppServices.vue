<script setup lang="ts">
const services = [
    {
        image: "resume",
        title: "Resume/CV review",
        content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    },
    {
        image: "cover-letter",
        title: "Cover Letter",
        content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    },
    {
        image: "linkedin",
        title: "LinkedIn Optimization",
        content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    },
    {
        image: "business",
        title: "Business Plan",
        content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    },
    {
        image: "portfolio",
        title: "Portfolio Review",
        content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    },
    {
        image: "biography",
        title: "Create a Biography",
        content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    },
];
</script>

<template>
    <section class="pb-[56px] md:pb-[80px]">
        <div class="app-container flex flex-col gap-5 items-center justify-center">
            <p class="section-title !normal-case">What we do</p>
            <div class="space-y-10 w-full">
                <h4 class="section-header text-center">Personal or Corporate Branding?</h4>
                <ul class="services grid gap-5 max-w-[1200px] mx-auto w-full">
                    <ServicesCard v-for="service in services" :key="service.image" :service />
                </ul>
            </div>
        </div>
    </section>
</template>

<style scoped>
.services {
    grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
}
</style>
