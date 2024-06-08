<script setup lang="ts">
const images = ["/images/hero-1.png", "/images/hero-2.png"];
const currentIndex = ref(0);

const heroTexts = [
    { class: "text-sm top-[128px] pt-[7px] pr-[11px] pb-[5px] pl-[22px] -left-[43px]", text: "CV Revamp" },
    { class: "pt-[5px] pr-[7px] pb-[7px] pl-[11px] top-[86px] -right-9 text-sm", text: "Fresh Graduate" },
    { class: "pl-[17px] pr-[19px] pt-[5px] pb-[5px] -left-[43px] bottom-[54.5px] text-xs", text: "Branding" },
    { class: "pt-[7px] pr-[7px] pb-[5px] pl-[9px] bottom-[21px] right-[49px] text-sm", text: "Startup" },
];

const texts = [
    "Become the one in a million candidate. Make the most out of opportunities and stand out in the competitive job market.",
    "Which of our services are you are interested in?",
];

onMounted(() => {
    setInterval(() => {
        currentIndex.value += 1;
        if (currentIndex.value === images.length) currentIndex.value = 0;
    }, 2000);
});
</script>

<template>
    <section class="min-h-[743px] flex items-center justify-center py-[80px]">
        <div class="app-container flex items-center justify-between gap-8 sm:gap-10 md:gap-12 xl:gap-[63px] flex-wrap lg:flex-nowrap relative z-1">
            <div class="space-y-5 max-w-[660px] xl:max-w-[705px]">
                <div>
                    <p class="text-white font-medium text-xl md:text-[27px] leading-9">Welcome to</p>
                    <div class="typewriter py-1">
                        <h1 class="text-white text-[48px] md:text-[60px] lg:text-[96px] leading-none font-bold">
                            RepMed<span class="text-[#3782CA]">i</span>a.
                        </h1>
                    </div>
                </div>
                <p v-for="(text, index) in texts" :key="index" class="text-white text-base md:text-lg leading-9">{{ text }}</p>
                <div class="flex flex-wrap items-center gap-5">
                    <NuxtLink class="branding bg-white text-[#0F0F0F] border border-black" to="/personal-branding">
                        Personal Branding
                        <AppIcon name="arrow-right-line" />
                    </NuxtLink>
                    <NuxtLink class="branding bg-[#3782CA] text-white" to="/corporate-branding">
                        Corporate Branding
                        <AppIcon name="arrow-right-line" />
                    </NuxtLink>
                </div>
            </div>
            <div class="w-full xl:w-auto flex items-center justify-center relative">
                <img :src="images[currentIndex]" alt="hero image" class="block mx-auto h-auto max-w-full max-h-full" />
                <span
                    v-for="text in heroTexts"
                    :key="text.text"
                    :class="[text.class, 'absolute bg-[#414141] text-white rounded-sm hidden lg:block leading-[28px]']">
                    {{ text.text }}
                    <svg
                        v-if="text.text === 'Fresh Graduate'"
                        class="absolute -bottom-3 -left-1"
                        width="19"
                        height="12"
                        viewBox="0 0 19 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 11.5L18.5 0H8.5L0 11.5Z" fill="#414141" />
                    </svg>
                    <svg
                        v-if="text.text === 'Branding'"
                        class="absolute right-0 -bottom-3"
                        width="19"
                        height="12"
                        viewBox="0 0 19 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.5 11.5L0 0H10L18.5 11.5Z" fill="#414141" />
                    </svg>
                </span>
            </div>
        </div>
    </section>
</template>

<style scoped>
section {
    background-image: url("/images/home-hero.webp");
    background-size: cover;
    background-position: top left;
    background-repeat: no-repeat;
    background-origin: top left;
}

.branding {
    @apply min-w-[196px] rounded-[24px] py-[10px] px-6 inline-flex items-center gap-1 text-base -tracking-[4%];
}

.typewriter h1 {
    @apply w-fit max-w-fit overflow-hidden mr-1 relative;
    white-space: nowrap;
    animation: typing 3.5s steps(40, end);
}

.typewriter h1::after {
    content: "";
    overflow: visible;
    @apply absolute top-1 md:top-2 -right-1 h-10 md:h-[76px] w-2 bg-[#3883cb];
    animation: blink-caret 0.75s step-end infinite;
}

@keyframes typing {
    from {
        width: 0%;
    }
    to {
        width: 100%;
    }
}
@keyframes blink-caret {
    from,
    to {
        background-color: transparent;
    }
    50% {
        background-color: #3883cb;
    }
}
</style>
