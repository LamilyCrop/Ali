import "./globals.css";
import "./fonts.css";
import type { Metadata } from "next";
import { Providers } from "./providers";

// Disable full-route/static caching globally so every request is fresh
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "American Lighting Industry Corp",
  description: "Premium LED lighting manufacturer",
  icons: {
    icon: [
      { url: "/uploads/Logo.jpg", type: "image/jpeg" },
    ],
    shortcut: "/uploads/Logo.jpg",
    apple: "/uploads/Logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
