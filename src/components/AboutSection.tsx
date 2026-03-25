import { Card } from "@/components/ui/card";
import { Award, Star, Users } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Star,
      title: "Best Quality",
      description: "Premium materials and rigorous testing ensure superior performance"
    },
    {
      icon: Award,
      title: "Competitive Price",
      description: "Industry-leading prices without compromising on quality"
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Dedicated to building mutually successful relationships"
    }
  ];

  const features = [
    "TAA Compliant Products",
    "Energy Efficient LED Technology", 
    "Industrial Grade Quality",
    "Comprehensive Warranty",
    "Expert Technical Support",
    "Fast Delivery Nationwide"
  ];

  return (
    <section id="about" className="bg-background py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)]">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-primary/75">
              Why ALI
            </p>

            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Built for dependable <span className="text-primary">commercial lighting.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              American Lighting Industry Corp keeps pricing competitive without leaning on noisy
              presentation. The focus stays on reliability, documentation, and long-term customer
              relationships.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              From TAA-compliant products to nationwide delivery support, the experience should feel
              clear, direct, and specification-ready.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-full border border-primary/10 bg-background px-4 py-3"
                >
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-sm font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-primary/10 bg-background p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/10 bg-primary/10">
                    <value.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
