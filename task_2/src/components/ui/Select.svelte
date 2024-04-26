<script lang="ts">
    export let value:string;
    export let entries;
</script>

<select bind:value={value}>
    {#each Object.keys(entries) as entry}
        <option value={entry}>{entry}</option>
    {/each}
</select>
