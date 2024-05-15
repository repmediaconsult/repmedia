// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: { lang: "en" },
            title: "Repmedia | Making brands stand out",
            charset: "UTF-8",
            viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
            meta: [
                { hid: "theme-color", name: "theme-color", content: "#3782CA" },
                {
                    hid: "description",
                    name: "description",
                    content: "Making brands stand out",
                },
                {
                    hid: "og:description",
                    name: "og:description",
                    content: "Making brands stand out",
                },
                {
                    hid: "twitter:description",
                    name: "twitter:description",
                    content: "Making brands stand out",
                },
                { hid: "og:title", name: "og:title", content: "Repmedia | Making brands stand out" },
                { hid: "twitter:title", name: "twitter:title", content: "Repmedia | Making brands stand out" },
                { hid: "og:site_name", name: "og:site_name", content: "Repmedia | Making brands stand out" },
                {
                    hid: "og:url",
                    name: "og:url",
                    content: "https://repmedia.vercel.app/",
                },
                { hid: "og:type", name: "og:type", content: "website" },
                {
                    hid: "og:image",
                    name: "og:image",
                    content: "https://res.cloudinary.com/juwon-tech/image/upload/v1715726705/repmedia_mqf75e.png",
                },
                {
                    hid: "twitter:image",
                    name: "twitter:image",
                    content: "https://res.cloudinary.com/juwon-tech/image/upload/v1715726705/repmedia_mqf75e.png",
                },
                {
                    hid: "twitter:card",
                    name: "twitter:card",
                    content: "summary_large_image",
                },
            ],

            link: [{ rel: "icon", type: "image/ico", href: "/favicon.ico" }],
        },
    },
    colorMode: {
        preference: "light",
    },
    css: ["@/assets/css/index.css", "@/assets/css/font.css"],
    devtools: { enabled: true },
    modules: ["@nuxt/ui"],
    router: {
        options: {
            scrollBehaviorType: "smooth",
        },
    },
});
