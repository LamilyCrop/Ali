import { Mail, MapPin } from "lucide-react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-primary text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 gap-6">
            <div className="flex items-center space-x-3">
              <img src="/uploads/8fbd59a6-728d-4cbd-9232-f8ae5cbe72ca.png" alt="Lamily Corp Logo" className="w-12 h-12" />
              <div className="text-lg font-bold font-sans">Lamily Corp</div>
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-6">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent" />
                <span className="text-white/80">info@lamily-corp.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent mt-1" />
                <div className="text-white/80">356 Market St. Kenilworth NJ</div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 text-accent flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12,6 12,12 16,14"></polyline>
                  </svg>
                </div>
                <div className="text-white/80">Monday - Friday: 9:00am - 5:00pm EST</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © {currentYear} Lamily Corp. All rights reserved.
            </div>
            
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;