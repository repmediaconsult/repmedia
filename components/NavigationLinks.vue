<script setup lang="ts">
const route = useRoute();

const navLinks = [
    { path: "/", name: "Home", hidden: route.name === "index" },
    { path: "", name: "Services", hidden: false },
    { path: "/personalbranding#pricing", name: "Pricing", hidden: false },
    { path: "https://calendly.com/repmediaconsult-info", name: "Consultation", hidden: route.name === "corporatebranding" },
    { path: "/#contact", name: "Contact Us", hidden: route.name === "corporatebranding" || route.name === "personalbranding" },
    { path: "/#about", name: "About Us", hidden: route.name === "index" || route.name === "corporatebranding" || route.name === "personalbranding" },
];

const showServices = defineModel<boolean>({ default: false });
defineEmits<{(event: "services_blur"): void;}>();
</script>

<template>
    <ul
        class="z-30 absolute lg:static top-[77px] left-0 bg-white w-full lg:w-auto max-w-full items-center justify-center flex-col lg:flex-row flex gap-10 py-10 lg:py-0">
        <template v-for="link in navLinks" :key="link.path">
            <template v-if="!link.hidden">
                <button v-if="link.name === 'Services'" class="nav-link !pb-0 flex items-center justify-center" @mouseleave="$emit('services_blur')" @mouseover="showServices = true" @click="showServices = !showServices">
                    Services
                    <AppIcon name="arrow-down-s-line" />
                </button>
                <li v-else :class="{ 'block lg:hidden': link.name === 'Consultation' }">
                    <NuxtLink
                        :to="link.path"
                        class="nav-link"
                        :class="{
                            'border-b-2 border-current':
                                ($route.hash && link.path.includes($route.hash)) || (!$route.hash && link.path === '/' && $route.name !== 'index'),
                        }"
                        :external="link.name === 'Consultation'"
                        >{{ link.name }}</NuxtLink
                    >
                </li>
            </template>
        </template>
    </ul>
</template>

<style scoped>
.nav-link {
    @apply text-lg font-medium hover:text-[#3782CA] transition-colors duration-300 pb-1;
}
</style>
