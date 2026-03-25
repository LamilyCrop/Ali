const operatingPrinciples = [
  {
    label: "Quality",
    description: "Commercial fixtures and accessories built around tested materials, clear specifications, and established compliance listings.",
  },
  {
    label: "Pricing",
    description: "Competitive programs designed for distributors, contractors, and repeat purchasing without unnecessary presentation layers.",
  },
  {
    label: "Support",
    description: "Direct help with submittals, product matching, warranty questions, and delivery coordination when projects are moving quickly.",
  },
];

const capabilities = [
  "TAA-compliant product options",
  "Commercial and industrial LED fixtures",
  "Warranty and technical support",
  "Nationwide delivery coordination",
];

const AboutSection = () => {
  return (
    <section id="about" className="bg-muted/25 py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
          <div className="max-w-3xl">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-primary/70">
              Why ALI
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Dependable lighting for commercial work.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              American Lighting Industry Corp supports distributors, contractors, OEM partners, and
              specifiers with fixtures and accessories selected for reliable day-to-day use.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              The experience stays focused on documentation, practical lead times, and responsive
              support so procurement and installation teams can move with less friction.
            </p>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {capabilities.map((capability) => (
                <li key={capability} className="flex items-start gap-3 border-t border-border/70 pt-4">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/55" />
                  <span className="text-sm leading-6 text-foreground/88 sm:text-[0.95rem]">
                    {capability}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-8 lg:pt-16">
            {operatingPrinciples.map((principle) => (
              <div
                key={principle.label}
                className="border-t border-border/70 pt-6 first:border-t-0 first:pt-0"
              >
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-primary/65">
                  {principle.label}
                </p>
                <p className="mt-3 max-w-md text-base leading-7 text-muted-foreground">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
