import { Quote } from "lucide-react";

const cases = [
  {
    name: "Priya Sharma",
    role: "B.Tech Graduate → Software Engineer at TCS",
    story: "As a fresh graduate with no experience in resume formatting, I struggled with ATS rejections for months. CV.ai transformed my basic details into a professional LaTeX resume. Within two weeks of using it, I got 5 interview calls and landed my dream job at TCS.",
    metric: "5 Interviews in 2 Weeks",
  },
  {
    name: "Rahul Patel",
    role: "MBA Student → Business Analyst at Deloitte",
    story: "I was spending ₹2,000+ on resume writing services with mediocre results. CV.ai gave me a far superior resume for just ₹49. The ATS optimization was game-changing — my application response rate jumped from 5% to 35%.",
    metric: "7x Higher Response Rate",
  },
  {
    name: "Ananya Reddy",
    role: "Career Switcher → Data Analyst at Flipkart",
    story: "Switching from teaching to tech was daunting. CV.ai highlighted my transferable skills perfectly and formatted everything for the tech industry. The LaTeX output looked incredibly professional and helped me stand out among 200+ applicants.",
    metric: "Hired Within 30 Days",
  },
];

const CaseStudy = () => (
  <section className="py-24 bg-card">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          Success <span className="text-gradient">Stories</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Real people, real results. See how CV.ai helped them land their dream jobs.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cases.map((c) => (
          <div key={c.name} className="bg-background rounded-2xl border border-border p-8 flex flex-col hover:border-primary/30 hover:glow transition-all duration-300">
            <Quote className="h-8 w-8 text-primary/30 mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">"{c.story}"</p>
            <div className="border-t border-border pt-5">
              <div className="text-xs font-bold text-primary mb-2 tracking-wide">{c.metric}</div>
              <div className="font-heading font-semibold">{c.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{c.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CaseStudy;
