import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Loader2,
  Sparkles,
  Download,
  FileCode2,
  RotateCcw,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
type ResumeFormData = { fullName?: string; [k: string]: any };

const STEPS = [
  "Payment Verified",
  "Analyzing User Data",
  "Optimizing for ATS Score",
  "Generating LaTeX Resume",
  "Formatting & Structuring",
  "Finalizing Resume",
];

const Generate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [latex, setLatex] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const startedRef = useRef(false);

  const formData = useMemo<ResumeFormData | null>(() => {
    try {
      const raw = localStorage.getItem("cv_pending_resume");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const SYSTEM_MESSAGE = `You are an expert ATS resume writer and LaTeX generator using GPT API.

Your task is to generate a highly optimized ATS-friendly resume (ATS score 90+ or above) by intelligently rewriting and enhancing user-provided data, then inserting it into the given LaTeX template.

⚠️ STRICT TEMPLATE & DESIGN RULE (NON-NEGOTIABLE)
You MUST use the EXACT SAME LaTeX template provided below
You MUST NOT change: Structure, Layout, Spacing, Alignment, Font size, Commands, Design
The LaTeX template defines the FINAL DESIGN of the resume
You are ONLY allowed to replace the content inside placeholders

🔥 MANDATORY CONTENT TRANSFORMATION (CRITICAL)
You MUST NOT copy user input directly
Before inserting into the template, you MUST:
- Rewrite every sentence
- Improve grammar and clarity
- Remove repetition and weak phrases
- Convert responsibilities into achievements
- Use strong action verbs
- Add measurable impact (%, numbers, scale)
- Make content concise but powerful
If output looks similar to input → it is WRONG.

📂 SMART SELECTION RULE (PROJECTS & EXPERIENCE)
This rule MUST be followed strictly for BOTH Education, Work Experience, and Projects:
- If user provides 1 item → include 1
- If user provides 2 items → include 2
- If user provides 3 items → include 3
- If user provides MORE THAN 3 items → Select ONLY TOP 3 most impactful entries, prioritizing impact, metrics, and ATS relevance.
DO NOT exceed 3 entries in each section.

📄 FULL-PAGE CONTENT RULE (VERY IMPORTANT)
The resume MUST fully utilize one complete page. Do NOT generate sparse or half-filled content.
Target structure:
- Career Objective → 3 sentences (70–90 words)
- Skills → 4 rows × 5–8 items each
- Experience → Each entry: 3 bullet points, each bullet 18–25 words
- Projects → Each project: 3 bullet points, each bullet 18–25 words
- Extra Curricular → 2 bullet points (12–18 words each)
If content is short → Expand with realistic details, tools, and metrics.
If content is long → Compress but DO NOT remove important data.

📄 LATEX TEMPLATE (DO NOT MODIFY)

\\documentclass{article}
\\usepackage[top=0.2in, bottom=0.2in, left=0.3in, right=0.3in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}

\\begin{document}

\\begin{center}
\\thispagestyle{empty}
\\large \\textbf{FULL NAME} \\\\
\\normalsize City, Country $\\mid$ Phone $\\mid$ \\href{mailto:email}{email} $\\mid$ \\href{linkedin}{LinkedIn} $\\mid$ \\href{github}{Github} \\\\
\\rule{\\textwidth}{1pt}
\\end{center}

\\noindent \\textbf{\\underline{EDUCATION}}

{\\small
\\noindent \\textbf{Degree} \\hfill \\textbf{Duration} \\\\
Location \\textit{College $\\mid$ CGPA: X/10}

\\vspace{2mm}

\\noindent \\textbf{12th} \\hfill \\textbf{Duration} \\\\
\\textit{School} {Percentage: XX%}

\\vspace{2mm}

\\noindent \\textbf{10th} \\hfill \\textbf{Duration} \\\\
\\textit{School} {Percentage: XX%}

\\vspace{2mm}
}

\\noindent \\textbf{\\underline{PROFESSIONAL WORK EXPERIENCE}}
\\vspace{1mm}

\\noindent \\textbf{Role $\\mid$ Company, Location} \\hfill \\textbf{Duration}
\\begin{itemize}[noitemsep,nolistsep,leftmargin=*]
\\item Bullet point
\\item Bullet point
\\item Bullet point
\\end{itemize}

\\noindent \\textbf{\\underline{PROJECTS}}
\\vspace{1mm}

\\noindent \\textbf{Project Name} $\\mid$ \\textit{Tech Stack} \\hfill \\textbf{Duration}
\\begin{itemize}[noitemsep,nolistsep,leftmargin=*]
\\item Bullet point
\\item Bullet point
\\item Bullet point
\\end{itemize}

\\noindent \\textbf{\\underline{CERTIFICATIONS}}
\\vspace{1mm}
\\begin{itemize}[noitemsep,nolistsep,leftmargin=*]
\\item Certification
\\item Certification
\\end{itemize}

\\noindent \\textbf{\\underline{EXTRA CURRICULAR ACTIVITIES}}
\\vspace{1mm}

\\noindent \\textbf{Activity} \\hfill \\textbf{Duration}
\\begin{itemize}[noitemsep,nolistsep,leftmargin=*]
\\item Bullet point
\\item Bullet point
\\end{itemize}

\\noindent \\textbf{\\underline{LANGUAGES KNOWN}}
\\vspace{1mm}
\\begin{itemize}[noitemsep,nolistsep,leftmargin=*]
\\item Language — Proficiency
\\item Language — Proficiency
\\end{itemize}

\\end{document}

📌 CONTENT RULES
- No duplicate words
- No repeated phrases
- Grammar must be perfect
- Use strong action verbs
- Keep content concise and impactful

📊 BULLET RULES
- Maximum 2–3 bullet points per section
- Each bullet: Minimum 1 line, Maximum 1.5 lines
- No long paragraphs

📈 QUANTIFICATION RULE (MANDATORY)
- Every bullet MUST include measurable impact
- Use numbers, percentages, or scale
- If not provided → intelligently estimate realistic values

🎯 ATS OPTIMIZATION
Ensure ATS score is 90+. Include relevant keywords naturally. Avoid keyword stuffing.

📤 OUTPUT RULES
Output ONLY LaTeX code. No explanation. No markdown. No extra text.

⚠️ FINAL VALIDATION
No repetition ✔ No duplicate words ✔ Grammar perfect ✔ Bullet rules followed ✔ Quantified achievements ✔ ATS optimized ✔ Template unchanged ✔

🧪 EXAMPLE TRANSFORMATION
Input: "Worked on API development"
Output: "Developed and optimized REST APIs, improving response time by 35% and reducing server load by 20%"

🧪 INSTRUCTION
You will receive user resume data. Your task:
→ Rewrite and enhance content
→ Apply smart selection rules
→ Ensure full-page content
→ Insert into LaTeX template
→ Maintain EXACT structure and design
→ Ensure ATS score above 90

Now generate the final LaTeX resume.`;

  async function compileLatexToPdf(latex: string): Promise<Uint8Array> {
    const form = new FormData();
    form.append("filename[]", "document.tex");
    form.append("filecontents[]", latex);
    form.append("return", "pdf");
    form.append("engine", "pdflatex");

    const res = await fetch("https://texlive.net/cgi-bin/latexcgi", {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(
        `LaTeX compile failed (${res.status}): ${txt.slice(0, 500)}`,
      );
    }

    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("pdf")) {
      const txt = await res.text().catch(() => "");
      throw new Error(`LaTeX compile did not return PDF. ${txt.slice(0, 800)}`);
    }

    const buf = new Uint8Array(await res.arrayBuffer());
    return buf;
  }

  function toBase64(bytes: Uint8Array): string {
    let binary = "";
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
    }
    return btoa(binary);
  }

  const runGeneration = async () => {
    if (!formData) {
      navigate("/build-your-resume");
      return;
    }
    setError(null);
    setDone(false);
    setActiveStep(0);
    setProgress(0);

    const apiPromise = (async () => {
      const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
      if (
        !OPENAI_API_KEY ||
        OPENAI_API_KEY ===
          ""
      )
        throw new Error("Please set your OpenAI API key in the .env file!");

      const userPrompt = `Here is the user resume data (JSON):

${JSON.stringify(formData, null, 2)}

Rewrite, enhance, and insert into the LaTeX template. Output ONLY the final LaTeX code.`;

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: SYSTEM_MESSAGE },
              { role: "user", content: userPrompt },
            ],
          }),
        },
      );
 
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Rate limits exceeded, please try again later.");
        }
        if (response.status === 402) {
          throw new Error(
            "AI credits exhausted. Please add funds to your OpenAI account.",
          );
        }
        const t = await response.text();
        console.error("AI gateway error:", response.status, t);
        throw new Error("AI gateway error");
      }

      const data = await response.json();
      let latex: string = data.choices?.[0]?.message?.content ?? "";
      latex = latex
        .replace(/^```(?:latex|tex)?\s*/i, "")
        .replace(/```\s*$/i, "")
        .trim();

      if (!latex.includes("\\begin{document}")) {
        throw new Error("Model did not return valid LaTeX.");
      }

      let pdfBase64 = "";
      try {
        const pdfBytes = await compileLatexToPdf(latex);
        pdfBase64 = toBase64(pdfBytes);
      } catch (err) {
        console.error("LaTeX compile error:", err);
        throw new Error(
          err instanceof Error ? err.message : "LaTeX compilation failed",
        );
      }

      return { latex, pdfBase64 };
    })();

    for (let i = 0; i < STEPS.length; i++) {
      setActiveStep(i);
      const target = Math.round(((i + 1) / STEPS.length) * 95);
      const start = Math.round((i / STEPS.length) * 95);
      const duration = i === 0 ? 600 : 1200;
      const t0 = performance.now();
      await new Promise<void>((resolve) => {
        const tick = () => {
          const p = Math.min(1, (performance.now() - t0) / duration);
          setProgress(start + (target - start) * p);
          if (p < 1) requestAnimationFrame(tick);
          else resolve();
        };
        requestAnimationFrame(tick);
      });
    }

    try {
      const { latex, pdfBase64 } = await apiPromise;
      setLatex(latex);
      const byteChars = atob(pdfBase64);
      const bytes = new Uint8Array(byteChars.length);
      for (let i = 0; i < byteChars.length; i++)
        bytes[i] = byteChars.charCodeAt(i);
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setProgress(100);
      setDone(true);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate resume.",
      );
    }
  };

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    if (!formData) {
      toast({
        title: "No data found",
        description: "Please fill the form first.",
        variant: "destructive",
      });
      navigate("/build-your-resume");
      return;
    }
    runGeneration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownloadPdf = () => {
    if (!pdfUrl) return;
    const a = document.createElement("a");
    const name = (formData?.fullName || "resume").replace(/\s+/g, "_");
    a.href = pdfUrl;
    a.download = `${name}_Resume.pdf`;
    a.click();
  };

  const handleDownloadLatex = () => {
    if (!latex) return;
    const blob = new Blob([latex], { type: "application/x-tex" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const name = (formData?.fullName || "resume").replace(/\s+/g, "_");
    a.href = url;
    a.download = `${name}_Resume.tex`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-heading font-bold text-gradient">CV.ai</span>
          </Link>
          <Link to="/build-your-resume">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Builder
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {!done && !error && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-8 shadow-sm"
          >
            <div className="text-center mb-8">
              <div className="h-14 w-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <h1 className="font-heading text-2xl font-bold mb-1">
                Crafting Your Resume
              </h1>
              <p className="text-muted-foreground text-sm">
                Our AI is optimizing every section for maximum ATS score.
              </p>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-xs font-medium text-muted-foreground mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-3">
              {STEPS.map((label, idx) => {
                const isDoneStep =
                  idx < activeStep || (idx === activeStep && progress >= 100);
                const isActive = idx === activeStep && !isDoneStep;
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0.5, x: -4 }}
                    animate={{ opacity: idx <= activeStep ? 1 : 0.4, x: 0 }}
                    className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${
                      isActive
                        ? "border-primary/40 bg-primary/5"
                        : isDoneStep
                          ? "border-green-500/30 bg-green-500/5"
                          : "border-border"
                    }`}
                  >
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-background border border-border">
                      {isDoneStep ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : isActive ? (
                        <Loader2 className="h-4 w-4 text-primary animate-spin" />
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {idx + 1}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium ${isActive ? "text-foreground" : isDoneStep ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border border-destructive/30 rounded-2xl p-8 text-center"
          >
            <h2 className="font-heading text-xl font-bold mb-2">
              Generation Failed
            </h2>
            <p className="text-muted-foreground text-sm mb-6">{error}</p>
            <Button
              variant="hero"
              onClick={() => {
                startedRef.current = false;
                runGeneration();
              }}
            >
              <RotateCcw className="h-4 w-4 mr-2" /> Regenerate Resume
            </Button>
          </motion.div>
        )}

        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-card border border-border rounded-2xl p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="h-16 w-16 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-4"
                >
                  <CheckCircle2 className="h-9 w-9 text-green-500" />
                </motion.div>
                <h2 className="font-heading text-2xl font-bold mb-1">
                  Your Resume is Ready!
                </h2>
                <p className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
                  <ShieldCheck className="h-4 w-4 text-primary" /> ATS Score:
                  90+ Optimized
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                  <Button variant="hero" size="lg" onClick={handleDownloadPdf}>
                    <Download className="h-4 w-4 mr-2" /> Download Resume (PDF)
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleDownloadLatex}
                  >
                    <FileCode2 className="h-4 w-4 mr-2" /> Download LaTeX Code
                  </Button>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="px-6 py-3 border-b border-border flex items-center justify-between">
                  <h3 className="font-heading text-sm font-bold">Preview</h3>
                  <span className="text-xs text-muted-foreground">
                    PDF · ATS-ready
                  </span>
                </div>
                {pdfUrl ? (
                  <iframe
                    src={pdfUrl}
                    title="Resume preview"
                    className="w-full h-[820px] bg-muted"
                  />
                ) : (
                  <div className="h-[400px] flex items-center justify-center text-muted-foreground text-sm">
                    Preparing preview…
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Generate;
