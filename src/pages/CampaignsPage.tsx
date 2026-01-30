import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CampaignsGrid } from '@/components/campaigns/CampaignsGrid';
import { Sparkles } from 'lucide-react';

export default function CampaignsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container-main section-padding">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Make a Difference</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Browse Campaigns</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore verified campaigns from trusted NGOs. Choose the causes that resonate with you 
              and make a meaningful impact through your donation or volunteer time.
            </p>
          </div>

          {/* Campaigns */}
          <CampaignsGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
}
