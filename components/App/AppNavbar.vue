<script setup lang="ts">
const navLinks = [
    { path: "/", name: "Home" },
    { path: "/#pricing", name: "Pricing" },
    { path: "/#consultation", name: "Consultation" },
    { path: "#contact", name: "Contact Us" },
    { path: "/#about", name: "About Us" },
];

const navIsOpen = ref(false);

const isHomePage = computed(() => useRoute().name === "index");

const watchWindowResize = () => {
    const innerWidth = window.innerWidth;
    navIsOpen.value = innerWidth > 1028;
};

onMounted(() => window.addEventListener("resize", watchWindowResize));
onUnmounted(() => window.removeEventListener("resize", watchWindowResize));
</script>

<template>
    <nav class="bg-white py-10 sticky top-0 z-20 w-full">
        <div class="app-container flex justify-between items-center">
            <NuxtLink to="/">
                <AppIcon name="header-logo" />
            </NuxtLink>
            <button v-if="!isHomePage" class="flex lg:hidden flex-col gap-1 shrink-0" @click="navIsOpen = !navIsOpen">
                <span v-for="number in 3" :key="number" class="block h-0.5 w-6 rounded-[100px] bg-black"></span>
            </button>
            <NavigationLinks v-if="!isHomePage" class="hidden lg:flex" />
            <transition name="appear" appear>
                <NavigationLinks v-if="navIsOpen && !isHomePage" class="flex lg:hidden" />
            </transition>
            <AppConsultationLink class="hidden lg:flex" />
        </div>
    </nav>
</template>

<style scoped>
.appear-enter-from,
.appear-leave-to {
    transform: translateY(-10px);
    opacity: 0;
    z-index: 10;
}

.appear-enter-active,
.appear-leave-active {
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>
