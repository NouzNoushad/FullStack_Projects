<script>
    export let text = "";
    export let placeholder = "";
    export let value;
</script>

<input
    type={text}
    class="bg-input px-3 py-2"
    placeholder={placeholder}
    bind:value={value}
/>
