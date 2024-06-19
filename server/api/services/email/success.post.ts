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
                from: { email: "support@repmediaconsult.com" },
                to: [{ email: "info@repmediaconsult.com" }],
                subject: "Payment received for consultation",
                personalization: [
                    {
                        email: "info@repmediaconsult.com",
                        data: { ...body },
                    },
                ],
                template_id: "3z0vklo01p7l7qrx",
            }),
        });
        return { success: true, message: "Consultation request email succesfully sent" };
    } catch (error) {
        console.log("error", error);
        return { success: false };
    }
});
