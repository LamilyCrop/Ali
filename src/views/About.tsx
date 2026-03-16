"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Phone, Mail, Shield, Award, FileText, Send } from "lucide-react";
import { useEffect } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const About = () => {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.3 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || 'Message from Lamily Corp Website');
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );
    
    const mailtoLink = `mailto:info@lamily-corp.com?subject=${subject}&body=${body}`;
    window.open(mailtoLink);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const certifications = [
    "TUV-CE", "RoHS", "UL", "DLC", "ENERGY STAR", "ETL", "CSA", "FCC", "IP Ratings"
  ];

  const supportFeatures = [
    "Online product catalog with full specifications",
    "Installation instructions and material data sheets",
    "Compatibility reports and electrical information",
    "Downloadable specification sheets",
    "Technical support via email and phone",
    "Fast response during business hours"
  ];

  // Ensure cross-page nav scrolls to the correct section on mount without visible extra scroll
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sectionFromQuery = params.get('section');
    const sectionFromHash = window.location.hash ? window.location.hash.replace('#', '') : '';
    const targetId = sectionFromQuery || sectionFromHash;
    if (targetId) {
      window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'auto', block: 'start' });
      });
    }
  }, []);

  return (
    <div id="top" className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">

        {/* Hero Section */}
        <section className="relative py-32 bg-primary">
          <div className="container mx-auto px-6 relative z-10">
            <div
              ref={heroRef}
              className={`text-center transition-all duration-1000 ease-out ${heroVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
                }`}
            >
              <h1 className="text-5xl md:text-6xl font-sans font-bold text-white mt-12 mb-12">
                About <span className="bg-gradient-accent bg-clip-text text-transparent">Lamily Corp</span>
              </h1>
              <p className="text-xl font-sans text-white max-w-3xl mx-auto">
                Leading U.S. based lighting manufacturer delivering premium LED solutions
                with uncompromising quality and competitive pricing.
              </p>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="our-story" className="py-20 bg-background scroll-mt-24">
          <div className="container mx-auto px-6">
            <div>
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl font-sans font-bold text-foreground mb-8">
                    Our Story
                  </h2>
                  <p className="text-lg font-sans text-muted-foreground mb-6 leading-relaxed">
                    Lamily Corp is a privately held U.S. based lighting manufacturer located in New York and New Jersey. 
                    Primarily engaging in LED and Smart Light Wholesale Business.
                  </p>
                  <p className="text-lg font-sans text-muted-foreground mb-6 leading-relaxed">
                  Lamily Corp services nearly every market, from electrical distributors and lighting showroom, to OEM, contractors, and designers. We believe high-quality is essential for building a solid relationship with customers. Our products are all accredited by TUV-CE, RoHS, UL, DLC, ENERGY STAR, etc. Every manufacturing process, from raw material to finished goods, is under strict control. Our products are constantly evolving as technology advances.
                  </p>
                  <p className="text-lg font-sans text-foreground font-semibold mb-8">
                    We promise our customer that they can get the most Competitive Price with the Best Quality, we are committed to our customers and partners and we work ensure that our strong relationships are mutually successful. It is our legacy, our reputation and our future.
                  </p>
                </div>

                <Card className="p-8 shadow-medium">
                  <h3 className="text-2xl font-sans font-bold text-foreground mb-6">Our Certifications</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-sm font-sans font-medium text-foreground">{cert}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section id="support" className="py-20 bg-muted/30 scroll-mt-24">
          <div className="container mx-auto px-6">
            <div>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-sans font-bold text-foreground mb-6">
                  We are here to help!
                </h2>
                <p className="text-xl font-sans text-muted-foreground max-w-3xl mx-auto">
                  We provide comprehensive support to ensure your success with our LED lighting solutions.
                </p>
              </div>

              <div className="max-w-4xl mx-auto mb-16">
                <Card className="p-8 shadow-soft">
                  <div className="flex items-center mb-6">
                    <FileText className="w-8 h-8 text-accent mr-4" />
                    <h3 className="text-2xl font-sans font-bold text-foreground">Product Resources</h3>
                  </div>
                  <div className="space-y-4">
                    {supportFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="font-sans text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>

              </div>
            </div>
          </div>
        </section>

        {/* Warranty Section */}
        <section id="warranty" className="py-20 bg-background scroll-mt-24">
          <div className="container mx-auto px-6">
            <div>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-sans font-bold text-foreground mb-6">
                  Product Warranty
                </h2>
                <p className="text-xl font-sans text-muted-foreground">
                  Comprehensive protection for your LED lighting investment
                </p>
              </div>

              <div className="space-y-8">
                <Card className="p-8 shadow-soft">
                  <h3 className="text-2xl font-sans font-bold text-foreground mb-6">Exclusive Limited Warranty</h3>
                  <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                    Lamily Corp provides exclusive limited warranty to the original purchaser of commercial
                    and industrial LED Lighting products for a period of <strong>five (5), seven (7), or ten (10) years</strong>,
                    as stated in each Product Specifications sheet from the date of shipment arrival. The warranty period may be extended to begin at the date of installation if products are installed and registered within ninety (90) days from the original purchase date. If the product purchase date is not provided, the product date of production will serve as the default warranty start date.
                  </p>
                </Card>

                <Card className="p-8 shadow-soft">
                  <h3 className="text-2xl font-sans font-bold text-foreground mb-6">Performance Guarantee</h3>
                  <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                    Lamily Corp products are engineered and manufactured to perform as stated in each
                    Product Specifications sheet and listed for performance and efficacy on DLC Premium or DLC. Applicable product safety and compliance listings include UL, ETL, CSA, FCC, RoHS, and IP Ratings.
                  </p>
                </Card>

                <Card className="p-8 shadow-soft">
                  <h3 className="text-2xl font-sans font-bold text-foreground mb-6">Exclusive Limited Warranty Coverage</h3>
                  <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                    Lamily Corp will correct any product failures, or any defect in materials or workmanship to perform as specified by the standards within a reasonable time period from the warranty claim date at its own expense. If the product is unable to be repaired to conform to the warranty after reasonable attempts, Lamily Corp will provide at its option, a replacement product or prorated refund of the purchase price which shall be based on the length and time of product use by the purchaser. Products replaced or repaired are warranted only for the remainder of the original warranty period. American Lighting Industry Corp reserves the right to provide warranty replacement with suitable substitutes that do not adversely affect the performance or quality of the application.
                  </p>
                </Card>

                <Card className="p-8 shadow-soft">
                  <h3 className="text-2xl font-sans font-bold text-foreground mb-6">Warranty Conditions</h3>
                  <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                    Products must be installed at the purchaser's originally intended location by a licensed electrician. Retrofit products shall be installed and operated in fixtures using compatible ballasts or without any ballasts. The warranty does not apply in the event of conditions demonstrating incorrect application, abnormal use, or stress of products, such as operating beyond minimum or maximum rated temperatures, under or over voltage conditions, exposure to damp/wet/weather/vapors for non-applicable products, degraded lines/sockets, installation with the power on, modification of the products by users, as well as improper lamp or ballast removal/installation. At no time shall American Lighting Industry Corp be liable for any special, incidental, or consequential damages based on breach of warranty, breach of contract, negligence, strict tort or any other legal theories.
                  </p>
                </Card>

                <Card className="p-8 shadow-soft">
                  <h3 className="text-2xl font-sans font-bold text-foreground mb-6">Warranty Disclaimer</h3>
                  <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                    At no time shall Lamily Corp be liable for any special, incidental, or consequential damages based on breach of warranty, breach of contract, negligence, strict tort or any other legal theories. American Lighting Industry Corp will not be responsible for damages that include, but are not limited to: loss of profits, loss of facilities or services, downtime, claims of third parties, including customers, and/or the injury to property. Lamily Corp is not responsible for injury, or death, while handling products with negligence or installing with the power on. This exclusive limited warranty is non-transferable.
                  </p>
                </Card>

                <Card className="p-8 shadow-soft">
                  <h3 className="text-2xl font-sans font-bold text-foreground mb-6">Warranty Claims</h3>
                  <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                    Warranty claims can be made by contacting your Manager to handle the request, or by calling us during regular business hours Monday-Friday at <strong>(908) 441-7950</strong>, to receive troubleshooting instructions, and/or product replacement, and/or instructions for returns.
                  </p>
                  <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                    The Customer will be requested to provide its original bill of sale, or other such evidence showing the date of purchase and the identity of purchaser/end-user. Should it be determined that the product is defective at no fault of the end-user, we will assume the cost of shipping for returns, and a Return Merchandise Authorization (RMA) will be issued, the purchaser shall promptly return the product to us.
                  </p>
                  <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                    Defective products returned after thirty (30) days of the RMA issued date will not be accepted and credit will not be issued for replacement. Failure to follow this procedure voids the warranty claim.
                  </p>
                </Card>

                <Card className="p-8 shadow-soft">
                  <h3 className="text-2xl font-sans font-bold text-foreground mb-6">Return Merchandise Authorization (RMA)</h3>
                  <p className="font-sans text-muted-foreground leading-relaxed">
                    The RMA form must be submitted within ten (10) days of delivery receipt. All defective parts or merchandise must be kept until Lamily Corp approves and emails the customer to authorize return shipment, or destruction and disposal of the defective or damaged merchandise. Any damaged merchandise shipments should be noted on the bill of lading (BOL) and transit claims should be made promptly against the carrier. Lamily Corp is not responsible for any loss or damage sustained in transit.
                  </p>
                </Card>

                <Card className="p-8 shadow-soft">
                  <h3 className="text-2xl font-sans font-bold text-foreground mb-6">Return Goods Authorization (RGA)</h3>
                  <p className="font-sans text-muted-foreground leading-relaxed">
                    The RGA form must be submitted within ten (10) days of delivery receipt. Lamily Corp must approve and email the customer prior to initiating return shipment. All return merchandise must be in original packaging and in resalable condition. No refunds are issued for returned merchandise. Please note credits or exchanges cannot be issued for any merchandise damaged or not delivered to our facility. Shipping charges for any return is not reimbursed and all returns are subject to a restocking fee up to 25%. Special orders of merchandise cannot be canceled or returned.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="py-20 bg-muted/30 scroll-mt-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-sans font-bold text-foreground mb-6">
                Leave a Message
              </h2>
              <p className="text-xl font-sans text-muted-foreground max-w-2xl mx-auto">
                Have questions about our products or need a custom quote? We'd love to hear from you.
              </p>
            </div>

            <Card className="max-w-2xl mx-auto p-8 shadow-soft">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project, questions, or how we can help you..."
                    rows={5}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  />
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Your message will be sent to info@lamily-corp.com
                  </span>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-sans font-bold text-foreground mb-6">
                Get in Touch
              </h2>
              <p className="text-xl font-sans text-muted-foreground max-w-2xl mx-auto">
                Ready to discuss your lighting project? Contact us today for expert guidance and support.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="p-8 shadow-soft">
                  <div className="flex items-center mb-6">
                    <Shield className="w-8 h-8 text-accent mr-4" />
                    <h3 className="text-2xl font-sans font-bold text-foreground">Contact Information</h3>
                  </div>
                  <p className="font-sans text-muted-foreground mb-6">
                    The fastest and most efficient customer support, including technical support,
                    can be accessed by email or phone to contact us.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <Phone className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-sans text-sm text-muted-foreground">Phone</p>
                        <p className="font-sans text-lg font-semibold text-foreground">(908)-441-7950</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <Mail className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-sans text-sm text-muted-foreground">Email</p>
                        <p className="font-sans text-lg font-semibold text-foreground">info@lamily-corp.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <Award className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-sans text-sm text-muted-foreground">Business Hours</p>
                        <p className="font-sans text-lg font-semibold text-foreground">Monday - Friday, 9 AM - 5 PM EST</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-lg font-sans font-semibold text-accent mt-6">
                    We are here to help.
                  </p>
                </Card>
              </div>

              {/* Map */}
              <div className="space-y-6">
                <Card className="p-8 shadow-soft">
                  <h3 className="text-2xl font-sans font-bold text-foreground mb-6">Our Location</h3>
                  <div className="bg-muted rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.5!2d-74.2908!3d40.6764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3b8b8b8b8b8b8%3A0x1234567890abcdef!2s356%20Market%20St%2C%20Kenilworth%2C%20NJ%2007033!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Lamily Corp Location"
                      className="w-full h-[300px]"
                    />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default About;