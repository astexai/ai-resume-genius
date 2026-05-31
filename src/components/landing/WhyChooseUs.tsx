import { CheckCircle2, Clock, IndianRupee, Sparkles, Lock, FileCheck } from "lucide-react";

const features = [
  { icon: Sparkles, title: "AI-Driven Quality", desc: "Advanced AI ensures professional formatting, correct grammar, and industry-standard structure every single time." },
  { icon: Clock, title: "Ready in 2 Minutes", desc: "No more spending hours on formatting. Upload your details and get a polished resume in under 2 minutes." },
  { icon: FileCheck, title: "LaTeX Precision", desc: "Your resume is generated in LaTeX — the gold standard for typographic quality used by top researchers and professionals." },
  { icon: IndianRupee, title: "Incredibly Affordable", desc: "Just ₹49 per resume. No subscriptions, no hidden fees — pay only when you need it." },
  { icon: Lock, title: "Privacy First", desc: "Your data is processed securely and never shared. We delete your information after resume generation." },
  { icon: CheckCircle2, title: "PDF Download", desc: "Download your finished resume as a high-quality PDF, ready to upload to any job portal or send to recruiters." },
];

const WhyChooseUs = () => (
  <section id="benefits" className="py-24">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          Why Choose <span className="text-gradient">CV.ai</span>?
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Everything you need to create the perfect resume, powered by cutting-edge AI technology.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((f) => (
          <div key={f.title} className="group bg-card rounded-2xl border border-border p-7 hover:border-primary/30 hover:glow hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <f.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
