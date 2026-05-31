import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Clock, Zap } from "lucide-react";

const features = [
  "AI-Powered Resume Generation",
  "LaTeX-Quality Formatting",
  "90%+ ATS Score Guaranteed",
  "Professional PDF Download",
  "Industry Level Template",
  "Keyword Optimization",
  "Privacy Protected",
  "Instant Generation",
];

const Pricing = () => (
  <section id="pricing" className="py-24">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          Simple, <span className="text-gradient">Affordable</span> Pricing
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          No subscriptions. No hidden fees. Pay per resume.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="relative rounded-3xl border-2 border-primary bg-card p-8 glow">
          {/* Offer badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-hero-gradient px-5 py-2 rounded-full">
            <Clock className="h-4 w-4 text-primary-foreground" />
            <span className="text-sm font-bold text-primary-foreground">Early Bird Offer!</span>
          </div>

          <div className="text-center mt-4 mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-5xl font-heading font-bold text-gradient">₹49</span>
              <span className="text-2xl text-muted-foreground line-through">₹499</span>
            </div>
            <p className="text-muted-foreground text-sm">per resume • one-time payment</p>
          </div>

          <div className="space-y-3 mb-8">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-accent" />
                </div>
                <span className="text-sm">{f}</span>
              </div>
            ))}
          </div>

          <Link to="/build-your-resume">
            <Button variant="hero" size="lg" className="w-full text-base py-6">
              <Zap className="mr-2 h-5 w-5" /> Build Your Resume Now
            </Button>
          </Link>

          <p className="text-center text-xs text-muted-foreground mt-4">
            🔒 Secure payment • Instant download • No subscription
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Pricing;
