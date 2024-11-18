<script>
    import Navbar from "$lib/components/Navbar.svelte";
    import "../app.css";
    export let data;
</script>

<Navbar auth_token={data.auth_token} />

<slot />
