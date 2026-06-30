import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { site } from "@/content/site";

// Applies Denise's saved palette to <html> before the page paints (no flash of
// the default colors). This inline script intentionally sets the data-theme
// attribute before React hydrates, so <html> carries suppressHydrationWarning
// to tell React that mismatch is expected. (Temporary preview tool — remove
// this + <ThemeSwitcher> once a palette is locked into :root.)
const themeScript = `(function(){try{var t=localStorage.getItem('dgi-theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

// Warm, editorial serif for headings + clean sans for body. next/font
// self-hosts these (zero layout shift, no external requests). To try another
// heading font, swap Cormorant_Garamond for e.g. Fraunces or Playfair_Display.
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.denisegriffininteriors.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: siteUrl,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <StructuredData />
        <Nav />
        <main>{children}</main>
        <Footer />
        <ThemeSwitcher />
      </body>
    </html>
  );
}
