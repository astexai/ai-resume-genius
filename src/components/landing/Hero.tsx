import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Zap, Shield } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => (
  <section className="relative min-h-[85vh] flex items-center pt-20 overflow-hidden">
    {/* Background image */}
    <img
      src={heroBg}
      alt=""
      width={1920}
      height={1080}
      className="absolute inset-0 w-full h-full object-cover opacity-30"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/50 to-background" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-up">
          <Zap className="h-4 w-4" />
          AI-Powered Resume Builder — 90%+ ATS Score Guaranteed
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Build Your <span className="text-gradient">Perfect Resume</span> in Minutes
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Simply fill out a quick form, and our AI transforms it into a professionally formatted LaTeX resume that beats Applicant Tracking Systems. Built for students & job seekers.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Link to="/build-your-resume">
            <Button variant="hero" size="lg" className="text-base px-8 py-6">
              Create Your Resume <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="outline" size="lg" className="text-base px-8 py-6">
              See How It Works
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
          {[
            { icon: FileText, label: "Resumes Built", value: "50K+" },
            { icon: Zap, label: "ATS Score", value: "90%+" },
            { icon: Shield, label: "Success Rate", value: "95%" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <s.icon className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-2xl font-heading font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
