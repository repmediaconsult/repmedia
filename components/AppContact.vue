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
    <section id="contact" class="py-[100px] bg-[#E7F1FC]">
        <div class="app-container flex flex-col gap-5">
            <p class="section-title">contact us</p>
            <div class="flex flex-wrap gap-10">
                <div class="max-w-[546px] flex flex-col gap-5">
                    <h6 class="section-header">We are here to support you.</h6>
                    <ul class="flex flex-col gap-6">
                        <ContactCard v-for="contact in contactOptions" :key="contact.icon" :contact />
                    </ul>
                </div>
                <div class="flex-1 flex flex-col gap-5 min-w-[300px]">
                    <AppInput id="name" name="name" label="Name" placeholder="Your Name" required />
                    <AppInput id="email" name="email" label="Email" placeholder="Email Address" required />
                    <AppTextarea id="description" name="description" label="Description" placeholder="Example..." />
                    <button class="rounded-[24px] bg-[#000000] text-white py-[10px] px-6 w-fit text-xl tracking-[-4%]">Send a message</button>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
