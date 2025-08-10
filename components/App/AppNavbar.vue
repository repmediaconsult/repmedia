<script setup lang="ts">

const navIsOpen = ref(false);
const showServices = ref(false);
const route = useRoute();
const hamburger = ref(null);
const navKey = ref(0);
const servicesFocused = ref(false);

const isHomePage = computed(() => useRoute().name === "index");

const watchWindowResize = () => {
    const innerWidth = window.innerWidth;
    navIsOpen.value = innerWidth > 1028;
};
const closeServices = () => (showServices.value = false);
const checkMousePos = () => {
    setTimeout(() => {
        if(!servicesFocused.value) showServices.value = false;
    }, 500);
};

onMounted(() => {
    window.addEventListener("resize", watchWindowResize);
    window.addEventListener("scroll", closeServices);
});
onUnmounted(() => {
    window.removeEventListener("resize", watchWindowResize);
    window.removeEventListener("scroll", closeServices);
});

watch(
    () => route,
    (to, from) => {
        navKey.value += 1;
        showServices.value = false;
    },
    { deep: true }
);

</script>

<template>
    <div>
        <nav class="bg-white py-6 lg:py-10 sticky top-0 z-20 w-full">
            <div class="app-container flex justify-between items-center">
                <NuxtLink to="/">
                    <AppIcon name="header-logo" />
                </NuxtLink>
                <NavigationLinks @services_blur = "checkMousePos" :key="navKey" class="hidden lg:flex" v-model="showServices" />
                <transition name="appear" appear>
                    <NavigationLinks @services_blur = "checkMousePos" :key="navKey" v-if="navIsOpen" class="flex lg:hidden" v-model="showServices" />
                </transition>
                <AppConsultationLink id="c-link":class="{ 'hidden lg:flex': $route.name !== 'index' }" />
                <button ref="hamburger" class="flex lg:hidden flex-col gap-1 shrink-0" @click="navIsOpen = !navIsOpen">
                    <span v-for="number in 3" :key="number" class="block h-0.5 w-6 rounded-[100px] bg-black"></span>
                </button>
            </div>
        </nav>

        <Transition>
            <AppNavbarServices @mouseover="servicesFocused = true" v-if="showServices" @close="showServices = false" @mouseleave="showServices = false; servicesFocused = false" />
        </Transition>
    </div>
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

@media only screen and (max-width: 768px) {
    #c-link {
        display: none;
    }
}
</style>
