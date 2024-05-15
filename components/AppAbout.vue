<script setup lang="ts">
const about = [
    {
        icon: "vision",
        header: "Our Vision",
        content: "Our vision is to become a leading resume agency company that provides high-quality services and inspiration for our customers.",
    },
    {
        icon: "mission",
        header: "Our Mission",
        content: "Our mission is to provide job packages that are unique, personalized, and cater to individual wants and needs.",
    },
];
</script>

<template>
    <sectio id="about" class="py-[100px] bg-[#E7F1FC]">
        <div class="app-container flex flex-col gap-10 items-center justify-center text-center">
            <p class="section-title">this is us</p>
            <div class="max-w-[980px] mx-auto space-y-1">
                <h4 class="section-header font-medium">We provide the best job experience</h4>
                <p class="text-[#667085] paragraph">
                    We are a team of professionals with a deep passion for career advancement. We believe that job search and career upgrade is a reward for
                    good work
                </p>
            </div>
            <ul class="grid lg:grid-cols-2 gap-x-10 gap-y-5 max-w-[1288px] mx-auto">
                <li v-for="content in about" :key="content.icon" class="bg-white pr-5 pb-6 pl-6 pt-5 flex gap-5 lg:gap-7">
                    <AppIcon :name="content.icon" class="shrink-0" />
                    <div class="text-left space-y-3">
                        <h6 class="text-[#0C141D] text-[24px] lg:text-[36px] leadoing-[52px]" :class="[{ 'font-medium': content.icon === 'vision' }]">
                            {{ content.header }}
                        </h6>
                        <p class="paragraph text-[#667085]">{{ content.content }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </sectio>
</template>

<style scoped>
.grid :deep(svg) {
    @apply w-9 h-9 lg:w-[52px] lg:h-[52px];
}
</style>
