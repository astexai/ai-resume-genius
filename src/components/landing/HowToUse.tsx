import { Upload, Cpu, Download, CreditCard } from "lucide-react";

const steps = [
  { icon: Upload, step: "01", title: "Upload Your Details", desc: "Fill in your personal info, education, skills, experience, and projects. No formatting needed — just raw content." },
  { icon: Cpu, step: "02", title: "AI Processes & Formats", desc: "Our AI engine analyzes your data, optimizes keywords for ATS, and generates a LaTeX-formatted resume." },
  { icon: CreditCard, step: "03", title: "Quick Payment", desc: "Pay just ₹49 per resume — no subscriptions. Secure payment processing with instant confirmation." },
  { icon: Download, step: "04", title: "Download PDF", desc: "Your professionally formatted, ATS-optimized resume is ready to download as a high-quality PDF." },
];

const HowToUse = () => (
  <section id="how-it-works" className="py-24">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          How It <span className="text-gradient">Works</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Four simple steps from your raw info to a professionally crafted resume.
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Connector line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

        <div className="space-y-12">
          {steps.map((s, i) => (
            <div key={s.step} className="flex gap-6 md:gap-10 items-start group" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="relative z-10 h-16 w-16 rounded-2xl bg-hero-gradient flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <s.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="flex-1 bg-card rounded-2xl border border-border p-6 group-hover:border-primary/30 transition-colors">
                <span className="text-xs font-bold text-primary tracking-widest">STEP {s.step}</span>
                <h3 className="font-heading text-xl font-semibold mt-1 mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowToUse;
