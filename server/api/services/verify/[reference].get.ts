export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const { reference } = event.context.params;

    try {
        const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${config.public.paystackSecretKey}`,
            },
        });
        const responseData = await response.json();

        return {
            success: true,
            data: responseData,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: "Error verifying transaction",
        };
    }
});
