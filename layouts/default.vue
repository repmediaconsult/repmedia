<script setup lang="ts"></script>

<template>
    <div>
        <AppNavbar />
        <main>
            <slot />
        </main>
        <AppTestimonials />
        <AppPricing v-if="$route.name !== 'consultation'" />
        <AppContact />
        <AppFooter />
    </div>
</template>

<style scoped></style>
