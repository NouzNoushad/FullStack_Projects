<script>
    import { goto } from "$app/navigation";
    import NavLink from "./NavLink.svelte";
</script>

<nav class="bg-navbar h-[10vh]">
    <div class="max-w-responsive h-full">
        <div class="flex flex-row items-center justify-between h-full">
            <h1 class="text-[1.2rem] uppercase font-bold text-white">
                Products App
            </h1>
            <ul
                class="flex flex-row items-center gap-8 uppercase text-[0.9rem] font-[500] tracking-wide"
            >
                <NavLink href="/" text="Home" />
                <NavLink href="/create" text="Create" />
                <div class="space-x-1">
                    <button on:click={() => goto("/sign_up")} class="nav-button"
                        >Sign Up</button
                    >
                    <button on:click={() => goto("/login")} class="nav-button"
                        >Login</button
                    >
                </div>
            </ul>
        </div>
    </div>
</nav>
