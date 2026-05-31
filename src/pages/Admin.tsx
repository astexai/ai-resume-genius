// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
// import { ArrowLeft, Download, Trash2, Users, LogOut } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/hooks/use-toast";
// import type { Json } from "@/integrations/supabase/types";

// interface Education { degree: string; institution: string; year: string; gpa: string }
// interface Experience { title: string; company: string; companyCity: string; duration: string; description: string }
// interface Project { name: string; description: string; tech: string; duration: string }

// interface Submission {
//   id: string;
//   full_name: string;
//   email: string;
//   phone: string | null;
//   location: string | null;
//   linkedin: string | null;
//   github: string | null;
//   objective: string | null;
//   education: Json | null;
//   experience: Json | null;
//   skills: string | null;
//   projects: Json | null;
//   certifications: string | null;
//   languages: string | null;
//   extracurricular: string | null;
//   status: string;
//   created_at: string;
// }

// const generatePDF = (s: Submission) => {
//   const lines: string[] = [];
//   const add = (t: string) => lines.push(t);
//   const section = (title: string) => { add(""); add("=".repeat(60)); add(`  ${title.toUpperCase()}`); add("=".repeat(60)); };

//   add("=".repeat(60));
//   add(`  ${s.full_name}`);
//   add("=".repeat(60));
//   if (s.email) add(`Email: ${s.email}`);
//   if (s.phone) add(`Phone: ${s.phone}`);
//   if (s.location) add(`Location: ${s.location}`);
//   if (s.linkedin) add(`LinkedIn: ${s.linkedin}`);
//   if (s.github) add(`GitHub: ${s.github}`);
//   if (s.objective) { section("Career Objective"); add(s.objective); }

//   const edu = (s.education || []) as unknown as Education[];
//   if (edu.length) {
//     section("Education");
//     edu.forEach((e, i) => { add(`${i+1}. ${e.degree || "N/A"}`); add(`   Institution: ${e.institution || "N/A"}`); add(`   Year: ${e.year || "N/A"}`); add(`   GPA: ${e.gpa || "N/A"}`); add(""); });
//   }

//   const exp = (s.experience || []) as unknown as Experience[];
//   if (exp.length) {
//     section("Experience");
//     exp.forEach((e, i) => { add(`${i+1}. ${e.title || "N/A"}`); add(`   Company: ${e.company || "N/A"}, ${e.companyCity || "N/A"}`); add(`   Duration: ${e.duration || "N/A"}`); add(`   Description: ${e.description || "N/A"}`); add(""); });
//   }

//   if (s.skills) { section("Skills"); add(s.skills); }

//   const proj = (s.projects || []) as unknown as Project[];
//   if (proj.length) {
//     section("Projects");
//     proj.forEach((p, i) => { add(`${i+1}. ${p.name || "N/A"}`); add(`   Technologies: ${p.tech || "N/A"}`); add(`   Duration: ${p.duration || "N/A"}`); add(`   Description: ${p.description || "N/A"}`); add(""); });
//   }

//   if (s.certifications) { section("Certifications"); add(s.certifications); }
//   if (s.languages) { section("Languages"); add(s.languages); }
//   if (s.extracurricular) { section("Extra-Curricular Activities"); add(s.extracurricular); }
//   add(""); add("-".repeat(60)); add(`Submitted: ${new Date(s.created_at).toLocaleString()}`);

//   const blob = new Blob([lines.join("\n")], { type: "text/plain" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = `${s.full_name.replace(/\s+/g, "_")}_Resume.txt`;
//   a.click();
//   URL.revokeObjectURL(url);
// };

// const Admin = () => {
//   const [submissions, setSubmissions] = useState<Submission[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const fetchSubmissions = async () => {
//     const { data, error } = await supabase
//       .from("resumes")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) {
//       toast({ title: "Error", description: error.message, variant: "destructive" });
//     } else {
//       setSubmissions(data || []);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchSubmissions();
//   }, []);

//   const handleDelete = async (id: string) => {
//     const { error } = await supabase.from("resumes").delete().eq("id", id);
//     if (error) {
//       toast({ title: "Error", description: error.message, variant: "destructive" });
//     } else {
//       setSubmissions((prev) => prev.filter((s) => s.id !== id));
//     }
//   };

//   const toggleStatus = async (id: string, current: string) => {
//     const newStatus = current === "Done" ? "Pending" : "Done";
//     const { error } = await supabase.from("resumes").update({ status: newStatus }).eq("id", id);
//     if (error) {
//       toast({ title: "Error", description: error.message, variant: "destructive" });
//     } else {
//       setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, status: newStatus } : s));
//     }
//   };

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <header className="border-b border-border bg-card sticky top-0 z-40">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <Link to="/"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
//             <div className="flex items-center gap-2">
//               <Users className="h-5 w-5 text-primary" />
//               <span className="font-heading font-bold text-gradient">Admin Panel</span>
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <span className="text-sm text-muted-foreground">{submissions.length} submission(s)</span>
//             <Button variant="outline" size="sm" onClick={handleLogout}><LogOut className="h-4 w-4 mr-1" /> Logout</Button>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8">
//         {loading ? (
//           <div className="text-center py-20 text-muted-foreground">Loading submissions...</div>
//         ) : submissions.length === 0 ? (
//           <div className="text-center py-20">
//             <Users className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
//             <h2 className="text-xl font-heading font-bold mb-2">No Submissions Yet</h2>
//             <p className="text-muted-foreground text-sm">Resume submissions will appear here after users submit the form.</p>
//           </div>
//         ) : (
//           <div className="bg-card rounded-2xl border border-border overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>#</TableHead>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Email</TableHead>
//                   <TableHead>Phone</TableHead>
//                   <TableHead>Location</TableHead>
//                   <TableHead>Submitted</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {submissions.map((s, i) => (
//                   <TableRow key={s.id}>
//                     <TableCell className="font-medium">{i + 1}</TableCell>
//                     <TableCell className="font-medium">{s.full_name}</TableCell>
//                     <TableCell>{s.email}</TableCell>
//                     <TableCell>{s.phone || "—"}</TableCell>
//                     <TableCell>{s.location || "—"}</TableCell>
//                     <TableCell className="text-muted-foreground text-xs">{new Date(s.created_at).toLocaleDateString()}</TableCell>
//                     <TableCell>
//                       <button
//                         onClick={() => toggleStatus(s.id, s.status)}
//                         className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
//                           s.status === "Done" ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"
//                         }`}
//                       >
//                         {s.status}
//                       </button>
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <div className="flex items-center justify-end gap-2">
//                         <Button variant="outline" size="sm" onClick={() => generatePDF(s)}>
//                           <Download className="h-4 w-4 mr-1" /> Download
//                         </Button>
//                         <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)}>
//                           <Trash2 className="h-4 w-4 text-destructive" />
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Admin;


import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ArrowLeft, Download, Trash2, Users, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

interface Education { degree: string; institution: string; year: string; gpa: string }
interface Experience { title: string; company: string; companyCity: string; duration: string; description: string }
interface Project { name: string; description: string; tech: string; duration: string }

interface Submission {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  location: string | null;
  linkedin: string | null;
  github: string | null;
  objective: string | null;
  education: Json | null;
  experience: Json | null;
  skills: string | null;
  projects: Json | null;
  certifications: string | null;
  languages: string | null;
  extracurricular: string | null;
  status: string;
  created_at: string;
}

const generatePDF = (s: Submission) => {
  const lines: string[] = [];
  const add = (t: string) => lines.push(t);
  const section = (title: string) => { add(""); add("=".repeat(60)); add(`  ${title.toUpperCase()}`); add("=".repeat(60)); };

  add("=".repeat(60));
  add(`  ${s.full_name}`);
  add("=".repeat(60));
  if (s.email) add(`Email: ${s.email}`);
  if (s.phone) add(`Phone: ${s.phone}`);
  if (s.location) add(`Location: ${s.location}`);
  if (s.linkedin) add(`LinkedIn: ${s.linkedin}`);
  if (s.github) add(`GitHub: ${s.github}`);
  if (s.objective) { section("Career Objective"); add(s.objective); }

  const edu = (s.education || []) as unknown as Education[];
  if (edu.length) {
    section("Education");
    edu.forEach((e, i) => { add(`${i+1}. ${e.degree || "N/A"}`); add(`   Institution: ${e.institution || "N/A"}`); add(`   Year: ${e.year || "N/A"}`); add(`   GPA: ${e.gpa || "N/A"}`); add(""); });
  }

  const exp = (s.experience || []) as unknown as Experience[];
  if (exp.length) {
    section("Experience");
    exp.forEach((e, i) => { add(`${i+1}. ${e.title || "N/A"}`); add(`   Company: ${e.company || "N/A"}, ${e.companyCity || "N/A"}`); add(`   Duration: ${e.duration || "N/A"}`); add(`   Description: ${e.description || "N/A"}`); add(""); });
  }

  if (s.skills) { section("Skills"); add(s.skills); }

  const proj = (s.projects || []) as unknown as Project[];
  if (proj.length) {
    section("Projects");
    proj.forEach((p, i) => { add(`${i+1}. ${p.name || "N/A"}`); add(`   Technologies: ${p.tech || "N/A"}`); add(`   Duration: ${p.duration || "N/A"}`); add(`   Description: ${p.description || "N/A"}`); add(""); });
  }

  if (s.certifications) { section("Certifications"); add(s.certifications); }
  if (s.languages) { section("Languages"); add(s.languages); }
  if (s.extracurricular) { section("Extra-Curricular Activities"); add(s.extracurricular); }
  add(""); add("-".repeat(60)); add(`Submitted: ${new Date(s.created_at).toLocaleString()}`);

  // Create Word document with HTML formatting for better compatibility
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${s.full_name} - Resume</title>
      <style>
        body {
          font-family: 'Calibri', 'Arial', sans-serif;
          line-height: 1.4;
          margin: 2.54cm;
          color: #000000;
        }
        h1 {
          font-size: 24pt;
          margin-bottom: 10px;
          color: #2c3e50;
          border-bottom: 2px solid #3498db;
          padding-bottom: 5px;
        }
        h2 {
          font-size: 18pt;
          margin-top: 20px;
          margin-bottom: 10px;
          color: #34495e;
          border-left: 4px solid #3498db;
          padding-left: 10px;
        }
        .contact-info {
          margin-bottom: 20px;
          font-size: 11pt;
          color: #555;
        }
        .section {
          margin-bottom: 15px;
        }
        .subheading {
          font-weight: bold;
          margin-top: 10px;
          margin-bottom: 5px;
          font-size: 12pt;
        }
        .details {
          margin-left: 20px;
          margin-bottom: 10px;
          font-size: 11pt;
        }
        .field {
          margin: 5px 0;
        }
        .label {
          font-weight: bold;
          display: inline-block;
          min-width: 100px;
        }
        hr {
          margin: 20px 0;
          border: none;
          border-top: 1px solid #ddd;
        }
        .footer {
          margin-top: 30px;
          font-size: 9pt;
          color: #999;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <h1>${s.full_name}</h1>
      <div class="contact-info">
        ${s.email ? `<div><strong>Email:</strong> ${s.email}</div>` : ''}
        ${s.phone ? `<div><strong>Phone:</strong> ${s.phone}</div>` : ''}
        ${s.location ? `<div><strong>Location:</strong> ${s.location}</div>` : ''}
        ${s.linkedin ? `<div><strong>LinkedIn:</strong> ${s.linkedin}</div>` : ''}
        ${s.github ? `<div><strong>GitHub:</strong> ${s.github}</div>` : ''}
      </div>
      
      ${s.objective ? `
      <h2>Career Objective</h2>
      <div class="section">${s.objective}</div>
      ` : ''}
      
      ${(() => {
        const edu = (s.education || []) as unknown as Education[];
        if (edu.length) {
          return `
          <h2>Education</h2>
          ${edu.map((e, i) => `
            <div class="section">
              <div class="subheading">${e.degree || 'N/A'}</div>
              <div class="details">
                <div><strong>Institution:</strong> ${e.institution || 'N/A'}</div>
                <div><strong>Year:</strong> ${e.year || 'N/A'}</div>
                <div><strong>GPA:</strong> ${e.gpa || 'N/A'}</div>
              </div>
            </div>
          `).join('')}
          `;
        }
        return '';
      })()}
      
      ${(() => {
        const exp = (s.experience || []) as unknown as Experience[];
        if (exp.length) {
          return `
          <h2>Experience</h2>
          ${exp.map((e, i) => `
            <div class="section">
              <div class="subheading">${e.title || 'N/A'}</div>
              <div class="details">
                <div><strong>Company:</strong> ${e.company || 'N/A'}, ${e.companyCity || 'N/A'}</div>
                <div><strong>Duration:</strong> ${e.duration || 'N/A'}</div>
                <div><strong>Description:</strong> ${e.description || 'N/A'}</div>
              </div>
            </div>
          `).join('')}
          `;
        }
        return '';
      })()}
      
      ${s.skills ? `
      <h2>Skills</h2>
      <div class="section">${s.skills}</div>
      ` : ''}
      
      ${(() => {
        const proj = (s.projects || []) as unknown as Project[];
        if (proj.length) {
          return `
          <h2>Projects</h2>
          ${proj.map((p, i) => `
            <div class="section">
              <div class="subheading">${p.name || 'N/A'}</div>
              <div class="details">
                <div><strong>Technologies:</strong> ${p.tech || 'N/A'}</div>
                <div><strong>Duration:</strong> ${p.duration || 'N/A'}</div>
                <div><strong>Description:</strong> ${p.description || 'N/A'}</div>
              </div>
            </div>
          `).join('')}
          `;
        }
        return '';
      })()}
      
      ${s.certifications ? `
      <h2>Certifications</h2>
      <div class="section">${s.certifications}</div>
      ` : ''}
      
      ${s.languages ? `
      <h2>Languages</h2>
      <div class="section">${s.languages}</div>
      ` : ''}
      
      ${s.extracurricular ? `
      <h2>Extra-Curricular Activities</h2>
      <div class="section">${s.extracurricular}</div>
      ` : ''}
      
      <hr />
      <div class="footer">Submitted: ${new Date(s.created_at).toLocaleString()}</div>
    </body>
    </html>
  `;

  // Create Word document with proper MIME type
  const blob = new Blob([htmlContent], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${s.full_name.replace(/\s+/g, "_")}_Resume.doc`;
  a.click();
  URL.revokeObjectURL(url);
};

const Admin = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSubmissions(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("resumes").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const toggleStatus = async (id: string, current: string) => {
    const newStatus = current === "Done" ? "Pending" : "Done";
    const { error } = await supabase.from("resumes").update({ status: newStatus }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, status: newStatus } : s));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth/signin/");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-heading font-bold text-gradient">Admin Panel</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{submissions.length} submission(s)</span>
            <Button variant="outline" size="sm" onClick={handleLogout}><LogOut className="h-4 w-4 mr-1" /> Logout</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading submissions...</div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-20">
            <Users className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-xl font-heading font-bold mb-2">No Submissions Yet</h2>
            <p className="text-muted-foreground text-sm">Resume submissions will appear here after users submit the form.</p>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((s, i) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell className="font-medium">{s.full_name}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell>{s.phone || "—"}</TableCell>
                    <TableCell>{s.location || "—"}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">{new Date(s.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => toggleStatus(s.id, s.status)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                          s.status === "Done" ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"
                        }`}
                      >
                        {s.status}
                      </button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => generatePDF(s)}>
                          <Download className="h-4 w-4 mr-1" /> Download
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;