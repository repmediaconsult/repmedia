<script setup lang="ts"></script>

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
                <button class="btn btn-outline py-[10px] px-6 text-base md:text-lg -tracking-[4%]">
                    Get Started
                    <AppIcon name="arrow-right-line" />
                </button>
            </div>
            <div class="w-full md:w-auto flex items-center justify-center">
                <img src="/images/hero.png" alt="hero image" class="block mx-auto h-auto max-w-full max-h-full" />
            </div>
        </div>
    </section>
</template>

<style scoped></style>
