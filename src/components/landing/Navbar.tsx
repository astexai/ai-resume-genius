import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = ["About", "Benefits", "How It Works", "Pricing", "Testimonials"];

  return (
    <nav className="sticky top-0 left-0 right-0 z-40 glass-card">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-hero-gradient flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold text-gradient">CV.ai</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {l}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/build-your-resume">
            <Button variant="hero" size="lg">Build Your Resume</Button>
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden glass-card border-t border-border px-4 pb-4">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="block py-2 text-sm text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>
              {l}
            </a>
          ))}
          <Link to="/builder" onClick={() => setIsOpen(false)}>
            <Button variant="hero" className="w-full mt-3">Build Your Resume</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
