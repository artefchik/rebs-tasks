<script lang="ts">
    import {onMount} from "svelte";
    import Select from "../components/ui/Select.svelte";
    import {fetchRates} from "../services/fetchRates";

    let rates:Record<string, number> = {};
    let fromCurrency = 'USD';
    let toCurrency = 'EUR';
    let fromValue = 1;
    let toValue = 0;

    onMount(async () => {
        try {
            rates = await fetchRates();
            updateToValue();
        } catch (error) {
            console.error('Error fetching:', error);
        }
    });

    function updateToValue() {
        if (rates[fromCurrency] && rates[toCurrency]) {
            toValue = Number((fromValue * rates[toCurrency] / rates[fromCurrency]).toFixed(2));
        }
    }

    function updateFromValue() {
        if (rates[fromCurrency] && rates[toCurrency]) {
            fromValue = Number((toValue * rates[fromCurrency] / rates[toCurrency]).toFixed(2));
        }
    }

    $: if (fromCurrency && toCurrency && fromValue !== undefined) {
        updateToValue();
    }

    $: if (fromCurrency && toCurrency && toValue !== undefined) {
        updateFromValue();
    }
</script>

<div class="wrapper">
    <h1>Convert Currency</h1>
    <div class="block">
        <input class="input" type="number" bind:value={fromValue}/>
        <span/>
        <Select bind:value={fromCurrency} entries={rates}/>
    </div>
    <div class="block">
        <input class="input" type="number" bind:value={toValue}/>
        <span/>
        <Select bind:value={toCurrency} entries={rates}/>
    </div>
</div>
