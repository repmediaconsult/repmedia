<script setup lang="ts">
const navLinks = [
    { path: "/", name: "Home" },
    { path: "/#pricing", name: "Pricing" },
    { path: "/#consultation", name: "Consultation" },
    { path: "#contact", name: "Contact Us" },
    { path: "/#about", name: "About Us" },
];

const navIsOpen = ref(true);

const watchWindowResize = () => {
    const innerWidth = window.innerWidth;
    navIsOpen.value = innerWidth > 1028;
};

onMounted(() => window.addEventListener("resize", watchWindowResize));
onUnmounted(() => window.removeEventListener("resize", watchWindowResize));
</script>

<template>
    <nav class="bg-white rounded-[24px] fixed top-12 py-5 z-20 w-full">
        <div class="app-container flex justify-between items-center">
            <AppIcon name="header-logo" />
            <button class="flex lg:hidden flex-col gap-1 shrink-0" @click="navIsOpen = !navIsOpen">
                <span v-for="number in 3" :key="number" class="block h-0.5 w-6 rounded-[100px] bg-black"></span>
            </button>
            <transition name="appear" appear>
                <ul
                    v-if="navIsOpen"
                    class="z-30 absolute lg:static top-[67px] left-0 bg-white w-full lg:w-auto max-w-full items-center justify-center flex-col lg:flex-row flex gap-10 py-10 lg:py-0">
                    <li v-for="link in navLinks" :key="link.path">
                        <NuxtLink
                            :to="link.path"
                            class="text-lg font-medium hover:text-[#3782CA] transition-colors duration-300 pb-1"
                            :class="{
                                'border-b-2 border-current': ($route.hash && link.path.includes($route.hash)) || (!$route.hash && link.path === '/'),
                            }"
                            >{{ link.name }}</NuxtLink
                        >
                    </li>
                </ul>
            </transition>
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
