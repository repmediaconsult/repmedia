<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { toast } from "vue-sonner";

const supabase = useSupabaseClient();

const contactOptions = [
    {
        icon: "call",
        label: "WhatsApp",
        value: "447448956781",
        text: "+44 74489 56781, +234 806 705 3996",
        type: "tel",
    },
    {
        icon: "email",
        label: "Email",
        value: "hello@repmediaconsult.com",
        text: "hello@repmediaconsult.com",
        type: "email",
    },
    // {
    //     icon: "location",
    //     label: "Business Address",
    //     value: "Green End Road, Cambridge, United Kingdom. CB4 1RU",
    //     text: "Green End Road, Cambridge, United Kingdom. CB4 1RU",
    //     type: "location",
    // },
];

const isLoading = ref(false);
const form = reactive({ name: "", email: "", description: "" });
const rules = {
    name: { required: helpers.withMessage("Kindly enter your name", required) },
    email: {
        required: helpers.withMessage("Kindly enter your email address", required),
        email: helpers.withMessage("Your email is not valid", email),
    },
};
const v$ = useVuelidate(rules, form, { $autoDirty: true });

const sendMessage = async () => {
    v$.value.$touch();
    if (isLoading.value || v$.value.$invalid) {
        return;
    }
    isLoading.value = true;

    var content = "";
    Object.entries(form).forEach(([key, value]) => {
        content += `${key.toUpperCase()}: ${value}<br>`;
    });

    const { success } = await $fetch<any>("/api/services/email/sg", {
        method: "POST",
        body: {
            content,
            email: {
                subject: `New Website Message`
            }
        },
    });

    if (!success) {
        toast.error("We could not submit your message. Please try again.");
    } else {
        toast.success("Message sent successfully. Our team will reach out to you soon.");
        Object.assign(form, { name: "", email: "", description: "" });
        v$.value.$reset();
    }

    supabase.from("messages").insert({ ...form });
    isLoading.value = false;
};
</script>

<template>
    <section id="contact" class="py-[100px] bg-[#E7F1FC]">
        <div class="app-container flex flex-col gap-5">
            <p class="section-title">contact us</p>
            <div class="flex flex-wrap gap-10">
                <div class="max-w-[546px] flex flex-col gap-5">
                    <h6 class="section-header">
                        {{ $route.name === "corporatebranding" ? "We make your business our business" : "Ready to take the next step in your career" }}
                    </h6>
                    <p class="paragraph">Don't hesitate to reach out!<br>Weekdays from 9 am to 6 pm GMT</p>
                    <ul class="flex flex-col gap-6">
                        <ContactCard v-for="contact in contactOptions" :key="contact.icon" :contact />
                    </ul>
                </div>
                <div class="flex-1 flex flex-col gap-5 min-w-[300px]">
                    <AppInput
                        id="name"
                        v-model="form.name"
                        name="name"
                        label="Name"
                        placeholder="Enter your name"
                        input-class="border border-transparent"
                        :error="v$.name.$errors[0]?.$message"
                        required />
                    <AppInput
                        id="email"
                        v-model="form.email"
                        name="email"
                        label="Email"
                        placeholder="Enter your email address"
                        input-class="border border-transparent"
                        :error="v$.email.$errors[0]?.$message"
                        required />
                    <AppTextarea id="description" v-model="form.description" name="description" label="Message" placeholder="Enter your message..." />
                    <button
                        class="rounded-[24px] bg-[#000000] text-white py-[10px] px-6 w-fit text-xl tracking-[-4%] flex items-center gap-2 disabled:cursor-not-allowed disabled:bg-opacity-50"
                        :disabled="isLoading"
                        @click="sendMessage">
                        <AppIcon v-if="isLoading" name="spinner" class="animate-spin duration-300" />
                        Send a message
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
