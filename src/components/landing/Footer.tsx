// import { Link } from "react-router-dom";
// import { Sparkles, Mail, Twitter, Linkedin } from "lucide-react";

// const Footer = () => (
//   <footer className="bg-foreground py-16">
//     <div className="container mx-auto px-4">
//       <div className="grid md:grid-cols-4 gap-10 mb-12">
//         <div>
//           <Link to="/" className="flex items-center gap-2 mb-4">
//             <div className="h-8 w-8 rounded-lg bg-hero-gradient flex items-center justify-center">
//               <Sparkles className="h-4 w-4 text-primary-foreground" />
//             </div>
//             <span className="font-heading text-lg font-bold text-background">CV.ai</span>
//           </Link>
//           <p className="text-sm text-background/50 leading-relaxed">
//             AI-powered resume builder for students and job seekers. Build ATS-optimized resumes in minutes.
//           </p>
//         </div>

//         <div>
//           <h4 className="font-heading font-semibold text-background mb-4">Product</h4>
//           <div className="space-y-2">
//             {["Resume Builder", "Templates", "ATS Checker", "Pricing"].map((l) => (
//               <a key={l} href="#" className="block text-sm text-background/50 hover:text-background transition-colors">{l}</a>
//             ))}
//           </div>
//         </div>

//         <div>
//           <h4 className="font-heading font-semibold text-background mb-4">Company</h4>
//           <div className="space-y-2">
//             {["About Us", "Blog", "Careers", "Contact"].map((l) => (
//               <a key={l} href="#" className="block text-sm text-background/50 hover:text-background transition-colors">{l}</a>
//             ))}
//           </div>
//         </div>

//         <div>
//           <h4 className="font-heading font-semibold text-background mb-4">Connect</h4>
//           <div className="flex gap-3 mb-4">
//             {[Mail, Twitter, Linkedin].map((Icon, i) => (
//               <a key={i} href="#" className="h-10 w-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
//                 <Icon className="h-4 w-4 text-background/70" />
//               </a>
//             ))}
//           </div>
//           <p className="text-sm text-background/50">hello@cvai.in</p>
//         </div>
//       </div>

//       <div className="border-t border-background/10 pt-8 text-center">
//         <p className="text-sm text-background/40">© 2026 CV.ai. All rights reserved. Made with ❤️ for Indian students.</p>
//       </div>
//     </div>
//   </footer>
// );

// export default Footer;


import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground py-12">
    <div className="container mx-auto px-4">
      {/* Logo & Company Info */}
      <div className="text-center mb-8">
        <Link to="/" className="inline-flex items-center justify-center gap-2 mb-3">
          <div className="h-10 w-10 rounded-lg bg-hero-gradient flex items-center justify-center shadow-md">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-2xl font-bold text-background">CV.ai</span>
        </Link>
        <p className="text-sm text-background/50 max-w-md mx-auto mt-2">
          AI-powered resume builder for students and job seekers. Build ATS-optimized resumes in minutes.
        </p>
      </div>

      {/* Build Your Resume Button */}
      <div className="flex justify-center mb-8">
        <Link 
          to="/build-your-resume" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Build Your Resume
        </Link>
      </div>
      
      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
        <a href="#about" className="text-sm text-background/60 hover:text-background transition-colors">
          About
        </a>
        <a href="#benefits" className="text-sm text-background/60 hover:text-background transition-colors">
          Benefits
        </a>
        <a href="#how-it-works" className="text-sm text-background/60 hover:text-background transition-colors">
          How It Works
        </a>
        <a href="#pricing" className="text-sm text-background/60 hover:text-background transition-colors">
          Pricing
        </a>
        <a href="#testimonials" className="text-sm text-background/60 hover:text-background transition-colors">
          Testimonials
        </a>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-background/10 pt-6 text-center">
        <p className="text-sm text-background/40">© 2026 CV.ai. All rights reserved. Made with ❤️ for Indian students.</p>
      </div>
    </div>
  </footer>
);

export default Footer;