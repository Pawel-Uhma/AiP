import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Poppins, Lora, Dancing_Script, Monsieur_La_Doulaise, Bodoni_Moda, Licorice, Italianno, Parisienne, Alex_Brush, Pinyon_Script, Mrs_Saint_Delafield } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins"
});

const lora = Lora({ 
  subsets: ["latin"], 
  weight: ["400", "700"],
  variable: "--font-lora"
});

const monsieurLaDoulaise = Monsieur_La_Doulaise({ 
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-monsieur-la-doulaise",
  display: "swap"
});

const bodoniModa = Bodoni_Moda({ 
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bodoni-moda",
  display: "swap"
});

const licorice = Licorice({ 
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-licorice",
  display: "swap"
});

const italianno = Italianno({ 
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-italianno",
  display: "swap"
});

const parisienne = Parisienne({ 
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-parisienne",
  display: "swap"
});

const alexBrush = Alex_Brush({ 
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-alex-brush",
  display: "swap"
});

const pinyonScript = Pinyon_Script({ 
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pinyon-script",
});

const mrsSaintDelafield = Mrs_Saint_Delafield({ 
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mrs-saint-delafield",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Amelia & Paweł",
  description: "",
  keywords: ["slub"],
  openGraph: {
    title: "Amelia & Paweł",
    description: "",
    type: "website",
    locale: "pl_PL",
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${lora.variable} ${monsieurLaDoulaise.variable} ${bodoniModa.variable} ${licorice.variable} ${italianno.variable} ${parisienne.variable} ${alexBrush.variable} ${pinyonScript.variable} ${mrsSaintDelafield.variable} antialiased`}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}