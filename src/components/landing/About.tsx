import { Brain, Target, GraduationCap } from "lucide-react";

const About = () => (
  <section id="about" className="py-24 bg-card">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
          What is <span className="text-gradient">CV.ai</span>?
        </h2>
        <p className="text-lg text-muted-foreground">
          CV.ai is an AI-powered resume builder designed specifically for students and job seekers. 
          We convert your basic information into a beautifully formatted, ATS-optimized LaTeX resume 
          that helps you stand out and get past automated screening systems.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[
          { icon: Brain, title: "AI-Powered Formatting", desc: "Our AI analyzes your information and creates the perfect resume structure optimized for your target role and industry." },
          { icon: Target, title: "90%+ ATS Score", desc: "Every resume is engineered to pass Applicant Tracking Systems with a guaranteed 90%+ compatibility score." },
          { icon: GraduationCap, title: "Built for Students", desc: "Whether you're a fresh graduate or a career switcher, our templates are tailored for early-career professionals." },
        ].map((item) => (
          <div key={item.title} className="glass-card rounded-2xl p-8 text-center glow hover:scale-105 hover:-translate-y-1 transition-all duration-300">
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <item.icon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-heading text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
