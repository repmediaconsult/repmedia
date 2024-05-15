<script setup lang="ts"></script>

<template>
    <section class="py-[56px] md:py-[90px] bg-white relative">
        <AppIcon name="testimonials-bg-left" class="absolute top-0 left-0 hidden md:block" />
        <AppIcon name="testimonials-bg-left" class="absolute bottom-[68px] right-0 hidden md:block" />
        <div class="app-container flex flex-col gap-6 md:gap-10 justify-center items-center text-center">
            <p class="section-title">testimonials</p>
            <h5 class="text-[#1B2435] section-header">From Our Customers</h5>
            <p class="text-[#313131] max-w-[780px] mx-auto text-center paragraph">
                Feedback occurs when outputs a system are routed back as a inputs as parts of a chain of cause-and-effect that forms a circuit or loop
            </p>
            <ul class="grid gap-5 w-full max-w-[1160px] mx-auto">
                <TestimonialCard />
                <TestimonialCard />
                <TestimonialCard />
            </ul>
        </div>
    </section>
</template>

<style scoped>
ul {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}
</style>
