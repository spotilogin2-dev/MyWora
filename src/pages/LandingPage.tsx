import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Stats from "../components/landing/Stats";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import ProductShowcase from "../components/landing/ProductShowcase";
import CustomerExperience from "../components/landing/CustomerExperience";
import FollowUps from "../components/landing/FollowUps";
import Pricing from "../components/landing/Pricing";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

/**
 * Public marketing landing page for mywora.com (Phase 1).
 * Purely presentational — no database, no application data.
 */
export default function LandingPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <ProductShowcase />
        <CustomerExperience />
        <FollowUps />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
