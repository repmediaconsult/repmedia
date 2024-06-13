<script setup lang="ts">
interface Service {
    image: string;
    title: string;
    content: string;
}

interface Props {
    service: Service;
}

defineProps<Props>();
</script>

<template>
    <li
        class="group p-3 border border-[#CACACA] bg-[#EFEFEF] rounded-[24px] flex items-start flex-col gap-y-2 hover:border-white hover:bg-[#1B2435] transition-colors duration-300">
        <img :src="`/images/${service.image}.png`" :alt="`${service.title}`" class="block max-h-full max-w-full object-contain" />
        <div class="flex flex-col gap-2">
            <h6 class="text-[#010101] text-xl font-medium group-hover:text-white">{{ service.title }}</h6>
            <p class="text-[#010101] opacity-60 text-sm group-hover:text-white">{{ service.content }}</p>
            <NuxtLink to="#consultation" class="btn py-1 px-3 bg-white text-black text-[10px]">
                Get Started
                <AppIcon name="arrow-right-line" />
            </NuxtLink>
        </div>
    </li>
</template>

<style scoped>
button :deep(svg) {
    @apply w-4 h-4;
}
</style>
