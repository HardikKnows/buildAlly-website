import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { SiteChrome } from "@/components/site/SiteChrome";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default:
      "BuildAlly — Construction Management Software for Modern Builders",
    template: "%s — BuildAlly",
  },
  description: SITE.description,
  keywords: [
    "construction management software",
    "construction management software India",
    "construction project management software",
    "construction ERP software India",
    "site management software for builders",
    "construction company software",
    "subcontractor management software",
    "construction document management software",
  ],
  applicationName: SITE.name,
  authors: [{ name: "BuildAlly" }],
  creator: "BuildAlly",
  publisher: "BuildAlly",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/app-icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.domain,
    siteName: SITE.name,
    title: "BuildAlly — Construction Management Software for Modern Builders",
    description: SITE.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "BuildAlly — Construction Management Software for Modern Builders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildAlly — Construction Management Software for Modern Builders",
    description: SITE.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport = {
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
};

// Organization + SoftwareApplication structured data (sitewide).
function StructuredData() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE.name,
      url: SITE.domain,
      description: SITE.description,
      slogan: SITE.tagline,
      logo: `${SITE.domain}/logo.png`,
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: SITE.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android (PWA)",
      description: SITE.description,
      url: SITE.domain,
      // Demos are scheduled with our team (no public/anonymous demo). Point
      // prospects to the Book a Demo request flow rather than a price.
      potentialAction: {
        "@type": "ReserveAction",
        name: "Book a Demo",
        target: `${SITE.domain}/book-demo`,
      },
    },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        <StructuredData />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
