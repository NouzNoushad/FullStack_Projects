<script>
    import Navbar from "$lib/components/Navbar.svelte";
    import "../app.css";
    const { children } = $props();
</script>

<Navbar />
{@render children()}
