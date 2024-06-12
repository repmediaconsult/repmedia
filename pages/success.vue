<script setup lang="ts"></script>

<template>
    <div class="space-y-[90px]">
        <div class="flex flex-col gap-10 text-center items-center justify-center max-w-[793px] mx-auto py-10">
            <h1 class="section-header">Payment Successful</h1>
            <span class="h-[200px] w-[200px] rounded-full flex items-center justify-center bg-[#23A26D1F] successful">
                <AppIcon name="successful" />
            </span>
            <p class="paragraph text-[#121212]">
                Your payment has been received and a receipt has been sent to your email. A member of our team will reachout to you within the next 48 hours
            </p>
        </div>
        <AppTestimonials />
    </div>
</template>

<style scoped></style>
