<script setup lang="ts">
interface Props {
    name: string;
    id: string;
    label?: string;
    value: string;
}
const props = defineProps<Props>();
const modelValue = defineModel();

const checked = computed(() => modelValue.value === props.value);
</script>

<template>
    <div class="flex items-center w-fit gap-1">
        <input v-model="modelValue" class="h-5 w-5 cursor-pointer" type="radio" :checked :value :name :id />
        <label :for="id" class="cursor-pointer text-xl text-[#313131]">
            {{ label }}
        </label>
    </div>
</template>

<style scoped>
input {
    accent-color: #000000;
}
</style>
