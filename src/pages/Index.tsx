import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { FeaturedCampaigns } from '@/components/home/FeaturedCampaigns';
import { StatsSection } from '@/components/home/StatsSection';
import { HowItWorks } from '@/components/home/HowItWorks';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedCampaigns />
        <StatsSection />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
