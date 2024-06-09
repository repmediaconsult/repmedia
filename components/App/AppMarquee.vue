<script setup lang="ts"></script>

<template>
    <section class="marquee max-w-[1440px] mx-auto">
        <div class="wrapper">
            <span class="item w-full"><slot /></span>
            <span class="item w-full"><slot /></span>
        </div>
    </section>
</template>

<style scoped>
.marquee {
    width: 1440px;
    overflow: hidden;
    position: relative;
    height: 92px;
}

.marquee .wrapper {
    width: 200%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    overflow: hidden;
    animation: marquee 10s linear infinite;
}

.item {
    float: left;
    width: 45%;
    margin-left: 5%;
}

@keyframes marquee {
    0% {
        left: 0;
    }
    100% {
        left: -100%;
    }
}
</style>
