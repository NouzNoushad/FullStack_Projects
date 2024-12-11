import LeftSection from "../components/leftSection"
import RightSection from "../components/rightSection";

export default function Home() {
    return (
        <>
            <main className="pt-[10vh]">
                <div className="container-md">
                    <div className="flex lg:flex-row flex-col h-auto">
                        <LeftSection />
                        <RightSection />
                    </div>
                </div>
            </main>
        </>
    );
}
