<script lang="ts" setup>
import { toast } from "vue-sonner";

const active = ref(false);
const file = defineModel<File>("file");

const toggleActive = () => {
    active.value = !active.value;
};

const handleFileUpload = (event: Event, type: "upload" | "drag") => {
    const uploadedFile =
        type === "drag" ? ((event as DragEvent)?.dataTransfer?.files[0] as File) : (((event as InputEvent)?.target as HTMLInputElement)?.files?.[0] as File);
    if (type === "drag") toggleActive();
    const uploadedFileExtension = uploadedFile.name.split(".").pop();
    if (["pdf", "doc", "docx"].includes(uploadedFileExtension!)) {
        if(uploadedFile.size > 5242880) return toast.error("File size must not be more than 5MB");
        file.value = uploadedFile;
    }
};
</script>

<template>
    <div>
        <span class="paragraph">Upload your updated CV </span>
        <FileUploaderResult v-if="file" :file @cancel="file = undefined" />
        <div
            v-else
            :class="{ 'active-dropzone': active }"
            class="bg-white w-full dropzone flex flex-col items-center justify-center gap-5 border-[4px] border-dashed border-[#CBD0DC] rounded-[24px] py-10 px-5 min-h-[200px]"
            @dragenter.prevent="toggleActive"
            @dragleave.prevent="toggleActive"
            @dragover.prevent
            @drop.prevent="handleFileUpload($event, 'drag')">
            <div class="flex flex-col gap-12 items-center justify-center">
                <span class="icon text-[#292D32]">
                    <AppIcon name="upload" />
                </span>
                <div class="flex flex-col items-center justify-center gap-[15px] text-base md:text-xl text-center">
                    <span class="text-[#292D32]">Choose a file or drag & drop it here</span>
                    <span class="text-[#A9ACB4]">.DOC, .DOCX and .PDF formats, up to 5MB</span>
                </div>
            </div>
            <label for="dropzoneFile" class="btn btn-outline border py-[10px] px-6 text-[#0F0F0F] cursor-pointer">Browse</label>
            <input
                type="file"
                id="dropzoneFile"
                class="dropzoneFile"
                accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                @change="handleFileUpload($event, 'upload')"
                hidden />
        </div>
    </div>
</template>

<style scoped>
.dropzone,
label {
    transition: 0.3s ease all;
}

.active-dropzone {
    @apply text-white bg-black;
    border-color: #fff;
}

.active-dropzone span {
    @apply text-white;
}

.active-dropzone label {
    @apply bg-white text-[#0f0f0f];
}
</style>
