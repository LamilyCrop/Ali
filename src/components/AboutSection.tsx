import { Card } from "@/components/ui/card";
import { CheckCircle, Star, Award, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const AboutSection = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.3 });
  const { elementRef: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.2 });

  const values = [
    {
      icon: <Star className="w-8 h-8 text-accent" />,
      title: "Best Quality",
      description: "Premium materials and rigorous testing ensure superior performance"
    },
    {
      icon: <Award className="w-8 h-8 text-accent" />,
      title: "Competitive Price",
      description: "Industry-leading prices without compromising on quality"
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
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
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div 
            ref={titleRef}
            className={`transition-all duration-1000 ease-out ${
              titleVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-8">
              OUR STORY IS 
              <span className="block bg-gradient-accent bg-clip-text text-transparent">
                YOUR STORY
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We promise our customers that they can get the most competitive price with the best quality. 
              We are committed to our customers and partners and we work to ensure that our strong 
              relationships are mutually successful.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8">
              It is our legacy, our reputation and our future.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* Button removed per request */}
          </div>

          {/* Value Cards */}
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
                className={`p-6 shadow-soft hover:shadow-medium transition-all duration-500 hover:scale-105 ${
                  cardsVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: cardsVisible ? `${index * 0.2}s` : '0s'
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
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
