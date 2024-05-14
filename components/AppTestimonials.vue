<script setup lang="ts"></script>

<template>
  <section class="py-[90px] bg-white">
    <div
      class="app-container flex flex-col gap-6 md:gap-10 justify-center items-center text-center"
    >
      <p
        class="uppercase font-bold text-lg md:text-[24px] -tracking-[2%] text-[#3782CA]"
      >
        testimonials
      </p>
      <h5
        class="text-[#1B2435] font-bold text-[32px] md:text-[38px] lg:text-[48px] leading-[40px] md:leading-[52px] lg:leading-[72px] -tracking-[4%]"
      >
        From Our Customers
      </h5>
      <p
        class="text-[#313131] max-w-[780px] mx-auto text-center text-lg md:text-[24px] leadin-6 md:leading-9"
      >
        Feedback occurs when outputs a system are routed back as a inputs as
        parts of a chain of cause-and-effect that forms a circuit or loop
      </p>
      <ul class="grid gap-5 w-full max-w-[1120px] mx-auto">
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
      </ul>
    </div>
  </section>
</template>

<style scoped>
ul {
  grid-template-columns: repeat(auto-fit, minmax(356px, 1fr));
}
</style>
