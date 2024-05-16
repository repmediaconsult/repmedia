export default function usePaystack() {
    const paystackScriptLoaded = ref(false);
    const config = useRuntimeConfig();

    const mountPaystackScript = () => {
        return new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");

            script.setAttribute("src", "https://js.paystack.co/v2/inline.js");
            script.setAttribute("type", "text/javascript");
            document.head.appendChild(script);

            script.onload = () => resolve();
            script.onerror = () => reject();
        });
    };

    const generateReferance = () => {
        let text = "";
        let ref = "";

        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 10; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
            ref = "repmedia_" + text + Date.now();
        }
        return ref;
    };

    const payWithPaystack = (args: any) => {
        const paymentOptions = {
            ...args,
            key: config.public.paystackPublicKey,
            reference: generateReferance(),
            currency: "NGN",
            channels: ["card"],
            onSuccess: (response: any) => {
                args.onSuccess(response) || (() => null);
            },
            onCancel: () => {
                args.onCancel() || (() => null);
            },
        };

        const paystack = new window.PaystackPop();
        paystack.newTransaction(paymentOptions);
    };

    onMounted(() => {
        mountPaystackScript().then(() => {
            paystackScriptLoaded.value = true;
        });
    });

    return {
        paystackScriptLoaded,
        payWithPaystack,
        generateReferance,
    };
}
