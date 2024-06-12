<script setup lang="ts"></script>

<template>
    <PersonalHero />
    <div class="bg">
        <AppServices />
        <AppPricing />
    </div>
    <PersonalConsultation />
    <AppTestimonials />
</template>

<style scoped>
.bg {
    background-image: url("/images/personal-branding-bg.webp");
    background-position: top left;
    background-repeat: no-repeat;
    background-size: 1504px 1440px;
}
</style>
