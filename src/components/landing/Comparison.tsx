import { Check, X } from "lucide-react";

const rows = [
  { feature: "ATS Optimization (90%+)", cvai: true, traditional: false, others: false },
  { feature: "LaTeX-Quality Formatting", cvai: true, traditional: false, others: false },
  { feature: "AI-Powered Content", cvai: true, traditional: false, others: true },
  { feature: "Ready in 2 Minutes", cvai: true, traditional: false, others: true },
  { feature: "Price per Resume", cvai: "₹49", traditional: "₹2,000+", others: "₹500+/mo" },
  { feature: "PDF Download", cvai: true, traditional: true, others: true },
  { feature: "No Subscription Required", cvai: true, traditional: true, others: false },
  { feature: "Student-Friendly", cvai: true, traditional: false, others: false },
];

const Cell = ({ value }: { value: boolean | string }) => {
  if (typeof value === "string") return <span className="text-sm font-semibold">{value}</span>;
  return value ? <Check className="h-5 w-5 text-accent mx-auto" /> : <X className="h-5 w-5 text-destructive/50 mx-auto" />;
};

const Comparison = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          How We <span className="text-gradient">Compare</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          See why CV.ai is the smartest choice for your resume needs.
        </p>
      </div>

      <div className="max-w-4xl mx-auto overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 text-sm font-heading font-semibold">Feature</th>
              <th className="py-4 px-4 text-sm font-heading font-semibold">
                <span className="text-gradient">CV.ai</span>
              </th>
              <th className="py-4 px-4 text-sm font-heading font-semibold text-muted-foreground">Traditional Services</th>
              <th className="py-4 px-4 text-sm font-heading font-semibold text-muted-foreground">Other AI Tools</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.feature} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4 text-sm">{r.feature}</td>
                <td className="py-4 px-4 text-center"><Cell value={r.cvai} /></td>
                <td className="py-4 px-4 text-center"><Cell value={r.traditional} /></td>
                <td className="py-4 px-4 text-center"><Cell value={r.others} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

export default Comparison;
