import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MenuPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="pt-32 pb-20 container mx-auto px-6 text-center">
                <h1 className="text-5xl font-bold mb-8">Part of our <span className="text-primary">Menu</span></h1>
                <p className="text-gray-400">Full menu coming soon...</p>
            </div>
            <Footer />
        </main>
    );
}
