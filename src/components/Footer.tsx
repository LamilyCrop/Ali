import { Clock3, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/70 bg-background text-foreground">
      <div className="container mx-auto px-6 py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="max-w-md">
            <a href="/" className="flex items-center gap-3">
              <img
                src="/uploads/Logo.jpg"
                alt="American Lighting Industry Corp Logo"
                className="h-14 w-14 shrink-0 rounded-full border border-border/80 bg-card p-1.5 object-contain"
              />
              <div>
                <div className="text-lg font-bold tracking-tight text-foreground">
                  American Lighting
                </div>
                <div className="text-lg font-bold tracking-tight text-foreground">
                  Industry Corp
                </div>
              </div>
            </a>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              Commercial and industrial LED fixtures, accessories, and support information presented
              with a quieter, specification-first layout.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <a
              href="mailto:info.ali@ali-corp.com"
              className="rounded-2xl border border-border/70 bg-muted/40 p-4"
            >
              <Mail className="h-5 w-5 text-foreground" />
              <div className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Email
              </div>
              <div className="mt-2 text-sm leading-6 text-foreground">info.ali@ali-corp.com</div>
            </a>

            <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
              <MapPin className="h-5 w-5 text-foreground" />
              <div className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Address
              </div>
              <div className="mt-2 text-sm leading-6 text-foreground">
                7 Scouting Blvd Medford NY 11763 USA
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
              <Clock3 className="h-5 w-5 text-foreground" />
              <div className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Hours
              </div>
              <div className="mt-2 text-sm leading-6 text-foreground">
                Monday - Friday: 9:00am - 5:00pm EST
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border/70 pt-6 text-sm text-muted-foreground">
          © {currentYear} American Lighting Industry Corp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
