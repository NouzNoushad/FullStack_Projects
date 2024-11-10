import Hello from "../components/hello";

export default function Home() {
    return (
        <div className="h-[100vh] flex flex-col items-center justify-center gap-5">
            <div className="text-5xl font-bold">Hello Next Universe</div>
            <Hello/>
        </div>
    );
}
