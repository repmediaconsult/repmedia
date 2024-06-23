export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const body = await readBody(event);

    try {
        const response = await fetch(`https://api.flutterwave.com/v3/transactions/${body.id}/verify`, {
            method: "GET",
            headers: { Authorization: `Bearer ${config.public.flutterwaveSecretKey}` },
        });
        const responseData = await response.json();
        if (responseData.data.status === "successful" && responseData.data.amount === body.amount && responseData.data.currency === body.currency) {
            return { success: true, data: responseData };
        } else {
            return { success: false, data: null };
        }
    } catch (error) {
        return { success: false, data: null };
    }
});
