<script setup lang="ts">
const props = defineProps<{
    file?: File;
}>();
defineEmits<{
    (event: "cancel"): void;
}>();

const fileExtension = props.file?.name.split(".").pop();
const status = ref<"uploading" | "completed">("uploading");
const fileSize = (Number(props?.file?.size ?? 1024) / 1024).toFixed(2) as unknown as number;
const incrementSize = (Number(fileSize) / 3).toFixed(2);
const uploadedChunk = ref(0);

const interval = ref<NodeJS.Timeout>();

interval.value = setInterval(() => {
    uploadedChunk.value += Number(incrementSize);
    console.log(uploadedChunk.value);
    if (uploadedChunk.value >= (fileSize as number)) {
        uploadedChunk.value = fileSize;
        clearInterval(interval.value);
        status.value = "completed";
    }
}, 300);
</script>

<template>
    <div class="bg-[#EEF1F7] py-5 px-5 lg:px-10 rounded-[24px] space-y-5">
        <div class="flex items-start justify-between gap-2 sm:gap-3 md:gap-4">
            <div class="flex items-center gap-2 sm:gap-3 lg:gap-5">
                <span class="relative">
                    <AppIcon name="file" />
                    <span
                        class="uppercase absolute rounded-lg py-0.5 px-1 text-center text-[8px] font-medium min-w-7 leading-1 bottom-2 -left-[10px] text-white"
                        :class="fileExtension === 'pdf' ? 'bg-[#D82042]' : 'bg-[#3f6ab3]'"
                        >{{ fileExtension }}</span
                    >
                </span>
                <div class="space-y-4">
                    <p class="text-[#292D32] text-sm sm:text-base md:text-lg lg:text-xl truncate max-w-[200px] md:max-w-fit">{{ file?.name }}</p>
                    <div class="flex items-center gap-2 md:gap-[10px] text-xs sm:text-sm lg:text-lg">
                        <span class="text-[#A9ACB4]"> {{ uploadedChunk }} KB of {{ fileSize }} KB • </span>
                        <span class="capitalize flex items-center gap-1 sm:gap-[10px] loader">
                            <AppIcon :name="status" />
                            {{ status }}
                        </span>
                    </div>
                </div>
            </div>
            <button class="shrink-0 cancel" @click="$emit('cancel')">
                <AppIcon :name="status === 'uploading' ? 'cancel' : 'delete'" />
            </button>
        </div>
        <span v-if="status === 'uploading'" class="relative block h-[13px] w-full bg-[#CBD0DC] rounded-[100px] overflow-hidden">
            <span
                class="absolute block h-full top-0 left-0 bg-[#3782CA] rounded-[100px] transition-all duration-300"
                :style="{ width: `${(uploadedChunk / fileSize) * 100}%` }"></span>
        </span>
    </div>
</template>

<style scoped>
.cancel :deep(svg) {
    @apply h-5 w-5 md:w-[30px] md:h-[30px];
}
.loader :deep(svg) {
    @apply h-5 w-5 md:w-[25px] md:h-6;
}
</style>
