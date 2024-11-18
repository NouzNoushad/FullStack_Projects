<script>
    import { user, error, validateUser } from "$lib/store/loginUserStore";
</script>

<section class="py-[5rem]">
    <div class="max-w-[500px] mx-auto px-5 xl:px-0">
        {#if $error}
            <div
                class="my-2 py-3 px-3 w-full bg-slate-600 rounded-md text-white"
            >
                {$error}
            </div>
        {/if}
        <form
            onsubmit={validateUser}
            class="bg-slate-800 rounded-lg px-8 py-8 space-y-2"
        >
            <input
                type="email"
                placeholder="Email"
                class="bg-input px-3 py-2"
                bind:value={$user.email}
            />
            <input
                type="password"
                placeholder="Password"
                class="
            bg-input px-3 py-2"
                bind:value={$user.password}
            />
            <div class="pt-5 flex justify-center">
                <button type="submit" class="form-button"> Login </button>
            </div>
        </form>
    </div>
</section>
