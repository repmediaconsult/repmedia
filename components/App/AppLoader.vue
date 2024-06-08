<script setup lang="ts">
withDefaults(defineProps<{ text?: string; active: boolean }>(), {
    text: "loading...",
});
</script>

<template>
    <transition>
        <div
            v-if="active"
            class="cursor-progress text-center flex-col flex backdrop-blur-sm items-center justify-center z-[1000] fixed top-0 h-full w-full left-0 bg-[rgba(0,0,0,0.5)]">
            <div class="flex items-center justify-center flex-col pointer-events-none">
                <div class="animated">
                    <AppIcon name="repmedia" class="animated-svg" />
                </div>

                <div class="mt-4 text-white text-[24px] font-[700] leading-[28px] capitalize flex items-baseline">
                    {{ text.replace(/\./g, "") }}
                    <div class="loading relative">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.animated {
    transition: 400ms ease-in-out;
    width: 98.77px;
    height: 98.77px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #fff;
}

.animated-svg {
    transition: 2s ease-in-out;
    animation: cap 2s cubic-bezier(0.14, 0.37, 0.93, 1.19) infinite;
    animation-play-state: running;
    transform-origin: center;
    transform-style: preserve-3d;
}

@keyframes cap {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.3);
    }
    100% {
        transform: scale(1);
    }
}

.loading span {
    animation: blink 1.5s infinite;
    animation-fill-mode: both;
    height: 5px;
    width: 5px;
    background: #e7eeff;
    position: absolute;
    transform: translate(3px, -4px);
    border-radius: 50%;
}
.loading span:nth-child(2) {
    animation-delay: 0.2s;
    margin-left: 7px;
}
.loading span:nth-child(3) {
    animation-delay: 0.2s;
    margin-left: 14px;
}

@keyframes blink {
    0% {
        opacity: 0.1;
    }
    20% {
        opacity: 1;
    }
    100% {
        opacity: 0.1;
    }
}
</style>
