<script setup lang="ts">
const isIndexPage = computed(() => useRoute().name === "index");
</script>

<template>
    <div>
        <AppNavbar />
        <main>
            <slot />
        </main>
        <AppTestimonials v-if="!isIndexPage" />
        <AppPricing v-if="$route.name !== 'consultation' && !isIndexPage" />
        <AppContact v-if="!isIndexPage"  />
        <AppFooter />
    </div>
</template>

<style scoped></style>
