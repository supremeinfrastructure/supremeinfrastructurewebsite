import { Rubik } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { NavbarDemo } from "@/components/Navbar";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';


const rubik = Rubik({
  weight: '500',
  subsets: ["hebrew"],
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
      <body className={rubik.className}>
        <NavbarDemo />
        {children}
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}