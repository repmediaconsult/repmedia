<script setup lang="ts">
const socialMediaLinks = [
    { icon: "facebook", name: "Facebook", url: "https://www.facebook.com/repmedia.ng/" },
    { icon: "instagram", name: "Instagram", url: "https://www.instagram.com/repmedia1?igsh=MTZhc3lrMHc1MGU3Ng==" },
    {
        icon: "linkedin",
        name: "LinkedIn",
        url: "https://www.linkedin.com/company/28565083/admin/feed/posts/",
    },
];
const footerLinks = [
    { path: "/#services", title: "Services" },
    { path: "/#pricing", title: "Pricing" },
    { path: "/#consultation", title: "Consultation" },
    { path: "#contact", title: "Contact Us" },
    { path: "/#about", title: "About us" },
];
</script>

<template>
    <footer class="bg-[#161A34] py-[56px] md:py-[80px]">
        <div class="app-container">
            <div class="max-w-[1196px] mx-auto flex flex-col gap-[30px]">
                <div class="flex flex-wrap justify-between items-start gap-14">
                    <div class="flex flex-wrap items-start gap-x-[100px] gap-y-[30px]">
                        <AppIcon name="repmedia" />
                        <ul class="flex flex-wrap gap-[29px]">
                            <li v-for="link in footerLinks" :key="link.path" class="text-white">
                                <NuxtLink :to="link.path">{{ link.title }}</NuxtLink>
                            </li>
                        </ul>
                    </div>
                    <div class="flex flex-col gap-5 md:gap-[34px]">
                        <p class="text-white text-xl md:text-[24px] font-[450]">Our Social Media</p>
                        <ul class="flex flex-wrap gap-6">
                            <li v-for="link in socialMediaLinks" :key="link.name">
                                <a :href="link.url" :title="link.name" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center">
                                    <AppIcon :name="link.icon" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="flex flex-wrap gap-4 justify-between items-center text-white font-dm-sans tracking-[2%] border-t border-[#393C40] pt-[30px]">
                    <p>©All rights reserved RepMedia {{ new Date().getFullYear() }}</p>
                    <p class="">Made with love ❤️</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped></style>
