import HomeHero from "../pages/home/HomeHero"
import HomeServices from "../pages/home/HomeServices"
import HowItWorksSection from "../pages/home/HomeHowItWorks"
import WhyChooseUsSection from "../pages/home/HomeWhyChooseUs"
import TestimonialsSection from "../pages/home/HomeReviews"
import FAQSection from "../pages/home/HomeFAQ"
import ContactSection from "../pages/home/HomeContact"



export default function Home() {
  return (
    <>
    <HomeHero />
    <HomeServices />
    <HowItWorksSection />
    <WhyChooseUsSection />
    <TestimonialsSection />
    <FAQSection />
    <ContactSection />
    </>
  );
}
