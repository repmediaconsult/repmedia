<script setup lang="ts"></script>

<template>
    <section class="py-10">
        <div class="app-container flex-wrap flex items-center justify-between gap-5">
            <div class="space-y-5 max-w-[613px]">
                <h1 class="text-[50px] md:text-[60px] lg:text-[64px] leading-[52px] mg:leading-[60px] lg:leading-[80px] font-bold tracking-[4%]">
                    Ease into better <span class="text-[#3782CA]">career</span> opportunities
                </h1>
                <p class="paragraph text-[#505050]">
                    Become the one in a million candidate. Make the most out of opportunities and stand out in the competitive job market.
                </p>
                <NuxtLink
                    to="#consultation"
                    class="btn btn-outline hover:!bg-[#3782CA] hover:!border-[transparent] py-[10px] px-6 text-[#0F0F0F] text-sm flex items-center"
                    >Get Started

                    <AppIcon name="arrow-right-line" />
                </NuxtLink>
            </div>
            <div>
                <img src="/images/personal-branding-hero.webp" alt="Personal Branding" />
            </div>
        </div>
    </section>
</template>

<style scoped></style>
