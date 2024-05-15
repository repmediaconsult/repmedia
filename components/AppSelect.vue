<script setup lang="ts">
interface InputProps {
    label: string;
    id?: string;
    name?: string;
    required?: boolean;
    options: { value: string; label: string }[];
    placeholder?: string;
}

defineProps<InputProps>();

const modelValue = defineModel<string>({ default: "" });
</script>

<template>
    <div class="flex flex-col gap-3 relative">
        <label :for="id" class="text-base"> {{ label }}<span v-if="required" class="text-[#FF1616]">*</span> </label>
        <select
            v-model="modelValue"
            :name
            :id
            class="w-full py-[10px] px-[14px] rounded-lg text-lg bg-white -tracking-[4%] border border-[#D9DDE3] text-[#B1B1B1] leading-[30px] appearance-none"
            :placeholder>
            <option selected disabled>{{ placeholder }}</option>
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.label }}
            </option>
        </select>
        <AppIcon name="arrow-down-s-line" class="absolute bg-white bottom-3 md:bottom-4 right-[14px]" />
    </div>
</template>

<style scoped></style>
