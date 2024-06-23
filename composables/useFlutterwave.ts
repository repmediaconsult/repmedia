export default function useFlutterwave() {
    const flutterwaveScriptMounted = ref(false);
    const config = useRuntimeConfig();

    const mountFlutterwaveScript = () => {
        return new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");

            script.setAttribute("src", "https://checkout.flutterwave.com/v3.js");
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

    const payWithFlutterwave = (args: any) => {
        const tx_ref = generateReferance();
        let payData = {
            ...args,
            public_key: args.public_key ?? config.public.flutterwavePublicKey,
            tx_ref,
            callback: (response: any) => {
                args.callback(response) || (() => null);
            },
            onclose: (incomplete: any) => {
                args.onclose(incomplete, tx_ref) || (() => null);
            },
        };

        // @ts-ignore
        window.FlutterwaveCheckout(payData);
    };

    onMounted(() => {
        mountFlutterwaveScript().then(() => {
            flutterwaveScriptMounted.value = true;
        });
    });

    return {
        flutterwaveScriptMounted,
        payWithFlutterwave,
    };
}
