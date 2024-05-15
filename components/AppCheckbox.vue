<script setup lang="ts">
defineOptions({
    inheritAttrs: false,
});

interface CheckboxProps {
    id: string;
    label?: string;
    name: string;
}

defineProps<CheckboxProps>();

const modelValue = defineModel<string | string[] | never[]>({ default: "" });
</script>

<template>
    <label :for="id" class="cursor-pointer inline-flex items-center">
        <input :id type="checkbox" v-model="modelValue" :checked="!!modelValue" v-bind="$attrs" hidden />
        <div class="box bg-white flex content-center items-center"></div>
        <span class="text-lg text-[#313131]"> {{ label }} </span>
    </label>
</template>

<style scoped>
input:checked + .box::after {
    transform: scale(1);
}

.box {
    @apply h-6 w-6 shrink-0 bg-transparent border-2 border-[#3C3C3C] rounded-sm mr-1;
}

.box::after {
    @apply h-6 w-6;
    content: "";
    background-image: url("@/assets/icons/checkbox.svg");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    transform: scale(0);
}
</style>
