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
        class="group p-5 border border-[#CACACA] bg-[#EFEFEF] rounded-[24px] flex flex-col gap-y-5 hover:border-[#3882CB] hover:bg-[#E7F1FC] transition-colors duration-300">
        <img :src="`/images/${service.image}.png`" :alt="`${service.title}`" class="h-20 w-20" />
        <div class="flex flex-col gap-[15px]">
            <h6 class="text-[#010101] text-[24px] leading-9 font-medium">{{ service.title }}</h6>
            <p class="text-[#010101] opacity-60 text-base">{{ service.content }}</p>
            <button class="btn btn-outline py-[10px] px-[24px] group-hover:bg-black group-hover:text-white" @click="navigateTo('/consultation')">
                Get Started
                <AppIcon name="arrow-right-line" />
            </button>
        </div>
    </li>
</template>

<style scoped></style>
