import { jsPDF } from "jspdf";

export interface ResumeFormData {
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

/**
 * Render an ATS-friendly resume PDF that mirrors the LaTeX template's structure.
 * Uses jsPDF (no LaTeX compiler needed on the client).
 */
export function buildResumePdf(data: ResumeFormData, latex?: string): jsPDF {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 28;
  let y = 32;

  const line = (yy: number) => {
    doc.setLineWidth(0.8);
    doc.line(margin, yy, pageW - margin, yy);
  };

  const sectionHeading = (text: string) => {
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(text.toUpperCase(), margin, y);
    doc.setLineWidth(0.5);
    doc.line(margin, y + 2, pageW - margin, y + 2);
    y += 12;
  };

  const writeWrapped = (text: string, x: number, opts: { size?: number; bold?: boolean; italic?: boolean; maxW?: number } = {}) => {
    const { size = 10, bold = false, italic = false, maxW = pageW - margin * 2 } = opts;
    doc.setFont("helvetica", bold ? (italic ? "bolditalic" : "bold") : italic ? "italic" : "normal");
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, maxW);
    doc.text(lines, x, y);
    y += lines.length * (size + 2);
  };

  const rightText = (left: string, right: string, opts: { size?: number; bold?: boolean } = {}) => {
    const { size = 10, bold = true } = opts;
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.text(left, margin, y);
    const w = doc.getTextWidth(right);
    doc.text(right, pageW - margin - w, y);
    y += size + 3;
  };

  // ===== Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(data.fullName || "FULL NAME", pageW / 2, y, { align: "center" });
  y += 16;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  const contactParts = [
    data.location,
    data.phone,
    data.email,
    data.linkedin,
    data.github,
  ].filter(Boolean);
  const contactLine = contactParts.join("  |  ");
  const contactLines = doc.splitTextToSize(contactLine, pageW - margin * 2);
  doc.text(contactLines, pageW / 2, y, { align: "center" });
  y += contactLines.length * 11 + 2;
  line(y);
  y += 6;

  // ===== Objective
  if (data.objective?.trim()) {
    sectionHeading("Objective");
    writeWrapped(data.objective, margin, { size: 10 });
    y += 2;
  }

  // ===== Education
  if (data.education?.some(e => e.degree || e.institution)) {
    sectionHeading("Education");
    data.education.forEach(edu => {
      if (!edu.degree && !edu.institution) return;
      rightText(edu.degree || "Degree", edu.year || "", { size: 10, bold: true });
      const sub = [edu.institution, edu.gpa ? `CGPA/Percentage: ${edu.gpa}` : ""].filter(Boolean).join("  |  ");
      writeWrapped(sub, margin, { size: 9.5, italic: true });
      y += 2;
    });
  }

  // ===== Experience
  if (data.experience?.some(e => e.title || e.company)) {
    sectionHeading("Professional Work Experience");
    data.experience.forEach(exp => {
      if (!exp.title && !exp.company) return;
      const left = [exp.title, [exp.company, exp.companyCity].filter(Boolean).join(", ")].filter(Boolean).join("  |  ");
      rightText(left, exp.duration || "", { size: 10, bold: true });
      if (exp.description?.trim()) {
        const bullets = exp.description.split(/\n+/).map(s => s.trim()).filter(Boolean);
        bullets.forEach(b => {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          const text = `• ${b}`;
          const lines = doc.splitTextToSize(text, pageW - margin * 2 - 10);
          doc.text(lines, margin + 8, y);
          y += lines.length * 12;
        });
      }
      y += 2;
    });
  }

  // ===== Skills
  if (data.skills?.trim()) {
    sectionHeading("Skills");
    writeWrapped(data.skills, margin, { size: 10 });
    y += 2;
  }

  // ===== Projects
  if (data.projects?.some(p => p.name || p.description)) {
    sectionHeading("Projects");
    data.projects.forEach(p => {
      if (!p.name && !p.description) return;
      const left = [p.name, p.tech ? `(${p.tech})` : ""].filter(Boolean).join(" ");
      rightText(left, p.duration || "", { size: 10, bold: true });
      if (p.description?.trim()) {
        const bullets = p.description.split(/\n+/).map(s => s.trim()).filter(Boolean);
        bullets.forEach(b => {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          const text = `• ${b}`;
          const lines = doc.splitTextToSize(text, pageW - margin * 2 - 10);
          doc.text(lines, margin + 8, y);
          y += lines.length * 12;
        });
      }
      y += 2;
    });
  }

  // ===== Certifications
  if (data.certifications?.trim()) {
    sectionHeading("Certifications");
    writeWrapped(data.certifications, margin, { size: 10 });
    y += 2;
  }

  // ===== Languages
  if (data.languages?.trim()) {
    sectionHeading("Languages");
    writeWrapped(data.languages, margin, { size: 10 });
    y += 2;
  }

  // ===== Extra-curricular
  if (data.extracurricular?.trim()) {
    sectionHeading("Extra Curricular Activities");
    writeWrapped(data.extracurricular, margin, { size: 10 });
  }

  return doc;
}
