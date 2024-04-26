const API_URL = 'https://open.er-api.com/v6/latest/USD'

export async function fetchRates() {

    try {
        const res = await fetch(API_URL);
        if (!res.ok) {
            throw new Error(`ERROR`);
        }
        const data = await res.json();
        return data.rates
    } catch (e) {
        console.log(e)
    }

}
