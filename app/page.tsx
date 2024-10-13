import FirstSection from "./first-section/page";
import Carousel from "../components/ui/carousel";
import SecondSection from "./second-section/page";
import ThirdSection from "./third-section/page";
import FourthSection from "./fourth-section/page";
import PricingSection from "./pricing/page";
import FifthSection from "./fifth-section/page";
import Navbar from "./navbar/page";
import Footer from "./footer/page";

export const dynamic = "force-dynamic";

export default async function Index() {
  return (
    <>
      <Navbar />
      <FirstSection />
      <Carousel />
      <SecondSection />
      <ThirdSection />
      <PricingSection />
      <FourthSection />
      <FifthSection />
      <Footer />
    </>
  );
}
