<script setup lang="ts">

const policies = [
    {
        title: "Introduction",
        list: [
            `By placing an order with RepMedia, you are agreeing to our Terms and Conditions, which are set out on this page. We recommend that if you disagree with any of these Terms and Conditions, you do not use our website. From time to time, we may decide to change these Terms and Conditions. Should these changes take place after you have placed an order with RepMedia, the original Terms and Conditions at the time of placing your order will apply.<br><br>
A contract with our service will only exist when RepMedia has accepted your order. Occasionally, we may refuse an order without notice but will inform you within 24 hours of your order.<br><br>
All prices listed on the RepMedia website are subject to change without prior notice, and RepMedia does not accept any liability for this. Should our prices change after you have placed an order, then the price at the time of purchase will apply. Should any of our prices reduce and you have placed an order within seven days of this action, we will happily refund you the difference.<br><br>
All content on this site is the property of RepMedia. Unauthorized copying is not permitted.<br><br>
RepMedia goes to great effort to ensure the information on our website is accurate. We only provide advice and accept no liability as a result of inaccuracies in any of the information on the RepMedia website.<br><br>
`
        ]
    },
    {
        title: "Ordering with RepMedia",
        list: [
            `In order to complete your order, we collect personal information such as contact details, education, and employment history. Should this information not be readily available from your order, we will contact you to gather this information, or, in the case that there is only a minor amount of information missing, we will highlight this when sending your completed order back to you.<br><br>
RepMedia takes payment in advance in order to begin your order. This is processed through our online merchant service Flutterwave. However, should you wish to pay by other means, please make contact to discuss alternative methods.<br><br>
Should you place an incorrect order – for example, by selecting the wrong type of CV – we will contact you to advise you of this and will arrange for any difference in cost to be settled. Should you not wish to continue at this stage, we will fully refund you.<br><br>
If we find that, due to the nature of your order, we will fall outside the agreed turnaround time – for example, if the information is very complex – we will contact you to discuss this. Similarly, if we find that due to resources, we will fall outside of the agreed turnaround time, we will contact you to discuss this and agree on any required actions.<br><br>
Once your order has been placed with RepMedia, we may need to arrange a telephone call or email questionnaire to gather all necessary information. The turnaround time pertaining to your order will apply from when all required information has been received. When received, we will write your CV from the information provided, and, where any existing content is deemed fit for purpose, we will use it in the new CV. Your CV will be delivered back in Microsoft Word and PDF format to the email address provided at the time of placing the order. Should there be any information missing, then we will be unable to send your CV in PDF format. However, should you provide the missing information back to RepMedia, we will happily arrange for a PDF version to be sent to you within 48 hours.<br><br>
We do recommend that throughout the process of your order being completed, you check your junk or spam folder. We cannot accept any liability for an order being sent but perceived as not received for this reason. Any additional services ordered – for example, a social media profile – will accompany your completed order, with the exception of copy packs, which will be sent by recorded delivery and first class by Royal Mail within 48 hours of your CV being confirmed as final.<br><br>
Once you have received your order, we will assume your order is complete unless you advise us that adjustments are required. In order to be as efficient as possible, we recommend you outline any required adjustments in an email and send this to info@repmedia.co.uk. Once we have received your email, we will respond if we feel that, based on our experience, your adjustments need to be reconsidered. We aim to complete any requested adjustments within four days of your request. If you would like them completed sooner, please advise us of this so that we may try and do the adjustments sooner. Should adjustments be minimal in nature (for example, one to two sentences), then we recommend you adjust the CV and send it to us so we can review it and advise on any recommendations.<br><br>
We provide our services in good faith, and orders are completed to the best of our knowledge by experienced CV writers. We cannot accept any liability should you suffer any loss or damage as a result of taking our advice.<br><br>

`
        ]
    },{
        title: "Turnaround Times",
        list: [
            `Our turnaround times are average values and may be longer during busier periods. The turnaround time starts once all the necessary information has been collected from the customer, not from when an order has been placed.<br><br>
If we find that we are likely to fall outside the agreed turnaround time during a busier period, we will contact you to discuss this and agree on any required actions.<br><br>
Similarly, if we find that, due to the nature of your order, we are likely to fall outside the agreed turnaround time – for example, if the information is very complex – we will contact you to discuss this and agree on a time frame.<br><br>
RepMedia cannot be held liable for any complications or inconveniences incurred by the customer as a result of failing to meet our average turnaround time. No refunds will be given in instances such as those outlined above.<br><br>
For the quickest delivery, please consider our express service option, which is typically delivered within 24 hours. Please note again, this is an average time that is measured from the point of receiving the required information.<br><br>
`
        ]
    },{
        title: "Cancellation and Returns Policy",
        list: [
            `The services provided by RepMedia are goods ‘made to the consumer’s specifications or clearly personalized.’ It is for this reason that our services are exempt from the normal distance selling regulations.<br><br>
As part of our ongoing commitment to 100% customer satisfaction, we guarantee to revise your CV until you are 100% satisfied. This is our 100% satisfaction guarantee, which is backed up by 6 months of free amendments. We do not offer any refunds.<br><br>

`
        ]
    },{
        title: "Complaints",
        list: [
            `In the unlikely event you have a complaint or grievance about your order with RepMedia, please email us at info@repmediaconsult.com . Once received, your complaint will be investigated, and we will reply to you within three working days.<br><br>
`
        ]
    },
];
</script>

<template>
    <section class="app-container !pt-10 mg:pt-0">
        <div class="mx-auto max-w-[1259px] space-y-8 pb-[100px]">
            <h1 class="text-center font-medium text-[#0C141D] section-header">Terms and Conditions</h1>
            <div class="space-y-8">
                <div v-for="policy in policies" :key="policy.title" class="text-[#505050]">
                    <h6><b>{{ policy.title }}</b></h6>
                    <ul v-if="policy.list?.length" class="list-disc pl-5">
                        <template v-for="(item, index) in policy.list[0].split('<br><br>')">
                            <p class="-ml-5">{{ item }}</p>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
p,
li,
h6 {
    @apply text-base md:text-lg lg:text-xl text-[#505050] leading-7 md:!leading-8;
}
</style>
