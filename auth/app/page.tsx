export default function Home() {
    return (
        <main className="h-screen flex items-center justify-center">
            <div className="w-[400px] mx-auto px-5 xl:px-0">
                <div className="bg-white shadow-lg border px-6 py-10 rounded-lg">
                    <h1 className="text-[1.4rem] text-center font-[500] mb-10">Sign Up</h1>
                    <form action="" className="space-y-8">
                        <input type="text" placeholder="Name" className="form-input" />
                        <input type="email" placeholder="Email" className="form-input" />
                        <input type="password" placeholder="Password" className="form-input" />
                        <input type="password" placeholder="Confirm password" className="form-input" />
                        <div className="pt-10">
                            <button className="w-full bg-blue-800 text-white font-[500] text-[0.9rem] py-1 rounded-sm">Sign up</button>
                        </div>
                    </form>
                    <div className="mt-4 flex flex-row items-center justify-center gap-[5px]">
                        <span className="text-[0.8rem] text-gray-400">Already have an account?</span>
                        <a href='/' className="underline text-blue-800 text-[0.95rem] font-[500]">Login</a></div>
                </div>
            </div>
        </main>
    );
}
