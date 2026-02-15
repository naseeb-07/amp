import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SignatureDishes from "@/components/SignatureDishes";
import ChefsCollection from "@/components/ChefsCollection";
import MenuPreview from "@/components/MenuPreview";
import Events from "@/components/Events";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import BlogPreview from "@/components/BlogPreview";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <SignatureDishes />
      <ChefsCollection />
      <MenuPreview />
      <Events />
      <Testimonials />
      <Gallery />
      <BlogPreview />
      <CTA />
      <Footer />
    </main>
  );
}
