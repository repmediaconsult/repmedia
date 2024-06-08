<script setup lang="ts">
const isIndexPage = computed(() => useRoute().name === "index");
</script>

<template>
    <div>
        <AppNavbar />
        <main>
            <slot />
        </main>
        <AppContact v-if="!isIndexPage"  />
        <AppFooter />
    </div>
</template>

<style scoped></style>
