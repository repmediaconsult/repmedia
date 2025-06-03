export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const body = await readBody(event);

    try {
        const resp = await fetch("https://api.sendgrid.com/v3/mail/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`
            },
            body: JSON.stringify({
                from: { email: body.email.from ?? "info@repmediaconsult.com", name: 'RepMedia Consult' },
                subject: body.email.subject,
                personalizations: [
                    {
                        to: [{ email: body.email.to ?? "repmedia.ng@gmail.com" }]
                    },
                ],
                content: [
                    {
                        type: "text/html",
                        value: body.content
                    },
                ],
                ...(body?.file ? {attachments: [{type: body.file.type, content: body.file.base64_file, filename: body.file.file_name}]} : {})
            }),
        });
        const data = await resp.text();
        return { success: true, message: "Email succesfully sent", res: data };
    } catch (error) {
        console.log("error", error);
        return { success: false };
    }
});