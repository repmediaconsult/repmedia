export default defineEventHandler(async (event) => {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGEAPI_API_KEY}/latest/USD`);
        const responseData = await response.json();

        return {
            success: response.ok,
            data: responseData,
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: "Error converting currency",
        };
    }
});
