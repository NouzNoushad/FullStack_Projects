<script lang="ts">
    import { writable } from "svelte/store";

    const fileName = writable<string>("");
    let imageFile: File | null = null;

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
        } else {
            console.error("Failed to upload image");
        }
    };
</script>

<menu>
    <div class="max-w-[1200px] mx-auto px-5 xl:px-0">
        <div class="flex flex-col md:flex-row gap-[20px]">
            <div
                class="md:w-1/2 w-full py-[5rem] flex flex-col items-center gap-[20px]"
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
            <div class="md:w-1/2 w-full py-5"></div>
        </div>
    </div>
</menu>
