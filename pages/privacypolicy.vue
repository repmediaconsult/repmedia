<script setup lang="ts">
const messages = [
    "This privacy notice lets you know how we promise to look after your personal data. This notice tells you things like what information we use to provide you with our bundle of branding services, how we use your information to keep you safe, and the choices and controls available to you. This notice also tells you about your privacy rights and how data protection rules work to protect everyone.",
    "Rep Media is the Controller of your personal data unless otherwise stated below. Our postal address is: 102102 Lagos, Nigeria. We have nominated a Data Protection Officer, and you can contact him at support@repmediaconsult.com. Please mark the envelope ‘Data Protection Officer’.",
    "The term “us” or “we” refers to Rep Media, a private limited company incorporated and registered under the laws of the Republic of Nigeria with registration number 2948767.",
    "The term “you” or “your” refers to the client who requests, hires and/or receives a branding service through the Rep Media website.",
];
const policies = [
    {
        title: "1. Personal data we process",
        heading: "We only process information that we need, so that we can provide you with the best service. The data categories are as follows:",
        list: [
            "Contact details: things like name, phone number and e-mail address. For some of our services we might require a little more, like your LinkedIn login details.",
            "Profile information: things like your profile picture, saved addresses, language and communication preferences. For some of our services we might require a little more, like your certificate e-copies.",
            "Payment information like the amount charged and the payment card used.",
            "Business details: things like your business registration number, financial records, etc.",
        ],
        extra: [
            "A lack of (or inaccurate) personal data may prevent us from fulfilling our contract with you, or from doing something expected of us in law. It may also mean that we cannot operate your account.  We will not be able to fulfil our obligations to you in other circumstances, for example, should you refuse to make a full payment for the service requested for.",
        ],
    },
    {
        title: "2. Purpose of the processing",
        heading: "We process your personal data so we can provide you with one or more of our transportation services:",
        list: [
            "We connect you with an Advisor, helping you understand what your career or business goals are and bringing it to your life - CV, Portfolio, Business Plan, as the case may be.",
            "We collect your payment: We obtain payment details to process your request.",
            "We keep you informed: Your name, phone number and email address will be used to communicate with you for things like letting you know the status of your service request.",
        ],
        extra: [
            "We may process all personal data about you for the establishment, exercise or defence of legal claims in case we need to defend against or give proof of claims submitted to us for investigation.",
            "Please see additional purposes for which we process your personal data under legitimate interest (Clause 3 below).",
        ],
    },
    {
        title: "3. Legal Basis",
        heading:
            "We are allowed to use personal information in the ways described above if we have a proper reason to do so. We always make sure we have a good reason for doing anything with your data.",
        list: [
            "Entry into and performance of the contract (incl., provision of service): Personal data is generally processed in order to provide the services contracted with you. This means that to give you the service we promised you, and to meet our terms and conditions, we’ll process your personal data to meet those obligations.",
            "Where personal data is processed for a new purpose other than that for which the personal data are originally collected and the processing is not based on the data subject’s consent, we carefully assess the permissibility of such new processing. We will, in order to ascertain whether processing for a new purpose is compatible with the purpose for which the personal data are initially collected, take into account, inter alia:",
            "any link between the purposes for which the personal data are collected and the purposes of the intended further processing;",
            "the context in which the personal data are collected, in particular regarding the relationship between you and us;",
            "the nature of the personal data, in particular whether special categories of personal data are processed or whether personal data related to criminal convictions and offences are processed;",
            "the possible consequences of the intended further processing for you; and",
            "the existence of appropriate safeguards, which may include encryption or pseudonymisation.",
        ],
    },
    {
        title: "4. Recipients",
        heading:
            "We only work with trusted contractors who work for us. We only share when there is a proper reason to do so. We limit sharing to only that which is required. We do not sell your personal information.",
        list: [
            "The personal data of the passenger is only disclosed to the Advisor; in such a case, the Advisor will see the name, email address, phone number (in some countries the number is masked), rating and geolocation data of the passenger.",
            "This is necessary for the Advisors to attend to the client’s requests that may arise during the project execution.",
            "Feedback given by client regarding the quality of our service is anonymous. Your rating is private between you and Rep Media",
            "In some circumstances we are legally obliged to share information with external recipients. For example, under a Court Order or where we cooperate with a data protection supervisory authority in handling complaints or investigations. We can also respond to requests, such as those from law enforcement agencies, when we have a good-faith belief that the response is required by law in that jurisdiction or furthers a public interest task, affects users in that jurisdiction, and is consistent with internationally recognised standards. In any scenario, we’ll always satisfy ourselves that we have a lawful basis on which to share the information, and we’ll make sure that we document our decision.",
        ],
    },
    {
        title: "5. Security and access",
        list: [
            "Any personal data collected in the course of providing our services is transferred to and stored in the data centres of Alphabet, Inc. Only authorised employees of Rep Media have access to the personal data and they may access the data only for the purpose of resolving issues associated with the use of the services.",
        ],
    },
    {
        title: "6. Your rights and controls",
        heading: "We offer web settings like marketing opt-ins, and transparent cookie consent controls on our website.",
        list: [
            "You have the right to ask us for copies of your personal information.",
            "You have the right to ask us to erase your personal information in certain circumstances.",
            "You have the right to ask us to restrict the processing of your information in certain circumstances. This means that your data can only be used for certain things, such as legal claims or to exercise legal rights.",
            "You may have the right to object to processing if we are processing your information on the basis of legitimate interests. You may object at any time to the processing of your personal data which involves automated processing or profiling which has a significant effect on your rights and to require human intervention. You also have the right to require an explanation regarding the logic behind an automated decision we have made.",
        ],
    },
    {
        title: "7. Retention",
        heading:
            "Rep Media retains user data for only as long as necessary for the purposes described above. This means that we retain different categories of data for different periods of time depending on the type of data and the purposes for which we collected the data.",
        extra: [
            "Please note that after service delivery, it does not cause the deletion of your personal data in our archive. If you have not contacted us in three years, we’ll get in touch and ask you to confirm whether you wish to keep your data active for future use. If no reply is received in a reasonable time, the account will be closed and personal data will be deleted unless such data is required for any purpose mentioned earlier in this privacy notice.",
        ],
    },
    {
        title: "8. Direct marketing",
        list: [
            "We may send direct marketing messages to your e-mail address and/or phone number when you have given us permission to do so, or under a soft opt-in basis. We may personalise direct marketing messages using your information.",
            "If you no longer wish to receive direct marketing messages, please click the 'Unsubscribe' link in the footer of one of our emails. Easy.",
        ],
    },
    {
        title: "9. Dispute resolution",
        list: [
            "Disputes relating to the processing of personal data are resolved through customer support (support@repmediaconsult.com) in the first instance. ",
        ],
    },
    {
        title: "10. Making this notice great",
        heading: "We hope you have found this privacy notice easy to understand.",
        extra: [
            "Data protection laws are important. They strengthen rules and enhance your information rights. Many of these rules may appear complicated, but most are grounded in common sense. We take our responsibilities with your data seriously. Rep Media will continue to make changes to this privacy notice as part of our commitment to protecting your privacy and affording you even more transparency.",
        ],
    },
];
const rights = {
    0: "Your right of access",
    1: "Your right to erasure",
    2: "Your right to restriction of processing",
    3: "Your right to object to processing",
};
</script>

<template>
    <section class="app-container !pt-10 mg:pt-0">
        <div class="mx-auto max-w-[1259px] space-y-8 pb-[100px]">
            <h1 class="text-center font-medium text-[#0C141D] section-header">Privacy Notice for Clients</h1>
            <div class="space-y-8">
                <p v-for="(message, index) in messages" :key="index">
                    {{ message }}
                </p>
            </div>
            <div class="space-y-8">
                <div v-for="policy in policies" :key="policy.title" class="text-[#505050]">
                    <h6>{{ policy.title }}</h6>
                    <p v-if="policy.heading">{{ policy.heading }}</p>
                    <ul v-if="policy.list?.length" class="list-disc pl-5">
                        <template v-for="(item, index) in policy.list">
                            <p v-if="policy.title.includes('rights and')" class="-ml-5">{{ rights[index] }}</p>
                            <li>{{ item }}</li>
                        </template>
                    </ul>
                    <template v-if="policy.extra?.length">
                        <p v-for="(text, index) in policy.extra" :key="index">{{ text }}</p>
                    </template>
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
