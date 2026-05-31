import Banner from "@/components/landing/Banner";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import Benefits from "@/components/landing/Benefits";
import HowToUse from "@/components/landing/HowToUse";
import CaseStudy from "@/components/landing/CaseStudy";
import Comparison from "@/components/landing/Comparison";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Banner />
    <Navbar />
    <Hero />
    <About />
    <WhyChooseUs />
    <Benefits />
    <HowToUse />
    <CaseStudy />
    <Comparison />
    <Testimonials />
    <Pricing />
    <Footer />
  </div>
);

export default Index;
