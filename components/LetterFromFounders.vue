<script setup lang="ts">
const messages = [
    "Hello,",
    "I want to take a moment to thank you for visiting our website. This journey, which started as a simple dream, has evolved into a thriving community of creative minds dedicated to shaping extraordinary brands.",
    "Rep Media was born out of a deep passion for storytelling and a desire to help people (regardless of specialty) and businesses express their unique identities. I believe that everyone possesses a unique Super Power that sets them apart, and it is this distinctive quality that defines your brand in every aspect.",
    "To us, a brand is much more than a logo or a tagline; it’s a living, breathing entity that embodies the heart and soul of you. We believe that every brand has a story worth telling, and it’s our mission to help you tell & demonstrate that story in a way that resonates and endures. We approach every project or request with empathy, creativity, and a commitment to excellence, ensuring that your brand is not only seen but also felt by your target - a recruiter/employer and/or an entrepreneur/investor.",
    "We take the time to understand your vision, your values, and your goals. Our collaborative approach means that your voice is heard and reflected in every aspect of the branding process. We don’t just create brands; we build partnerships based on trust, mutual respect, and a shared passion for success.",
    "I invite you to learn more about our services, and reach out to us. Whether you’re a young executive looking to pivot into the job market, an artistic professional needing a portfolio, small startup or a large corporation, we are here to help you bring your brand to life in the most authentic and impactful way possible.",
];
</script>

<template>
    <section id="about" class="py-10">
        <div class="app-container flex flex-col lg:flex-row gap-5">
            <p class="shrink-0 text-[#3782CA] text-xl md:text-2xl lg:text-4xl !leading-9 lg:!leading-[56px] max-w-[261px]">Letter from our Founder</p>
            <div class="space-y-5 max-w-[956px]">
                <ul class="space-y-5">
                    <li v-for="(message, index) in messages" :key="index" class="text-[#7B7B7B] italic text-base md:text-lg lg:text-xl !leading-9">
                        {{ message }}
                    </li>
                </ul>
                <div>
                    <!-- <img src="/images/founder-signature.png" class="h-auto block w-auto max-w-[275px] max-h-[86px]" alt="repmedia founder signature" /> -->
                    <p class="font-semibold text-lg">Bamiyo Awonusi</p>
                    <p class="font-medium">CEO, Rep Media</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
