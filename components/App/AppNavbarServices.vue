<script setup lang="ts">
defineEmits<{
    (event: "close"): void;
}>();

const services = {
    Branding: "Logo, flyers, social media content, and website development to elevate your brand.",
    "Business Plan": "Strategic plans that drive business growth and success.",
    "SME Consultation": "Expert advice tailored for small and medium enterprises.",
    "Management Training": "Developing leadership skills for effective management.",
};
</script>

<template>
    <div class="fixed bg-white top-0 min-h-screen md:min-h-fit md:top-[100px] left-0 py-10 md:py-5 w-full z-30">
        <div class="app-container">
            <ul class="flex flex-wrap sm:flex-nowrap gap-5 items-start">
                <li class="flex flex-col items-start gap-y-2 max-w-[215px] shrink-0">
                    <img src="/images/services.webp" alt="services" class="h-auto w-auto block" />
                    <h6>Discuss your project</h6>
                    <p>Ready to talk? Click below to book some time in our calender</p>
                    <a
                        href="https://calendly.com/repmediaconsult-info"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-block bg-black text-white py-[10px] mt-1 px-6 text-sm rounded-full font-normal"
                        >Schedule a call</a
                    >
                </li>
                <div class="flex flex-wrap gap-5">
                    <li v-for="(value, key) in services" class="space-y-2 max-w-[245px]">
                        <h6>{{ key }}</h6>
                        <p>{{ value }}</p>
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
