<script lang="ts" setup>
interface Props {
  name: string;
  filled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  filled: true,
});

const hasStroke = ref(false);
const icon = ref("");

const fetchIcon = async () => {
  try {
    const iconsImport = import.meta.glob("../../assets/icons/**/**.svg", {
      eager: false,
      query: "?raw",
      import: "default",
    });

    const rawIcon = await iconsImport[`../../assets/icons/${props.name}.svg`]();
    if (rawIcon.includes("stroke")) hasStroke.value = true;
    icon.value = rawIcon;
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: `Icon "${props.name}" not found`,
    });
  }
};

await fetchIcon();

watchEffect(() => {
  fetchIcon();
});
</script>

<template>
  <span
    class="app-icon"
    :class="{ 'icon--fill': !filled, 'icon--stroke': hasStroke && !filled }"
    v-html="icon"
  />
</template>

<style>
.app-icon {
  line-height: 0;
}
.app-icon.icon--fill,
.app-icon.icon--fill * {
  fill: currentColor !important;
}

.app-icon.icon--stroke,
.app-icon.icon--stroke * {
  stroke: currentColor !important;
}
</style>
