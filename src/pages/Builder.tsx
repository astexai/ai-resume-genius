import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Sparkles, Plus, Trash2, CreditCard, Clock, ShieldCheck, CheckCircle, X, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Banner from "@/components/landing/Banner";

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  objective: string;
  education: { degree: string; institution: string; year: string; gpa: string }[];
  experience: { title: string; company: string; companyCity: string; duration: string; description: string }[];
  skills: string;
  projects: { name: string; description: string; tech: string; duration: string }[];
  certifications: string;
  languages: string;
  extracurricular: string;
}

const emptyEducation = { degree: "", institution: "", year: "", gpa: "" };
const emptyExperience = { title: "", company: "", companyCity: "", duration: "", description: "" };
const emptyProject = { name: "", description: "", tech: "", duration: "" };

const initialData: ResumeData = {
  fullName: "", email: "", phone: "", location: "", linkedin: "", github: "",
  objective: "",
  education: [{ ...emptyEducation }],
  experience: [{ ...emptyExperience }],
  skills: "",
  projects: [{ ...emptyProject }],
  certifications: "",
  languages: "",
  extracurricular: "",
};

const UPI_ID = "developer.aditya09@oksbi";
const UPI_AMOUNT = "49";

const Builder = () => {
  const [data, setData] = useState<ResumeData>(initialData);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const updateField = (field: keyof ResumeData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const updateArrayField = <T extends keyof ResumeData>(field: T, index: number, key: string, value: string) => {
    setData((prev) => {
      const arr = [...(prev[field] as any[])];
      arr[index] = { ...arr[index], [key]: value };
      return { ...prev, [field]: arr };
    });
  };

  const addArrayItem = (field: "education" | "experience" | "projects") => {
    const empty = field === "education" ? emptyEducation : field === "experience" ? emptyExperience : emptyProject;
    setData((prev) => ({ ...prev, [field]: [...(prev[field] as any[]), { ...empty }] }));
  };

  const removeArrayItem = (field: "education" | "experience" | "projects", index: number) => {
    setData((prev) => {
      const arr = [...(prev[field] as any[])];
      if (arr.length <= 1) return prev;
      arr.splice(index, 1);
      return { ...prev, [field]: arr };
    });
  };

  const handlePayClick = () => {
    if (!data.fullName || !data.email) {
      toast({ title: "Missing Info", description: "Please fill in at least your name and email.", variant: "destructive" });
      return;
    }
    if (!agreedToTerms) {
      toast({ title: "Terms Required", description: "Please agree to the Terms and Conditions.", variant: "destructive" });
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentDone = async () => {
    setSubmitting(true);
    setShowPaymentModal(false);

    const { error } = await supabase.from("resumes").insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone || null,
      location: data.location || null,
      linkedin: data.linkedin || null,
      github: data.github || null,
      objective: data.objective || null,
      education: data.education as any,
      experience: data.experience as any,
      skills: data.skills || null,
      projects: data.projects as any,
      certifications: data.certifications || null,
      languages: data.languages || null,
      extracurricular: data.extracurricular || null,
    });

    setSubmitting(false);

    if (error) {
      toast({ title: "Submission Failed", description: error.message, variant: "destructive" });
    } else {
      // Persist form data for the /generate flow
      try { localStorage.setItem("cv_pending_resume", JSON.stringify(data)); } catch {}
      navigate("/generate");
    }
  };

  const upiDeepLink = `upi://pay?pa=${UPI_ID}&pn=CV.ai&am=${UPI_AMOUNT}&cu=INR&tn=Resume_Builder_Payment`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiDeepLink)}`;

  return (
    <div className="min-h-screen bg-background">
      <Banner />
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-heading font-bold text-gradient">CV.ai</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="line-through text-muted-foreground/60">₹499</span>
            <span className="font-bold text-primary">₹49</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-heading font-bold mb-2">Build Your Resume</h1>
          <p className="text-muted-foreground text-sm">Fill in your details below. Our AI will create an ATS-optimized LaTeX resume for you.</p>
        </div>

        <div className="space-y-6">
          {/* Personal Info */}
          <section className="bg-card rounded-2xl border border-border p-6 hover:border-primary/20 transition-colors">
            <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
              <span className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">1</span>
              Personal Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Full Name *</Label><Input placeholder="John Doe" value={data.fullName} onChange={(e) => updateField("fullName", e.target.value)} /></div>
              <div><Label>Email *</Label><Input type="email" placeholder="john@email.com" value={data.email} onChange={(e) => updateField("email", e.target.value)} /></div>
              <div><Label>Phone</Label><Input placeholder="+91 98765 43210" value={data.phone} onChange={(e) => updateField("phone", e.target.value)} /></div>
              <div><Label>Location</Label><Input placeholder="Mumbai, India" value={data.location} onChange={(e) => updateField("location", e.target.value)} /></div>
              <div><Label>LinkedIn</Label><Input placeholder="linkedin.com/in/johndoe" value={data.linkedin} onChange={(e) => updateField("linkedin", e.target.value)} /></div>
              <div><Label>GitHub</Label><Input placeholder="github.com/johndoe" value={data.github} onChange={(e) => updateField("github", e.target.value)} /></div>
            </div>
          </section>

          {/* Objective */}
          <section className="bg-card rounded-2xl border border-border p-6 hover:border-primary/20 transition-colors">
            <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
              <span className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">2</span>
              Career Objective
            </h2>
            <Textarea placeholder="Brief career objective or professional summary..." value={data.objective} onChange={(e) => updateField("objective", e.target.value)} rows={3} />
          </section>

          {/* Education */}
          <section className="bg-card rounded-2xl border border-border p-6 hover:border-primary/20 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg font-bold flex items-center gap-2">
                <span className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">3</span>
                Education
              </h2>
              <Button variant="outline" size="sm" onClick={() => addArrayItem("education")}><Plus className="h-4 w-4 mr-1" /> Add</Button>
            </div>
            {data.education.map((edu, i) => (
              <div key={i} className="grid sm:grid-cols-2 gap-4 mb-4 pb-4 border-b border-border last:border-0 last:mb-0 last:pb-0">
                <div><Label>Degree</Label><Input placeholder="B.Tech Computer Science" value={edu.degree} onChange={(e) => updateArrayField("education", i, "degree", e.target.value)} /></div>
                <div><Label>Institution</Label><Input placeholder="IIT Delhi" value={edu.institution} onChange={(e) => updateArrayField("education", i, "institution", e.target.value)} /></div>
                <div><Label>Year</Label><Input placeholder="2020 - 2024" value={edu.year} onChange={(e) => updateArrayField("education", i, "year", e.target.value)} /></div>
                <div className="flex gap-2 items-end">
                  <div className="flex-1"><Label>GPA/Percentage</Label><Input placeholder="8.5/10" value={edu.gpa} onChange={(e) => updateArrayField("education", i, "gpa", e.target.value)} /></div>
                  {data.education.length > 1 && <Button variant="ghost" size="icon" onClick={() => removeArrayItem("education", i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>}
                </div>
              </div>
            ))}
          </section>

          {/* Experience */}
          <section className="bg-card rounded-2xl border border-border p-6 hover:border-primary/20 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg font-bold flex items-center gap-2">
                <span className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">4</span>
                Experience
              </h2>
              <Button variant="outline" size="sm" onClick={() => addArrayItem("experience")}><Plus className="h-4 w-4 mr-1" /> Add</Button>
            </div>
            {data.experience.map((exp, i) => (
              <div key={i} className="space-y-4 mb-4 pb-4 border-b border-border last:border-0 last:mb-0 last:pb-0">
                <div><Label>Job Title</Label><Input placeholder="Software Intern" value={exp.title} onChange={(e) => updateArrayField("experience", i, "title", e.target.value)} /></div>
                <div className="grid grid-cols-3 gap-4">
                  <div><Label>Company</Label><Input placeholder="Google" value={exp.company} onChange={(e) => updateArrayField("experience", i, "company", e.target.value)} /></div>
                  <div><Label>Company City</Label><Input placeholder="Bangalore" value={exp.companyCity} onChange={(e) => updateArrayField("experience", i, "companyCity", e.target.value)} /></div>
                  <div><Label>Duration</Label><Input placeholder="Jun 2023 - Aug 2023" value={exp.duration} onChange={(e) => updateArrayField("experience", i, "duration", e.target.value)} /></div>
                </div>
                <div className="flex gap-2 items-end">
                  <div className="flex-1"><Label>Description</Label><Textarea placeholder="Key responsibilities and achievements..." value={exp.description} onChange={(e) => updateArrayField("experience", i, "description", e.target.value)} rows={2} /></div>
                  {data.experience.length > 1 && <Button variant="ghost" size="icon" className="mb-1" onClick={() => removeArrayItem("experience", i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>}
                </div>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section className="bg-card rounded-2xl border border-border p-6 hover:border-primary/20 transition-colors">
            <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
              <span className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">5</span>
              Skills
            </h2>
            <Textarea placeholder="Python, JavaScript, React, Node.js, SQL, Git, Docker..." value={data.skills} onChange={(e) => updateField("skills", e.target.value)} rows={2} />
          </section>

          {/* Projects */}
          <section className="bg-card rounded-2xl border border-border p-6 hover:border-primary/20 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg font-bold flex items-center gap-2">
                <span className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">6</span>
                Projects
              </h2>
              <Button variant="outline" size="sm" onClick={() => addArrayItem("projects")}><Plus className="h-4 w-4 mr-1" /> Add</Button>
            </div>
            {data.projects.map((proj, i) => (
              <div key={i} className="space-y-4 mb-4 pb-4 border-b border-border last:border-0 last:mb-0 last:pb-0">
                <div className="flex gap-2 items-end">
                  <div className="flex-1"><Label>Project Name</Label><Input placeholder="E-commerce Platform" value={proj.name} onChange={(e) => updateArrayField("projects", i, "name", e.target.value)} /></div>
                  {data.projects.length > 1 && <Button variant="ghost" size="icon" onClick={() => removeArrayItem("projects", i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label>Technologies</Label><Input placeholder="React, Node.js, MongoDB" value={proj.tech} onChange={(e) => updateArrayField("projects", i, "tech", e.target.value)} /></div>
                  <div><Label>Duration</Label><Input placeholder="February 2026 – March 2026" value={proj.duration} onChange={(e) => updateArrayField("projects", i, "duration", e.target.value)} /></div>
                </div>
                <div><Label>Description</Label><Textarea placeholder="Brief description of the project..." value={proj.description} onChange={(e) => updateArrayField("projects", i, "description", e.target.value)} rows={2} /></div>
              </div>
            ))}
          </section>

          {/* Additional */}
          <section className="bg-card rounded-2xl border border-border p-6 hover:border-primary/20 transition-colors">
            <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
              <span className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">7</span>
              Additional
            </h2>
            <div className="space-y-4">
              <div><Label>Certifications</Label><Textarea placeholder="AWS Certified, Google Analytics..." value={data.certifications} onChange={(e) => updateField("certifications", e.target.value)} rows={2} /></div>
              <div><Label>Languages</Label><Input placeholder="English, Hindi, Tamil..." value={data.languages} onChange={(e) => updateField("languages", e.target.value)} /></div>
              <div><Label>Extra-Curricular Activities</Label><Textarea placeholder="Sports, clubs, volunteering, hackathons..." value={data.extracurricular} onChange={(e) => updateField("extracurricular", e.target.value)} rows={2} /></div>
            </div>
          </section>

          {/* Terms */}
          <section className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Terms & Conditions
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground list-disc list-inside">
              <li>All information must be correct and complete. Incorrect details may lead to rejection of the resume.</li>
              <li>After payment, the submission will be manually reviewed. The resume will be processed only if payment is successfully received.</li>
              <li>If any information is incorrect, the responsibility lies with you. The resume will be generated based only on the information you provide.</li>
              <li>Once payment is made, it is non-refundable.</li>
              <li>We do not guarantee an exact 90+ ATS score. During our current testing phase, scores may range between 80–90+, which is still considered strong and effective. All resumes will be professionally crafted according to industry and company standards.</li>
            </ul>
            <label className="flex items-center gap-3 mt-5 cursor-pointer">
              <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="h-4 w-4 rounded border-input accent-primary" />
              <span className="text-sm font-medium">I agree to the Terms & Conditions</span>
            </label>
          </section>

          {/* Payment */}
          <section className="bg-card rounded-2xl border-2 border-primary/30 p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <CreditCard className="h-5 w-5 text-primary" />
              <h2 className="font-heading text-lg font-bold">Pay & Submit</h2>
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-muted-foreground line-through">₹499</span>
              <span className="text-2xl font-heading font-bold text-primary">₹49</span>
              <span className="flex items-center gap-1 text-xs text-destructive font-medium">
                <Clock className="h-3 w-3" /> Offer valid until April 6, 2026, 12:00 PM.
              </span>
            </div>
            <Button variant="hero" size="lg" className="w-full py-6 text-base mb-4" onClick={handlePayClick} disabled={!agreedToTerms || submitting}>
              <CreditCard className="mr-2 h-5 w-5" /> {submitting ? "Submitting..." : "Pay ₹49 & Submit Resume"}
            </Button>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your resume will be processed only after payment is received, and it will be delivered within 24 hours.
            </p>
          </section>
        </div>
      </div>

      {/* UPI Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fade-up">
            <button onClick={() => setShowPaymentModal(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <QrCode className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-1">Pay via UPI</h3>
              <p className="text-sm text-muted-foreground mb-6">Scan the QR code or use the button below</p>

              <div className="bg-white rounded-xl p-4 inline-block mb-4">
                <img src={qrUrl} alt="UPI QR Code" width={200} height={200} className="mx-auto" />
              </div>

              <div className="space-y-2 mb-6 text-sm">
                <p className="text-muted-foreground">UPI ID: <span className="font-mono font-bold text-foreground">{UPI_ID}</span></p>
                <p className="text-muted-foreground">Amount: <span className="font-bold text-primary text-lg">₹{UPI_AMOUNT}</span></p>
              </div>

              <a href={upiDeepLink} className="block mb-3">
                <Button variant="hero" size="lg" className="w-full py-5">
                  Pay using UPI App
                </Button>
              </a>

              <Button variant="outline" className="w-full" onClick={handlePaymentDone} disabled={submitting}>
                {submitting ? "Submitting..." : "I have completed the payment"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center animate-fade-up">
            <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Thank you! Your resume will be delivered within 24 hours.
            </p>
            <Link to="/">
              <Button variant="hero" className="w-full">Back to Home</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Builder;
