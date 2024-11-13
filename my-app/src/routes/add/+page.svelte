<script lang="ts">
    import { goto } from "$app/navigation";

    let name = "";
    let brand = "";
    let price = 0;
    let description = "";

    const addProduct = async () => {
        await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                brand,
                price,
                description,
            }),
        });
        goto("/");
        name = "";
        brand = "";
        price = 0;
        description = "";
    };
</script>

<section class="py-[5rem]">
    <div class="max-w-[600px] mx-auto px-5 xl:px-0">
        <form
            on:submit|preventDefault={addProduct}
            class="border-2 border-black bg-slate-50 rounded-md px-8 py-10 space-y-2"
        >
            <input
                type="text"
                placeholder="Name"
                class="px-2 py-2 w-full rounded-md border outline-none focus:border-black"
                bind:value={name}
            />
            <input
                type="text"
                placeholder="Brand"
                class="px-2 py-2 w-full rounded-md border outline-none focus:border-black"
                bind:value={brand}
            />
            <input
                type="number"
                placeholder="Price"
                class="px-2 py-2 w-full rounded-md border outline-none focus:border-black"
                bind:value={price}
            />
            <textarea
                rows={4}
                placeholder="Name"
                class="px-2 py-2 w-full rounded-md border outline-none focus:border-black"
                bind:value={description}
            ></textarea>
            <div class="flex justify-center md:justify-end pt-5">
                <button
                    type="submit"
                    class="border border-slate-200 bg-white rounded-md px-[50px] py-[10px] uppercase text-[0.9rem] font-[500] transition-all duration-300 hover:border-black"
                    >Add Product</button
                >
            </div>
        </form>
    </div>
</section>
