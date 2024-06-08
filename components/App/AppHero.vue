<script setup lang="ts">
const images = ["/images/hero-1.png", "/images/hero-2.png"];
const currentIndex = ref(0);

const texts = [
    { class: "text-sm top-[128px] pt-[7px] pr-[11px] pb-[5px] pl-[22px] -left-[43px]", text: "CV Revamp" },
    { class: "pt-[5px] pr-[7px] pb-[7px] pl-[11px] top-[86px] -right-9 text-sm", text: "Fresh Graduate" },
    { class: "pl-[17px] pr-[19px] pt-[5px] pb-[5px] -left-[43px] bottom-[54.5px] text-xs", text: "Branding" },
    { class: "pt-[7px] pr-[7px] pb-[5px] pl-[9px] bottom-[21px] right-[49px] text-sm", text: "Startup" },
];

onMounted(() => {
    setInterval(() => {
        currentIndex.value += 1;
        if (currentIndex.value === images.length) currentIndex.value = 0;
    }, 2000);
});
</script>

<template>
    <section class="pb-[160px] pt-[157px] relative overflow-hidden">
        <AppIcon name="hero-lines" class="absolute top-0 left-[50%] -translate-x-[50%]" />
        <AppIcon name="hero-circles" class="absolute bottom-0 right-0" />
        <div class="app-container flex items-center justify-between gap-8 sm:gap-10 md:gap-12 xl:gap-[63px] flex-wrap md:flex-nowrap relative z-1">
            <div class="w-full md:max-w-[560px] xl:max-w-[703px] flex flex-col gap-6 md:gap-8 lg:gap-10">
                <div>
                    <p class="font-medium text-lg lg:text-[27px] leading-[34px] -tracking-[5%]">Welcome to</p>
                    <h1 class="text-[48px] xl:text-[72px] font-bold leading-none">RepMed<span class="text-[#3782CA]">i</span>a.</h1>
                </div>
                <p class="text-base md:text-lg xl:text-2xl text-[#505050]">
                    Ready to boost your brand? We'll craft a cool story, a memorable look, and use digital tricks to keep it in the spotlight. Let's make your
                    brand stand out!
                </p>
                <NuxtLink to="/consultation" class="btn btn-outline py-[10px] px-6 text-base md:text-lg -tracking-[4%]">
                    Get Started
                    <AppIcon name="arrow-right-line" />
                </NuxtLink>
            </div>
            <div class="w-full md:w-auto flex items-center justify-center relative">
                <span
                    v-for="text in texts"
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

                <img :src="images[currentIndex]" alt="hero image" class="block mx-auto h-auto max-w-full max-h-full" />
            </div>
        </div>
    </section>
</template>

<style scoped></style>
