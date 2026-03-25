"use client";

import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Phone, Send, Shield } from "lucide-react";

const SUPPORT_EMAIL = "info.ali@ali-corp.com";
const SUPPORT_PHONE = "(917) 870-7716";
const SUPPORT_PHONE_LINK = "+19178707716";
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

const warrantySections = [
  {
    title: "Warranty Terms",
    description:
      "ALI provides a limited warranty to the original purchaser for five, seven, or ten years, as shown on each product specification sheet. Coverage generally begins on shipment arrival and may extend from installation when registration is completed within 90 days.",
  },
  {
    title: "Coverage",
    description:
      "ALI addresses verified defects in materials or workmanship within a reasonable time. Depending on the product and claim, the remedy may be repair, replacement, a suitable substitute, or a prorated refund.",
  },
  {
    title: "Claims and Conditions",
    description:
      "Products must be installed and used under rated conditions. For warranty support, contact your manager or call us during business hours, keep proof of purchase available, and return approved defective items within 30 days of the RMA issue date.",
  },
];

const returnSections = [
  {
    title: "Return Merchandise Authorization (RMA)",
    bullets: [
      "Submit the RMA form within 10 days of delivery receipt.",
      "Keep defective parts or merchandise until ALI approves return shipment, destruction, or disposal.",
      "Note transit damage on the bill of lading and file claims promptly with the carrier.",
    ],
  },
  {
    title: "Return Goods Authorization (RGA)",
    bullets: [
      "Submit the RGA form within 10 days of delivery receipt and wait for approval before shipping.",
      "Returned merchandise must be in original packaging and in resalable condition.",
      "Shipping is not reimbursed, restocking fees may apply, and special-order items cannot be returned.",
    ],
  },
];

const locations = [
  "7 Scouting Blvd, Medford, NY 11763, USA",
  "82 Myer St, Hackensack, NJ 07601, USA",
  "5568 General Washington Dr #A219, Alexandria, VA 22312, USA",
];

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(formData.subject || "Message from American Lighting Industry Corp Website");
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n\n` +
        `Message:\n${formData.message}`
    );

    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;

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
    <div id="top" className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-20">
        <section className="bg-muted/25 py-20 sm:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-primary/70">
                About ALI
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                American Lighting Industry Corp
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                A privately held U.S.-based lighting manufacturer with offices in New York, New Jersey,
                and Virginia.
              </p>
            </div>
          </div>
        </section>

        <section id="about-us" className="scroll-mt-24 py-20 sm:py-24">
          <div className="container mx-auto px-6">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                  About Us
                </h2>
                <div className="mt-8 max-w-2xl space-y-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  <p>
                    American Lighting Industry Corp serves electrical distributors, lighting showrooms,
                    OEMs, contractors, and designers with commercial and industrial lighting products.
                  </p>
                  <p>
                    Our products carry established safety and compliance listings, and manufacturing is
                    monitored from raw material through finished goods.
                  </p>
                  <p className="text-foreground">
                    We focus on dependable quality, competitive pricing, and long-term customer
                    relationships.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] bg-muted/30 p-8 sm:p-10">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-foreground" />
                  <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    Safety and Compliance Listings
                  </h3>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                  {certifications.map((certification) => (
                    <div key={certification} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground/60" />
                      <span className="text-sm font-medium text-foreground">{certification}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="warranty" className="scroll-mt-24 bg-muted/25 py-20 sm:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Product Warranty
              </h2>
              <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Commercial and industrial LED lighting products are covered as stated in each product
                specification sheet.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {warrantySections.map((section) => (
                <div key={section.title} className="rounded-[2rem] bg-background p-8">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {section.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">{section.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="return-authorizations" className="scroll-mt-24 py-20 sm:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Return Authorizations
              </h2>
              <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Return requests are handled in accordance with ALI&apos;s published authorization
                policy.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {returnSections.map((section) => (
                <div key={section.title} className="rounded-[2rem] bg-muted/30 p-8 sm:p-10">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {section.title}
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60" />
                        <span className="text-sm leading-6 text-muted-foreground">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 bg-muted/25 py-20 sm:py-24">
          <div className="container mx-auto px-6">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start">
              <div className="rounded-[2rem] bg-background p-8 sm:p-10">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Leave a Message
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                  Questions about products, support, or returns? Send us a message.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="h-12 rounded-xl border-0 bg-muted/30 px-4 md:text-base"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="h-12 rounded-xl border-0 bg-muted/30 px-4 md:text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What can we help you with?"
                      className="h-12 rounded-xl border-0 bg-muted/30 px-4 md:text-base"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your question or request."
                      rows={5}
                      className="min-h-[144px] w-full resize-none rounded-[1.25rem] border-0 bg-muted/30 px-4 py-3 text-base leading-7 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 text-foreground" />
                    <span>Your message will be addressed to {SUPPORT_EMAIL}</span>
                  </div>

                  <Button
                    type="submit"
                    className="h-auto w-full justify-between bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    Open Email Draft
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    Get in Touch
                  </h2>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    For the fastest and most efficient support, contact us by email or phone.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background">
                      <Phone className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a className="text-base font-semibold text-foreground hover:text-primary sm:text-lg" href={`tel:${SUPPORT_PHONE_LINK}`}>
                        {SUPPORT_PHONE}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background">
                      <Mail className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a className="text-base font-semibold text-foreground hover:text-primary sm:text-lg" href={`mailto:${SUPPORT_EMAIL}`}>
                        {SUPPORT_EMAIL}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background">
                      <Shield className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Business Hours</p>
                      <p className="text-base font-semibold text-foreground sm:text-lg">{BUSINESS_HOURS}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] bg-background p-8 sm:p-10">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-foreground" />
                    <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      Our Locations
                    </h3>
                  </div>

                  <div className="mt-8 space-y-5">
                    {locations.map((location) => (
                      <p key={location} className="text-base leading-7 text-muted-foreground">
                        {location}
                      </p>
                    ))}
                  </div>
                </div>
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
