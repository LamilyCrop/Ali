import "./globals.css";
import "./fonts.css";
import type { Metadata } from "next";
import { Providers } from "./providers";

// Disable full-route/static caching globally so every request is fresh
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Lamily Corp",
  description: "Premium LED lighting manufacturer",
  icons: {
    icon: [
      { url: "/uploads/8fbd59a6-728d-4cbd-9232-f8ae5cbe72ca.png", type: "image/png" },
    ],
    shortcut: "/uploads/8fbd59a6-728d-4cbd-9232-f8ae5cbe72ca.png",
    apple: "/uploads/8fbd59a6-728d-4cbd-9232-f8ae5cbe72ca.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}


