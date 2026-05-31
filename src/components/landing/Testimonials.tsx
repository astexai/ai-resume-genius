import { Star } from "lucide-react";

const testimonials = [
  { name: "Vikram Singh", role: "Engineering Student", text: "CV.ai is a lifesaver! I created a stunning resume in under 3 minutes. The LaTeX formatting looks incredibly professional." },
  { name: "Sneha Gupta", role: "Marketing Graduate", text: "I applied to 20 companies and got 8 responses — all thanks to the ATS-optimized resume from CV.ai. Best ₹49 I ever spent!" },
  { name: "Arjun Nair", role: "Data Science Fresher", text: "The AI perfectly highlighted my projects and skills. My resume looks like it was crafted by an expert. Highly recommend for freshers!" },
  { name: "Kavya Iyer", role: "MBA Candidate", text: "Professional resume services quoted me ₹3,000. CV.ai gave me an even better result for a fraction of the price. Incredible value!" },
  { name: "Deepak Kumar", role: "Full Stack Developer", text: "As a developer, I appreciate the LaTeX quality. Clean, precise, and perfectly formatted — exactly what tech recruiters want to see." },
  { name: "Meera Joshi", role: "BCA Graduate", text: "I was nervous about my first job application. CV.ai made the process so simple and gave me confidence with a beautiful resume." },
];

const Testimonials = () => (
  <section id="testimonials" className="py-24 bg-card">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          What Our Users <span className="text-gradient">Say</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Join thousands of satisfied students and professionals who've transformed their careers.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-background rounded-2xl border border-border p-7 hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#FFC201] text-[#FFC201]" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">"{t.text}"</p>
            <div>
              <div className="font-heading font-semibold text-sm">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
