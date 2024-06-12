<script setup lang="ts">
interface Testimonial {
    image: string;
    person: string;
    role: string;
    message: string;
}
defineProps<{ testimonial: Testimonial }>();
</script>

<template>
    <li class="group bg-[#E7F1FC] hover:bg-[#1B2435] rounded-[24px] py-[56px] px-10 flex flex-col gap-6 relative z-1 transition-colors duration-500">
        <img :src="`/images/${testimonial.image}`" alt="testimonial" class="block mx-auto h-[60px] w-[60px] rounded-full shrink-0" />
        <div class="flex flex-col gap-[10px] items-center justify-center text-center">
            <h6 class="text-[#1B2435] font-bold text-[24px] group-hover:text-white transition-colors duration-200">{{ testimonial.person }}</h6>
            <p class="text-xl font-medium text-[#5E84A1] group-hover:text-[#C6C6C6] transition-colors duration-200">{{ testimonial.role }}</p>
        </div>
        <p class="text-base font-medium -tracking-[4%] text-center group-hover:text-[#FFFFFF] transition-colors duration-200">
            {{ testimonial.message }}
        </p>
    </li>
</template>

<style scoped></style>
