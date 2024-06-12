export default defineNuxtPlugin(async () => {
    const currency = useCookie("currency");
    if (!currency.value) {
        try {
            const response = await fetch("https://ipinfo.io/json");
            const responseData = await response.json();
            if (Object.values(responseData).length > 1) {
                currency.value = responseData?.country?.toLowercase() === "ng" ? "NGN" : "USD";
            }
        } catch (error) {
            currency.value = "USD";
        }
    }
});
