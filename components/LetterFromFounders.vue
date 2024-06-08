<script setup lang="ts">
const messages = [
    "Hello,",
    "When Dan and I founded Coreblue in 2016, our dream was to forge a company to pioneer technology solutions for real-world challenges. Our journey has been one of passion and boundless curiosity, driven by the infinite potential that technology offers. Recent times have only magnified this potential, reminding us that the horizon of possibilities is ever-expanding - a true frontier. ",
    "It’s an honour to be invited into our client’s business to work alongside them, helping to deliver some of the best-in-class software where it is critically relied upon.",
    "Our path has been graced with the privilege of partnering with clients around the world, including Europe, America, the Middle East and Asia, seamlessly integrating cutting-edge software into their businesses. We’ve both travelled to several clients in these areas, including multiple trips to Africa to support the launch of a new mobile banking application and into Europe to support our clients on the ground, shoulder to shoulder transforming visions into reality - and we’ve been able to have some fun along the way. ",
    "Developing real solutions alongside our clients and seeing, first-hand, the impact of transforming business operations or breathing life into entirely novel products which open completely new markets has been and continues to be a privilege for the whole team at Coreblue.",
    "If you’re in search of a partner who is not only invested in your technology vision but also committed to understanding your goals, consider working with Coreblue. We commit to being your collaborator, your advocate and a team dedicated to your success.",
];
</script>

<template>
    <section class="py-10">
        <div class="app-container flex flex-col lg:flex-row gap-5">
            <p class="shrink-0 text-[#3782CA] text-xl md:text-2xl lg:text-4xl !leading-9 lg:!leading-[56px] max-w-[261px]">Letter from our Founder</p>
            <div class="space-y-5 max-w-[956px]">
                <ul class="space-y-5">
                    <li v-for="(message, index) in messages" :key="index" class="text-[#7B7B7B] italic text-base md:text-lg lg:text-xl !leading-9">{{ message }}</li>
                </ul>
                <img src="/images/founder-signature.png" class="h-auto block w-auto max-w-[275px] max-h-[86px]" alt="repmedia founder signature" />
                <p class="font-medium text-base lg:text-lg leading-9 text-black">CEO, Rep Media</p>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
