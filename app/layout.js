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
  icons: {
    icon: [
      {
        url: '/images/home/logo.png',
        href: '/images/home/logo.png',
      },
    ],
    // You can also add Apple touch icon if needed
    apple: [
      {
        url: '/images/home/logo.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
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