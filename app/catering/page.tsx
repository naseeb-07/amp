import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CateringPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="pt-32 pb-20 container mx-auto px-6 text-center">
                <h1 className="text-5xl font-bold mb-8">Catering <span className="text-primary">Services</span></h1>
                <p className="text-gray-400 mb-8">Book us for your next event. We are redirecting you to our contact page...</p>
                <div className="inline-block animate-pulse text-primary">Please wait...</div>
            </div>
            <Footer />
        </main>
    );
}
