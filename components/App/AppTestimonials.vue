<script setup lang="ts">
const testimonials = [
    {
        image: "aaron.webp",
        person: "Aaron Bankole",
        role: "Graphic Designer",
        message:
            "“ The team helped me go from zero interviews to multiple offers! I still get relevant connections and engagements on my LinkedIn because of their good work.”",
    },
    {
        image: "sarah.webp",
        person: "Sarah Johnson",
        role: "Content Marketing Specialist",
        message:
            "“ I'll always recommend RepMedia. Very attentive to detail and can document your experiences, however big or small. RepMedia cancels the chances of selling yourself short”",
    },
    {
        image: "jesse.webp",
        person: "Jesse Irabor",
        role: "Data Analyst",
        message:
            "“Your portfolio review and cv revamping helped me refine my work and present it in a visually stunning way that I didn't think possible. I got many offers and finally found the perfect role”",
    },
];
</script>

<template>
    <section class="py-[56px] md:py-[90px] bg-white relative">
        <AppIcon name="testimonials-bg-left" class="absolute top-0 left-0 hidden md:block" />
        <AppIcon name="testimonials-bg-left" class="absolute bottom-[68px] right-0 hidden md:block" />
        <div class="app-container flex flex-col gap-6 md:gap-10 justify-center items-center text-center">
            <p class="section-title">testimonials</p>
            <!-- <h5 class="text-[#1B2435] section-header">RepMedia Stories</h5> -->
            <p class="text-[#313131] max-w-[780px] mx-auto text-center paragraph">
                Our clients have many good things to say about our services and the quality of our work.
            </p>
            <ul class="grid gap-5 w-full max-w-[1160px] mx-auto">
                <TestimonialCard v-for="testimonial in testimonials" :key="testimonial.person" :testimonial />
            </ul>
        </div>
    </section>
</template>

<style scoped>
ul {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}
</style>
