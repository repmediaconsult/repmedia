<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { toast } from "vue-sonner";

const supabase = useSupabaseClient();

const contactOptions = [
    {
        icon: "call",
        label: "Whatsapp",
        value: "2348067053996",
        text: "234 (0) 806 705 3996",
        type: "tel",
    },
    {
        icon: "email",
        label: "Email",
        value: "hello@repmediaconsult.com",
        text: "hello@repmediaconsult.com",
        type: "email",
    },
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
    const { error } = await supabase.from("contacts").insert({ ...form });
    if (error) {
        toast.error("We could not submit your message. Please try again.");
    } else {
        toast.success("Message sent successfully. Our team will reach out to you soon.");
        Object.assign(form, { name: "", email: "", description: "" });
        v$.value.$reset();
    }
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
                        placeholder="Your Name"
                        input-class="border border-transparent"
                        :error="v$.name.$errors[0]?.$message"
                        required />
                    <AppInput
                        id="email"
                        v-model="form.email"
                        name="email"
                        label="Email"
                        placeholder="Email Address"
                        input-class="border border-transparent"
                        :error="v$.email.$errors[0]?.$message"
                        required />
                    <AppTextarea id="description" v-model="form.description" name="description" label="Description" placeholder="Example..." />
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
