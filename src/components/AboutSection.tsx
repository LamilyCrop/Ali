import { Card } from "@/components/ui/card";
import { Award, Star, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const AboutSection = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.3 });
  const { elementRef: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.2 });

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
    <section id="about" className="bg-muted/35 py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)]">
          <div 
            ref={titleRef}
            className={`transition-all duration-1000 ease-out ${
              titleVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
          >
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Why ALI
            </p>

            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Built for dependable commercial lighting.
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
                  className="flex items-center gap-3 rounded-full border border-border/70 bg-background/70 px-4 py-3"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground/70" />
                  <span className="text-sm font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div 
            ref={cardsRef}
            className={`space-y-6 transition-all duration-1000 ease-out ${
              cardsVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-12'
            }`}
          >
            {values.map((value, index) => (
              <Card
                key={index}
                className={`border-border/70 bg-background/85 p-6 transition-all duration-500 ${
                  cardsVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: cardsVisible ? `${index * 0.2}s` : '0s'
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-muted">
                    <value.icon className="h-5 w-5 text-foreground" />
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
