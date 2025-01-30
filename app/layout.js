import { Kanit } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { NavbarDemo } from "@/components/Navbar";
import { SpeedInsights } from '@vercel/speed-insights/next';

const kanit = Kanit({
  weight: '500',
  subsets: ["thai"],
  weight: ['500'],
  display: "swap"
});

export const metadata = {
  title: "Supreme Infrastructure Company",
  description: "supreme infrastructure company",
  icons: [
    { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { rel: "icon", url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    { rel: "icon", url: "/favicon.ico", type: "image/x-icon" }, // Default ICO format
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={kanit.className}>
        <NavbarDemo />
        {children}
        <SpeedInsights/>
        <Footer />
      </body>
    </html>
  );
}