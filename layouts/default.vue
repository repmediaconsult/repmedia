<script setup lang="ts"></script>

<template>
    <div>
        <AppNavbar />
        <main>
            <slot />
        </main>
        <AppTestimonials />
        <AppPricing />
        <AppContact />
        <AppFooter />
    </div>
</template>

<style scoped></style>
