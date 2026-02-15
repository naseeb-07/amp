import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="pt-32 pb-20 container mx-auto px-6 text-center">
                <h1 className="text-5xl font-bold mb-8">Our <span className="text-primary">Stories</span></h1>
                <p className="text-gray-400">Read the latest from our kitchen.</p>
            </div>
            <Footer />
        </main>
    );
}
