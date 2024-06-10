<script setup lang="ts">
const processes = [
    {
        key: "initial",
        image: "initial-consultation.webp",
        title: "Initial Consultation",
        description:
            "Our consultant will start with an initial meeting to understand your vision, followed by a business analysis to review your products/services, and unique selling propositions. Next, we'll conduct market research to analyze  key trends, and study competitors.",
    },
    {
        key: "craft",
        image: "business-strategy.webp",
        title: "Craft a winning Business Strategy",
        description:
            "With your input, we will define the core elements of your business’'s identity, including establishing a clear market position, developing a distinct brand personality and voice, creating a visual identity, and crafting compelling brand messaging.",
    },
    {
        key: "implementation",
        image: "implementation-design.webp",
        title: "Implementation and Design",
        description:
            "Your corporate identity wll be designed consistently across all touchpoints, to reflect your brand's identity, including website and social media profiles.",
    },
    {
        key: "evaluation",
        image: "evaluation.webp",
        title: "Evaluation",
        description:
            "Your success is our heart beat and we won’t stop at providing the strategy but also getting your feedback and providing ongoing support and consultation to address new challenges and opportunities as the business evolves.",
    },
];
const selectedIndex = ref(0);
const interval = ref(null);
const lists = ref<HTMLLIElement[]>([]);

onMounted(() => {
    interval.value = setInterval(() => {
        selectedIndex.value += 1;
        if (selectedIndex.value === processes.length) {
            selectedIndex.value = 0;
        }
    }, 3000);
});

onUnmounted(() => {
    clearInterval(interval.value);
});
</script>

<template>
    <section id="process">
        <div class="app-container space-y-7 lg:space-y-[46px]">
            <p class="bg-[#0C172D] py-3 px-5 lg:px-10 text-white w-fit mx-auto rounded text-base lg:text-xl font-medium lg:font-bold text-center">
                Our 4-step process to meeting your needs
            </p>
            <div class="space-y-10">
                <div class="flex items-center justify-center relative tabs">
                    <ul class="max-w-[1125px] flex flex-nowrap gap-10 mx-auto w-full overflow-y-hidden overflow-x-scroll">
                        <li
                            v-for="(process, index) in processes"
                            class="py-2 lg:py-3 shrink-0 cursor-pointer tex-lg lg:text-2xl"
                            :class="{
                                'border-b-[3px] border-[#3782CA] text-[#3782CA] font-bold': index === selectedIndex,
                                'text-[#212733]': index !== selectedIndex,
                            }"
                            @click="selectedIndex = index">
                            {{ process.title }}
                        </li>
                    </ul>
                </div>
                <div class="max-w-[1187px] mx-auto flex items-center gap-6 flex-wrap">
                    <img :src="`/images/${processes[selectedIndex].image}`" :alt="processes[selectedIndex].title" />
                    <div class="space-y-4 lg:space-y-5 lg:py-12 lg:px-6 max-w-[522px]">
                        <span class="h-12 w-12 lg:h-[72px] lg:w-[72px] rounded-full bg-[#D4E1FF] inline-flex items-center justify-center">
                            <AppIcon name="rocket" />
                        </span>
                        <div class="space-y-3 lg:space-y-4">
                            <h6 class="text-[#212733] text-2xl lg:text-[40px] lg:leading-[52px] font-bold">{{ processes[selectedIndex].title }}</h6>
                            <p class="text-[#212733] text-base lg:text-lg">{{ processes[selectedIndex].description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
span :deep(svg) {
    @apply h-6 w-6 lg:h-10 lg:w-10;
}
ul::-webkit-scrollbar {
    @apply hidden;
}
ul {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.tabs::after {
    content: "";
    @apply h-[1px] w-full bg-[#CACACA] absolute bottom-[1px] -z-[1] max-w-[1125px] mx-auto left-[45%] -translate-x-[45%];
}
</style>
