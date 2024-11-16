<script>
    import { deleteProduct } from "$lib/store/deleteProductStore";
    import { fetchProducts, products } from "$lib/store/getProductStore";
    import { onMount } from "svelte";

    onMount(fetchProducts);
</script>

<main class="py-[4rem]">
    <div class="max-w-responsive">
        <table class="w-full">
            <thead class="w-full bg-slate-800 text-white h-[50px]">
                <tr class="font-[100]">
                    <th class="table-head">Sl No</th>
                    <th class="table-head">Image</th>
                    <th class="table-head">Name</th>
                    <th class="table-head">Brand</th>
                    <th class="table-head">Price</th>
                    <th class="table-head"></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each $products as product}
                    <tr class="border">
                        <td class="table-body-text"
                            >{$products.indexOf(product) + 1}</td
                        >
                        <td class="py-[0.5rem]">
                            <img
                                src={product.image
                                    ? `${product.image.path}`
                                    : ""}
                                alt=""
                                class="table-body-image"
                            />
                        </td>
                        <td class="table-body-text">{product.name}</td>
                        <td class="table-body-text">{product.brand}</td>
                        <td class="table-body-text">${product.price}</td>
                        <td>
                            <div
                                class="w-full flex justify-center items-center"
                            >
                                <a
                                    href={`/create?id=${product._id}`}
                                    class="bg-blue-500 table-body-button"
                                    >Update</a
                                >
                            </div>
                        </td>
                        <td>
                            <div
                                class="w-full flex justify-center items-center"
                            >
                                <button
                                    on:click={() =>
                                        deleteProduct(product._id ?? "")}
                                    class="bg-red-500 table-body-button"
                                    >Delete</button
                                >
                            </div>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</main>
