<script setup lang="ts">
defineEmits<{
    (event: "close"): void;
}>();

const services = [
    {title: "Personal Branding", services: ["Cv rewrite", "Cover letter", "LinkedIn Optimisation"], url: "/personalbranding"},
    {title: "Corporate Branding", services: ["Business plan", "Social Media", "Consultation"], url: "/corporatebranding"}
];
</script>

<template>
    <div class="fixed bg-white top-0 min-h-screen md:min-h-fit md:top-[100px] left-0 py-10 md:py-5 w-full z-30">
        <div class="app-container">
            <ul class="flex flex-wrap sm:flex-nowrap gap-5 items-start">
                <div class="flex flex-wrap gap-5">
                    <li v-for="service in services" class="space-y-2 max-w-[245px]">
                        <h6>{{ service.title }}</h6>
                        <p v-for="item in service.services">
                            <span>- {{ item }}</span>
                        </p>
                        <NuxtLink :to="service.url" class="inline-block bg-black text-white py-[10px] mt-1 px-6 text-sm rounded-full font-normal">See more...</NuxtLink>
                    </li>
                </div>
            </ul>
        </div>
        <button class="absolute top-4 right-4 text-sm font-medium underline md:hidden" @click="$emit('close')">Close</button>
    </div>
</template>

<style scoped>
li h6 {
    @apply text-xl font-medium;
}
li p {
    @apply text-sm -tracking-[4%] text-[#505050] font-normal;
}
</style>
