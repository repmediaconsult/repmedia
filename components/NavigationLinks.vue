<script setup lang="ts">
const navLinks = [
    { path: "/", name: "Home" },
    { path: "/personalbranding#pricing", name: "Pricing" },
    { path: "https://calendly.com/repmediaconsult-info", name: "Consultation" },
    { path: "#contact", name: "Contact Us" },
    { path: "/#about", name: "About Us" },
];
</script>

<template>
    <ul
        class="z-30 absolute lg:static top-[77px] left-0 bg-white w-full lg:w-auto max-w-full items-center justify-center flex-col lg:flex-row flex gap-10 py-10 lg:py-0">
        <li v-for="link in navLinks" :key="link.path" :class="{ 'block lg:hidden': link.name === 'Consultation' }">
            <NuxtLink
                :to="link.path"
                class="text-lg font-medium hover:text-[#3782CA] transition-colors duration-300 pb-1"
                :class="{
                    'border-b-2 border-current': ($route.hash && link.path.includes($route.hash)) || (!$route.hash && link.path === '/' && $route.name !== 'index') ,
                }"
                :external="link.name === 'Consultation'"
                >{{ link.name }}</NuxtLink
            >
        </li>
    </ul>
</template>

<style scoped></style>
