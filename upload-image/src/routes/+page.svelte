<script lang="ts">
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    const fileName = writable<string>("");
    let imageFile: File | null = null;
    const files = writable<Upload[]>([]);

    const handleFileChange = (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (input?.files?.length) {
            fileName.set(input.files[0].name);
            imageFile = input.files[0];
        } else {
            fileName.set("");
        }
    };

    const uploadImage = async () => {
        if (!imageFile) return;

        const formData = new FormData();
        formData.append("image", imageFile);

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            console.log("Image uploaded");
            fileName.set("");
            fetchFiles();
        } else {
            console.error("Failed to upload image");
        }
    };

    const fetchFiles = async () => {
        try {
            const response = await fetch("/api/upload");
            const data = await response.json();
            files.set(data);
        } catch (error) {
            console.error("Failed to fetch files: ", error);
        }
    };

    const deleteImage = async (id: string) => {
        try {
            const response = await fetch(`/api/upload/${id}`, {
                method: "DELETE",
            });
            const result = await response.json();
            if (response.ok) {
                console.log(result);
                fetchFiles();
            } else {
                console.error(result.error);
            }
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    onMount(fetchFiles);
</script>

<menu>
    <div class="max-w-[1200px] mx-auto px-5 xl:px-0">
        <div class="flex flex-col md:flex-row gap-[20px] fixed h-screen">
            <div
                class="md:w-1/3 w-full py-[5rem] flex flex-col items-center gap-[20px]"
            >
                <div
                    class="flex flex-col md:flex-row items-center justify-center w-full gap-[10px]"
                >
                    <label
                        class="flex flex-col items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-700"
                    >
                        <span class="text-base leading-normal"
                            >Select a file</span
                        >
                        <input
                            type="file"
                            class="hidden"
                            on:change={handleFileChange}
                        />
                    </label>
                    <p>{$fileName ? $fileName : "File Name"}</p>
                </div>
                <button
                    on:click={uploadImage}
                    class="bg-blue-800 rounded-lg px-5 py-2 uppercase text-white shadow-lg tracking-wide transition-all duration-300 hover:bg-blue-900"
                    >Upload image</button
                >
            </div>
            <div class="md:w-2/3 w-full py-5 overflow-y-auto px-3">
                <div
                    class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[10px]"
                >
                    {#each $files as file}
                        <div
                            class="border-2 border-slate-500 bg-slate-50 rounded-lg px-3 py-2 flex flex-col items-end justify-between gap-8"
                        >
                            <img
                                src={`${file.path}`}
                                alt=""
                                class="w-full bg-cover"
                            />
                            <button
                                on:click={() => deleteImage(file._id)}
                                class="bg-red-500 text-white px-2 py-1 rounded-md text-[0.8rem]"
                                >Delete</button
                            >
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</menu>
