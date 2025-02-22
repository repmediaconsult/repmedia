<script setup lang="ts">
interface Pricing {
    icon: string;
    name: string;
    description: string;
    pricing: Record<string, number>;
    checklist: { included: boolean; title: string }[];
}
const pricingOptions = [
    { key: "0_5", name: "0 - 5years " },
    { key: "6_10", name: "6 - 10years " },
    { key: "11_15", name: "11 - 15years" },
    { key: "15+", name: "15years+" },
];
const selectedOption = ref("0_5");

const generateChecklist = (cv: boolean, coverLetter: boolean, linkedIn: boolean) => [
    { included: cv, title: "CV Rewrite" },
    { included: coverLetter, title: "Cover Letter" },
    { included: linkedIn, title: "LinkedIn Optimization" },
];

const pricing: Pricing[] = [
    {
        icon: "heart",
        name: "starter",
        description: "A CV rewrite is the first and important step ",
        pricing: { "0_5": 50, "6_10": 70, "11_15": 120, "15+": 170 },
        checklist: generateChecklist(true, false, false),
    },
    {
        icon: "zap",
        name: "popular",
        description: "You can choose CV rewrite and any other option",
        pricing: { "0_5": 70, "6_10": 100, "11_15": 150, "15+": 200 },
        checklist: generateChecklist(true, true, false),
    },
    {
        icon: "crown",
        name: "premium",
        description: "The comprehensive package you need to enhance every aspect of your professional profile.",
        pricing: { "0_5": 100, "6_10": 150, "11_15": 200, "15+": 250 },
        checklist: generateChecklist(true, true, true),
    },
];

const pricingOptionsSelect: Array<Object> = [];
pricingOptions.map(o => pricingOptionsSelect.push({value: o.key, label: o.name}));
</script>

<template>
    <section id="pricing" class="my-[80px]">
        <div class="app-container flex flex-col gap-10">
            <div class="flex flex-col gap-5 text-center justify-center items-center">
                <p class="section-title">pricing</p>
                <h5 class="section-header">Get value for your money with any plan you choose </h5>
                <p class="paragraph max-w-[803px] mx-auto">
                    Select a suitable plan below. Our standard time of completion is 3 days. If you have a custom request or need any of our services under 24
                    hours, click <button class="text-[#3782CA]">here</button>
                </p>
            </div>
            <div class="space-y-5">
                <div class="w-full max-w-[601px] mx-auto">
                    <ul id="org-ys" class="flex overflow-x-scroll gap-[11px] p-1 rounded-[24px] bg-[#161A34] w-full">
                        <li
                            v-for="option in pricingOptions"
                            :key="option.key"
                            class="shrink-0 rounded-[24px] py-[10px] min-w-[140px] flex items-center justify-center text-center cursor-pointer text-sm"
                            :class="[selectedOption === option.key ? 'bg-white text-[#0F0F0F]' : 'text-white bg-transparent']"
                            @click="selectedOption = option.key">
                            {{ option.name }}
                        </li>
                    </ul>
                </div>
                <div style="display: none;" id="mob-ys">
                    <AppSelect
                    @change = "(v: string) => selectedOption = v"
                    :options = "pricingOptionsSelect"
                    placeholder="Select number of years"
                    label="" />
                </div>
                <div class="w-full pricing grid gap-[13px] max-w-[1031px] mx-auto">
                    <div
                        v-for="price in pricing"
                        :key="price.name"
                        class="flex flex-col gap-6 border py-6 px-5 rounded-[24px]"
                        :class="price.name === 'popular' ? 'border-[#CED1D8] bg-[#161A34]' : 'border-[#EDEDED] bg-white'">
                        <div class="flex flex-col gap-4">
                            <div class="flex justify-between">
                                <span
                                    class="flex items-center justify-center h-8 w-8 rounded-full"
                                    :class="[price.name === 'popular' ? 'bg-[#1463FF]' : 'bg-[#F5F5F5]']">
                                    <AppIcon :name="price.icon" />
                                </span>
                                <span v-if="price.name === 'popular'" class="bg-[#1463FF] text-white text-sm py-1 px-3 rounded-[24px] flex items-center"
                                    >Best Offer 🔥</span
                                >
                            </div>
                            <div class="flex flex-col gap-2">
                                <h6 class="capitalize text-[24px] leading-[34px]" :class="price.name === 'popular' ? 'text-white' : 'text-[#1D1E25]'">
                                    {{ price.name }}
                                </h6>
                                <p class="text-sm text-[#7E8492]">{{ price.description }}</p>
                            </div>
                        </div>
                        <h6 class="text-[32px] leading-[42px] -tracking-[1px]" :class="price.name === 'popular' ? 'text-white' : 'text-[#1D1E25]'">
                            ${{ price.pricing[selectedOption] }}
                        </h6>
                        <div class="space-y-4">
                            <p class="font-bold" :class="[price.name === 'popular' ? 'text-white' : 'text-[#1D1E25]']">What’s included:</p>
                            <ul class="space-y-4">
                                <li
                                    v-for="item in price.checklist"
                                    class="text-sm flex items-center gap-2"
                                    :class="[price.name === 'popular' ? 'text-white' : 'text-[#1D1E25]']">
                                    <AppIcon :name="item.included ? 'check-green' : 'check-grey'" />
                                    <span :class="{ 'line-through text-[#7E8492]': !item.included }">{{ item.title }}</span>
                                </li>
                            </ul>
                        </div>
                        <NuxtLink
                            to="#consultation"
                            class="btn mx-auto py-[7px] px-6 text-xl -tracking-[4%] transition-colors duration-300"
                            :class="price.name === 'popular' ? 'bg-white text-[#0F0F0F] hover:bg-[#0F0F0F] hover:text-white' : 'bg-black text-white'">
                            Get Started
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
ul::-webkit-scrollbar {
    @apply hidden;
}
ul {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.pricing {
    grid-template-columns: repeat(auto-fit, minmax(335px, 1fr));
}

@media only screen and (max-width: 610px) {
    #org-ys {
        display: none;
    }
    #mob-ys {
        display: block !important;
    }
}
</style>
