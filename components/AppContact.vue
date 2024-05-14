<script setup lang="ts">
const contactOptions = [
  {
    icon: "call",
    label: "Phone Number",
    value: "2349075450934",
    text: "234 (0) 907 545 0934",
    type: "tel",
  },
  {
    icon: "email",
    label: "Email",
    value: "hello@repmedia.com",
    text: "Hello@repmedia.com",
    type: "email",
  },
  {
    icon: "location",
    label: "Location",
    value: "2349075450934",
    text: "London, United Kingdom",
    type: "location",
  },
];
</script>

<template>
  <section class="py-[100px] bg-[#E7F1FC]">
    <div class="app-container flex flex-col gap-5">
      <p class="uppercase text-lg md:text-[24px] text-[#3782CA] font-bold tracking-[-2%]">
        contact us
      </p>
      <div>
        <div class="max-w-[546px] flex flex-col gap-5">
          <h6 class="text-[32px] leading-9 md:text-[48px] md:leading-[72px] font-bold">
            We are here to support you.
          </h6>
          <ul class="flex flex-col gap-6">
            <ContactCard
              v-for="contact in contactOptions"
              :key="contact.icon"
              :contact
            />
          </ul>
        </div>
        <div></div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
