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
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <SignatureDishes />
      <div id="story">
        <ChefsCollection />
      </div>
      <MenuPreview />
      <div id="catering">
        <Events />
      </div>
      <Testimonials />
      <div id="gallery">
        <Gallery />
      </div>
      <div id="blog">
        <BlogPreview />
      </div>
      <div id="contact">
        <CTA />
      </div>
      <Footer />
    </main>
  );
}
