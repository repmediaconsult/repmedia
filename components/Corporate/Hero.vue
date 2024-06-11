<script setup lang="ts"></script>

<template>
    <section class="py-6 lg:py-10">
        <div class="app-container flex-col flex items-start lg:items-center lg:flex-row justify-between gap-10">
            <div class="max-w-[625px]">
                <span
                    class="inline-block mb-[15px] bg-[#FAFAFA] border border-[#DFDFDF] py-2 px-4 font-medium text-[#212733] rounded-[24px] text-sm md:text-base">
                    🙌 #1 Brand Consultant
                </span>
                <h1 class="mb-3 text-[44px] md:text-[60px] lg:text-[72px] leading-[50px] md:leading-[65px] lg:leading-[77px] text-[#212733] font-bold">
                    The right solutions to scale your business
                </h1>
                <p class="mb-5 md:mb-8 lg:mb-10 text-[#707070] -tracking-[4%] text-base md:text-lg lg:text-xl">
                    Elevate your professional brand and build a distinctive business strategy that accurately represents your goals and appeals to your target
                    audience.
                </p>
                <NuxtLink class="btn btn-outline py-[10px] hover:!bg-[#3782CA] hover:!border-[transparent] px-6" to="#process">
                    Learn More
                    <AppIcon name="arrow-right-line" />
                </NuxtLink>
            </div>
            <div>
                <img src="/images/corporate-branding-hero.webp" alt="corporate branding" />
            </div>
        </div>
    </section>
</template>

<style scoped></style>
