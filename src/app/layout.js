import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { SITE, URLS } from "@/lib/site";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { MobileCTABar } from "@/components/site/MobileCTABar";

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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.domain,
    siteName: SITE.name,
    title: "BuildAlly — Construction Management Software for Modern Builders",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildAlly — Construction Management Software for Modern Builders",
    description: SITE.description,
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
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: SITE.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android (PWA)",
      description: SITE.description,
      url: SITE.domain,
      offers: [
        {
          "@type": "Offer",
          name: "Free",
          price: "0",
          priceCurrency: "INR",
          description: "Up to 3 sites and 5 members.",
        },
        {
          "@type": "Offer",
          name: "Professional",
          price: "2499",
          priceCurrency: "INR",
          description: "Unlimited sites and members. Price is a draft — confirm with BuildAlly.",
        },
      ],
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
      <body className="min-h-full flex flex-col bg-white text-ink pb-17 md:pb-0">
        <StructuredData />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileCTABar />
      </body>
    </html>
  );
}
