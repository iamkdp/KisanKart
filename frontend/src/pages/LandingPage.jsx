import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import HowItWorks from "../components/landing/HowItWorks";
import StatsSection from "../components/landing/StatsSection";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
    return (
        <div className="bg-[var(--color-bg)]">
            <Navbar />
            <HeroSection />
            <HowItWorks />
            <StatsSection />
            <Footer />
        </div>
    );
}