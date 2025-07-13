<script setup lang="ts">
interface InputProps {
    label: string;
    id?: string;
    name?: string;
    required?: boolean;
    inputClass?: string;
    labelClass?: string;
}

defineProps<InputProps>();

const modelValue = defineModel<string>({ default: "" });
</script>

<template>
    <div class="flex flex-col gap-3 font-plus-jakarta">
        <label :for="id" class="paragraph" :class="labelClass"> {{ label }}<span v-if="required" class="text-[#FF1616]">*</span> </label>
        <textarea
            v-model="modelValue"
            :name
            :id
            v-bind="$attrs"
            class="outline-none py-[17px] px-5 bg-[#F8F8F8] resize-none h-[180px] rounded-lg w-full placeholder:text-sm placeholder:font-normal"
            :class="inputClass" />
    </div>
</template>

<style scoped></style>
