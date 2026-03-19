"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Award, Mail, MapPin, Phone, Send, Shield } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const SUPPORT_EMAIL = "info.ali@ali-corp.com";
const SUPPORT_PHONE = "(917) 870-7716";
const BUSINESS_HOURS = "Monday - Friday: 9:00am - 5:00pm EST";

const certifications = [
  "TUV-CE",
  "RoHS",
  "UL",
  "DLC",
  "ENERGY STAR",
  "ETL",
  "CSA",
  "FCC",
  "IP Ratings",
];

const locations = [
  "7 Scouting Blvd Medford NY 11763 USA",
  "82 Myer St Hackensack NJ 07601 USA",
  "5568 General Washington Dr #A219 Alexandria VA 22312",
];

const About = () => {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.3 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(formData.subject || "Message from American Lighting Industry Corp Website");
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n\n` +
        `Message:\n${formData.message}`
    );

    const mailtoLink = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
    window.open(mailtoLink);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sectionFromQuery = params.get("section");
    const sectionFromHash = window.location.hash ? window.location.hash.replace("#", "") : "";
    const targetId = sectionFromQuery || sectionFromHash;

    if (targetId) {
      window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "auto", block: "start" });
      });
    }
  }, []);

  return (
    <div id="top" className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative py-32 bg-primary">
          <div className="container mx-auto px-6 relative z-10">
            <div
              ref={heroRef}
              className={`text-center transition-all duration-1000 ease-out ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <h1 className="text-5xl md:text-6xl font-sans font-bold text-white mt-12 mb-12">
                About <span className="bg-gradient-accent bg-clip-text text-transparent">ALI</span>
              </h1>
              <p className="text-xl font-sans text-white max-w-3xl mx-auto">
                American Lighting Industry Corp is a privately held U.S.-based lighting manufacturer with
                offices in New York, New Jersey, and Virginia.
              </p>
            </div>
          </div>
        </section>

        <section id="about-us" className="py-20 bg-background scroll-mt-24">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-sans font-bold text-foreground mb-8">About Us</h2>
                <p className="text-lg font-sans text-muted-foreground mb-6 leading-relaxed">
                  American Lighting Industry Corp is a privately held U.S.-based lighting manufacturer
                  with offices in New York, New Jersey, and Virginia.
                </p>
                <p className="text-lg font-sans text-muted-foreground mb-6 leading-relaxed">
                  We serve nearly every market, from electrical distributors and lighting showrooms to
                  OEMs, contractors, and designers. We believe high quality is essential to building
                  strong relationships with our customers.
                </p>
                <p className="text-lg font-sans text-muted-foreground mb-6 leading-relaxed">
                  Our products are accredited by TUV-CE, RoHS, UL, DLC, and ENERGY STAR, with
                  applicable safety and compliance listings that include ETL, CSA, FCC, and IP Ratings.
                  Every manufacturing process, from raw material to finished goods, is under strict
                  control, and our products continue to evolve as technology advances.
                </p>
                <p className="text-lg font-sans text-foreground font-semibold mb-8 leading-relaxed">
                  We are committed to offering competitive pricing with quality and to building mutually
                  successful relationships with our customers and partners. It is our legacy, our
                  reputation, and our future.
                </p>
              </div>

              <Card className="p-8">
                <h3 className="text-2xl font-sans font-bold text-foreground mb-6">
                  Safety and Compliance Listings
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {certifications.map((cert) => (
                    <div key={cert} className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm font-sans font-medium text-foreground">{cert}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="warranty" className="py-20 bg-background scroll-mt-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-sans font-bold text-foreground mb-6">Product Warranty</h2>
              <p className="text-xl font-sans text-muted-foreground max-w-3xl mx-auto">
                Commercial and industrial LED lighting products are covered as stated in each product
                specification sheet.
              </p>
            </div>

            <div className="space-y-8">
              <Card className="p-8">
                <h3 className="text-2xl font-sans font-bold text-foreground mb-6">Exclusive Limited Warranty</h3>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  American Lighting Industry Corp provides an exclusive limited warranty to the original
                  purchaser of commercial and industrial LED lighting products for five (5), seven (7),
                  or ten (10) years, as stated in each product specification sheet from the date of
                  shipment arrival. The warranty period may be extended to the installation date when
                  products are installed and registered within ninety (90) days of the original purchase
                  date. If the product purchase date is not provided, the product date of production
                  serves as the default warranty start date.
                </p>
              </Card>

              <Card className="p-8">
                <h3 className="text-2xl font-sans font-bold text-foreground mb-6">Performance and Coverage</h3>
                <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                  American Lighting Industry Corp products are engineered and manufactured to perform as
                  stated in each product specification sheet and are listed for performance and efficacy
                  on DLC Premium or DLC. Applicable product safety and compliance listings include UL,
                  ETL, CSA, FCC, RoHS, and IP Ratings.
                </p>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  American Lighting Industry Corp will correct product failures or defects in materials
                  or workmanship within a reasonable time from the warranty claim date at its own
                  expense. If a product cannot be repaired after reasonable attempts, the company may
                  provide a replacement product or a prorated refund based on the length and time of
                  product use. Repaired or replaced products are covered only for the remainder of the
                  original warranty period, and suitable substitutes may be provided when they do not
                  adversely affect application performance or quality.
                </p>
              </Card>

              <Card className="p-8">
                <h3 className="text-2xl font-sans font-bold text-foreground mb-6">
                  Warranty Conditions and Disclaimer
                </h3>
                <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                  Products must be installed at the purchaser&apos;s originally intended location by a
                  licensed electrician. Retrofit products must be installed and operated in fixtures
                  using compatible ballasts or without ballasts. The warranty does not apply to incorrect
                  application, abnormal use, product stress, operation beyond minimum or maximum rated
                  temperatures, under- or over-voltage conditions, exposure to damp, wet, weather, or
                  vapors for non-applicable products, degraded lines or sockets, installation with the
                  power on, user modification, or improper lamp or ballast removal or installation.
                </p>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  American Lighting Industry Corp is not liable for special, incidental, or consequential
                  damages based on breach of warranty, breach of contract, negligence, strict tort, or
                  any other legal theory. The company is also not responsible for injury or death caused
                  by negligent handling or installation with the power on. This exclusive limited
                  warranty is non-transferable.
                </p>
              </Card>

              <Card className="p-8">
                <h3 className="text-2xl font-sans font-bold text-foreground mb-6">Warranty Claims</h3>
                <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                  Warranty claims can be made by contacting your manager or by calling us during regular
                  business hours at <strong>{SUPPORT_PHONE}</strong> to receive troubleshooting
                  instructions, product replacement support, or return instructions.
                </p>
                <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                  Customers may be asked to provide the original bill of sale or other evidence showing
                  the date of purchase and the identity of the purchaser or end user. If a product is
                  determined to be defective through no fault of the end user, American Lighting Industry
                  Corp will assume the cost of shipping for returns and issue a Return Merchandise
                  Authorization (RMA).
                </p>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Defective products returned more than thirty (30) days after the RMA issue date will
                  not be accepted, and credit will not be issued for replacement. Failure to follow this
                  procedure voids the warranty claim.
                </p>
              </Card>

            </div>
          </div>
        </section>

        <section id="return-authorizations" className="py-20 bg-muted/30 scroll-mt-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-sans font-bold text-foreground mb-6">Return Authorizations</h2>
              <p className="text-xl font-sans text-muted-foreground max-w-3xl mx-auto">
                Return merchandise and return goods requests are handled in accordance with ALI&apos;s
                published return authorization policy.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              <Card className="p-8">
                <h3 className="text-2xl font-sans font-bold text-foreground mb-6">
                  Return Merchandise Authorization (RMA)
                </h3>
                <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                  The RMA form must be submitted within ten (10) days of delivery receipt. All
                  defective parts or merchandise must be kept until American Lighting Industry Corp
                  approves and emails the customer to authorize return shipment, or destruction and
                  disposal of the defective or damaged merchandise.
                </p>
                <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                  Any damaged merchandise shipments should be noted on the bill of lading (BOL), and
                  transit claims should be made promptly against the carrier.
                </p>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  American Lighting Industry Corp is not responsible for any loss or damage sustained in
                  transit.
                </p>
              </Card>

              <Card className="p-8">
                <h3 className="text-2xl font-sans font-bold text-foreground mb-6">
                  Return Goods Authorization (RGA)
                </h3>
                <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                  The RGA form must be submitted within ten (10) days of delivery receipt. American
                  Lighting Industry Corp must approve and email the customer prior to initiating return
                  shipment. All return merchandise must be in original packaging and in resalable
                  condition.
                </p>
                <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                  No refunds are issued for returned merchandise. Credits or exchanges cannot be issued
                  for any merchandise damaged or not delivered to our facility.
                </p>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Shipping charges for any return are not reimbursed, all returns are subject to a
                  restocking fee of up to 25%, and special orders of merchandise cannot be canceled or
                  returned.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-muted/30 scroll-mt-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-sans font-bold text-foreground mb-6">Leave a Message</h2>
              <p className="text-xl font-sans text-muted-foreground max-w-2xl mx-auto">
                Questions about products, support, or returns? Send us a message.
              </p>
            </div>

            <Card className="max-w-2xl mx-auto p-8">
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
                    placeholder="What can we help you with?"
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
                    placeholder="Tell us about your question or request..."
                    rows={5}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  />
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Your message will be sent to {SUPPORT_EMAIL}</span>
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

        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-sans font-bold text-foreground mb-6">Get in Touch</h2>
              <p className="text-xl font-sans text-muted-foreground max-w-2xl mx-auto">
                For the fastest and most efficient customer support, including technical support,
                contact us by email or phone.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-8">
                <Card className="p-8">
                  <div className="flex items-center mb-6">
                    <Shield className="w-8 h-8 text-accent mr-4" />
                    <h3 className="text-2xl font-sans font-bold text-foreground">Contact Information</h3>
                  </div>
                  <p className="font-sans text-muted-foreground mb-6">
                    We are here to help with product questions, technical support, warranty claims, and
                    return requests.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <Phone className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-sans text-sm text-muted-foreground">Phone</p>
                        <p className="font-sans text-lg font-semibold text-foreground">{SUPPORT_PHONE}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <Mail className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-sans text-sm text-muted-foreground">Email</p>
                        <p className="font-sans text-lg font-semibold text-foreground">{SUPPORT_EMAIL}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <Award className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-sans text-sm text-muted-foreground">Business Hours</p>
                        <p className="font-sans text-lg font-semibold text-foreground">{BUSINESS_HOURS}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="p-8">
                  <h3 className="text-2xl font-sans font-bold text-foreground mb-6">Our Locations</h3>
                  <div className="space-y-5">
                    {locations.map((location) => (
                      <div key={location} className="flex items-start space-x-4">
                        <div className="p-3 bg-accent/10 rounded-lg">
                          <MapPin className="w-6 h-6 text-accent" />
                        </div>
                        <p className="font-sans text-muted-foreground leading-relaxed">{location}</p>
                      </div>
                    ))}
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
