<script setup lang="ts">
const socialMediaLinks = [
  { icon: "", name: "Twitter", url: "" },
  { icon: "", name: "Facebook", url: "" },
  { icon: "", name: "Instagram", url: "" },
  { icon: "", name: "TikTok", url: "" },
];
const footerLinks = [
  { path: "", title: "Services" },
  { path: "", title: "Pricing" },
  { path: "", title: "Consultation" },
  { path: "", title: "Contact Us" },
  { path: "", title: "About us" },
];
</script>

<template>
  <footer class="bg-[#161A34] py-[80px]">
    <div class="app-container">
      <div class="max-w-[1196px] mx-auto flex flex-col gap-[30px]">
        <div class="flex flex-wrap justify-between items-start gap-8">
          <div class="flex flex-wrap items-start gap-x-[100px] gap-y-[30px]">
            <AppIcon name="repmedia" />
            <ul class="flex flex-wrap md:flex-col gap-[29px]">
              <li v-for="link in footerLinks" :key="link.path" class="text-white">
                <NuxtLink to="#">{{ link.title }}</NuxtLink>
              </li>
            </ul>
          </div>
          <div class="flex flex-col gap-[34px]">
            <p class="text-white text-[24px] font-[450]">Our Social Media</p>
            <ul class="flex flex-wrap gap-6">
              <li v-for="link in socialMediaLinks" :key="link.name">
                <a
                  :href="link.url"
                  :title="link.name"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="h-[52px] w-[52px] rounded-full border border-[#747E98] flex items-center justify-center"
                >
                  <AppIcon name="social" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="flex flex-wrap gap-4 justify-between items-center text-white font-dm-sans tracking-[2%] border-t border-[#393C40] pt-[30px]"
        >
          <p>©All rights reserved BlackBird media 2024</p>
          <p class="">Made with love ❤️</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
