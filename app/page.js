import { AppleCardsCarouselDemo } from "@/components/AppleCards";
import CareerswithSupreme from "@/components/CareerswithSupreme";
import GetInTouch from "@/components/GetInTouch";
import HeroSection from "@/components/HeroSection";
import Portfolio from "@/components/Portfolio";
import SupremeQuote from "@/components/SupremeQuote";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SupremeQuote />
      <Portfolio />
      <GetInTouch />
      <AppleCardsCarouselDemo />
      <CareerswithSupreme />
    </>
  );
}
