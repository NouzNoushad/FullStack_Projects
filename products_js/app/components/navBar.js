import Link from "next/link"

export default function NavBar() {
    return (
        <nav className="bg-black text-white h-[10vh]">
            <div className="max-w-responsive h-full">
                <div className="flex flex-row items-center justify-between h-full">
                    <h2 className="uppercase text-[0.95rem] font-bold">Product Data</h2>
                    <div className="space-x-[20px]">
                        <Link href="/" className="uppercase text-[0.9rem] font-[500] relative before:absolute before:bottom-[-2px] before:left-0 before:h-[0.1rem] before:bg-white before:w-0 before:transition-all before:duration-300 hover:before:w-full">Home</Link>
                        <Link href="/pages/add" className="text-[0.9rem] bg-white text-black rounded-md px-[10px] py-[8px]">Add Product</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
