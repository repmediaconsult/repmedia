<script setup lang="ts">
interface InputProps {
    label: string;
    id?: string;
    name?: string;
    required?: boolean;
    inputClass?: string;
    labelClass?: string;
    error?: string;
}

defineProps<InputProps>();

const modelValue = defineModel<string>({ default: "" });
</script>

<template>
    <div class="flex flex-col gap-3 font-plus-jakarta">
        <div class="flex items-center justify-between">
            <label :for="id" class="paragraph" :class="[labelClass, { '!text-[#eb5757]': !!error }]">
                {{ label }}<span v-if="required" class="text-[#FF1616]">*</span>
            </label>
            <span v-if="!!error" class="text-xs md:text-sm text-[#eb5757] font-medium">{{ error }}</span>
        </div>
        <input
            v-model="modelValue"
            type="text"
            :name
            :id
            v-bind="$attrs"
            class="outline-none py-[17px] px-5 bg-[#F8F8F8] rounded-lg w-full placeholder:text-sm placeholder:font-normal"
            :class="[inputClass, { 'border !border-[#eb5757]': !!error }]" />
    </div>
</template>

<style scoped></style>
