import { Link } from "react-router-dom";
import { Zap, Clock } from "lucide-react";

const Banner = () => (
  <div className="bg-primary text-primary-foreground py-2.5 text-center text-sm font-medium relative z-50">
    <div className="container mx-auto px-4 flex items-center justify-center gap-3 flex-wrap">
      <Zap className="h-4 w-4" />
      <span>
        Limited Offer: Get your ATS-optimized resume for just{" "}
        <span className="line-through opacity-70">₹499</span>{" "}
        <strong>₹49</strong>
      </span>
      <span className="flex items-center gap-1 opacity-80">
        <Clock className="h-3.5 w-3.5" /> Valid for 48 hours only
      </span>
      <Link
        to="/build-your-resume"
        className="ml-2 bg-primary-foreground text-primary px-3 py-0.5 rounded-full text-xs font-bold hover:opacity-90 transition-opacity"
      >
        Build Now →
      </Link>
    </div>
  </div>
);

export default Banner;
