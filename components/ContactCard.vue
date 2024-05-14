<script setup lang="ts">
interface Contact {
  icon: string;
  label: string;
  value: string;
  text: string;
  type: string;
}
interface Props {
  contact: Contact;
}
defineProps<Props>();
</script>

<template>
  <li class="flex items-center gap-5">
    <span
      class="flex items-center justify-center h-[52px] md:h-[64px] w-[52px] md:w-[64px] shrink-0 bg-[#101042] rounded-lg"
    >
      <AppIcon :name="contact.icon" />
    </span>
    <div class="space-y-0.5">
      <p class="text-[#77808B] text-base md:text-lg">{{ contact.label }}</p>
      <p class="text-[#283646] font-medium text-xl md:text-[24px]">
        <a v-if="contact.type === 'tel'" :href="`tel:+${contact.value}`">
          {{ contact.text }}
        </a>
        <a
          v-else-if="contact.type === 'email'"
          :href="`mailto:${contact.value}`"
        >
          {{ contact.text }}
        </a>
        <template v-else>{{ contact.text }}</template>
      </p>
    </div>
  </li>
</template>

<style scoped>
li :deep(svg) {
  height: 24px;
  width: 24px;
}

@media screen and (min-width: 768px) {
  li :deep(svg) {
    height: 40px;
    width: 40px;
  }
}
</style>
