export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const body = await readBody(event);

    try {
        await fetch("https://api.mailersend.com/v1/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: ` Bearer ${config.public.mailersendToken}`,
                "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify({
                from: { email: "info@repmediaconsult.com" },
                to: [{ email: body.email }],
                subject: "Payment cancelled",
                personalization: [
                    {
                        email: body.email,
                        data: { order_number: body.order_number },
                    },
                ],
                template_id: "jpzkmgqd28nl059v",
            }),
        });
        return { success: true, message: "Cancelled email succesfully sent" };
    } catch (error) {
        return { success: false };
    }
});
