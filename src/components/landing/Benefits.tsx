import { TrendingUp, Award, Users, Briefcase } from "lucide-react";

const stats = [
  { icon: TrendingUp, value: "3x", label: "More Interview Calls", desc: "Candidates using ATS-optimized resumes receive 3x more interview invitations." },
  { icon: Award, value: "90%+", label: "ATS Compatibility", desc: "Our resumes consistently score above 90% on all major Applicant Tracking Systems." },
  { icon: Users, value: "50K+", label: "Happy Users", desc: "Students and professionals across India trust CV.ai for their career growth." },
  { icon: Briefcase, value: "85%", label: "Placement Success", desc: "85% of our users report landing a job within 60 days of using their CV.ai resume." },
];

const Benefits = () => (
  <section className="py-24 bg-card">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          Real <span className="text-gradient">Results</span> That Matter
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Numbers don't lie. See the impact CV.ai has on career success.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {stats.map((s) => (
          <div key={s.label} className="text-center group hover:-translate-y-2 transition-transform duration-300">
            <div className="h-16 w-16 rounded-2xl bg-hero-gradient flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
              <s.icon className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="text-4xl font-heading font-bold text-gradient mb-1">{s.value}</div>
            <div className="font-semibold mb-2">{s.label}</div>
            <p className="text-muted-foreground text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;
