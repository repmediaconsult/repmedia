<script setup lang="ts">
interface InputProps {
  label: string;
  id?: string;
  name?: string;
  required?: boolean;
}

defineProps<InputProps>();
</script>

<template>
  <div class="flex flex-col gap-3 font-plus-jakarta">
    <label :for="id" class="font-semibold text-base">
      {{ label }}<span v-if="required" class="text-[#FF1616]">*</span>
    </label>
    <input
      type="text"
      :name
      :id
      v-bind="$attrs"
      class="outline-none py-[17px] px-5 bg-[#F8F8F8] rounded-lg w-full placeholder:text-sm placeholder:font-normal"
    />
  </div>
</template>

<style scoped></style>
