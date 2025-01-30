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
  icons: "/favicon.ico",
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