
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

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

\noindent \textbf{\underline{CERTIFICATIONS}}
\vspace{1mm}
\begin{itemize}[noitemsep,nolistsep,leftmargin=*]
\item Certification
\item Certification
\end{itemize}

\noindent \textbf{\underline{EXTRA CURRICULAR ACTIVITIES}}
\vspace{1mm}

\noindent \textbf{Activity} \hfill \textbf{Duration}
\begin{itemize}[noitemsep,nolistsep,leftmargin=*]
\item Bullet point
\item Bullet point
\end{itemize}

\noindent \textbf{\underline{LANGUAGES KNOWN}}
\vspace{1mm}
\begin{itemize}[noitemsep,nolistsep,leftmargin=*]
\item Language — Proficiency
\item Language — Proficiency
\end{itemize}

\end{document}

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
  // Use texlive.net's latexcgi which compiles LaTeX and returns a PDF
  const form = new FormData();
  form.append('filename[]', 'document.tex');
  form.append('filecontents[]', latex);
  form.append('return', 'pdf');
  form.append('engine', 'pdflatex');

  const res = await fetch('https://texlive.net/cgi-bin/latexcgi', {
    method: 'POST',
    body: form,
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`LaTeX compile failed (${res.status}): ${txt.slice(0, 500)}`);
  }

  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('pdf')) {
    const txt = await res.text().catch(() => '');
    throw new Error(`LaTeX compile did not return PDF. ${txt.slice(0, 800)}`);
  }

  const buf = new Uint8Array(await res.arrayBuffer());
  return buf;
}

function toBase64(bytes: Uint8Array): string {
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { formData } = await req.json();
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is not configured');

    const userPrompt = `Here is the user resume data (JSON):\n\n${JSON.stringify(formData, null, 2)}\n\nRewrite, enhance, and insert into the LaTeX template. Output ONLY the final LaTeX code.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: SYSTEM_MESSAGE },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limits exceeded, please try again later.' }), {
          status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits exhausted. Please add funds to your Lovable workspace.' }), {
          status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const t = await response.text();
      console.error('AI gateway error:', response.status, t);
      return new Response(JSON.stringify({ error: 'AI gateway error' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    let latex: string = data.choices?.[0]?.message?.content ?? '';
    latex = latex.replace(/^```(?:latex|tex)?\s*/i, '').replace(/```\s*$/i, '').trim();

    if (!latex.includes('\\begin{document}')) {
      return new Response(JSON.stringify({ error: 'Model did not return valid LaTeX.' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Compile LaTeX → PDF (single source of truth)
    let pdfBase64 = '';
    try {
      const pdfBytes = await compileLatexToPdf(latex);
      pdfBase64 = toBase64(pdfBytes);
    } catch (err) {
      console.error('LaTeX compile error:', err);
      return new Response(JSON.stringify({
        error: err instanceof Error ? err.message : 'LaTeX compilation failed',
        latex,
      }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ latex, pdfBase64 }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (e) {
    console.error('generate-resume error:', e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
