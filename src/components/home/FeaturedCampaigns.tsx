import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CampaignsGrid } from '@/components/campaigns/CampaignsGrid';
import { ArrowRight, Sparkles } from 'lucide-react';

export function FeaturedCampaigns() {
  return (
    <section className="section-padding bg-muted/30" aria-labelledby="campaigns-heading">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Active Campaigns</span>
          </div>
          <h2 id="campaigns-heading" className="text-3xl sm:text-4xl font-bold mb-4">
            Make a Difference Today
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through verified campaigns and choose the causes that matter most to you. 
            Every contribution, big or small, creates lasting impact.
          </p>
        </div>

        {/* Campaigns Grid */}
        <CampaignsGrid limit={3} showFilters={false} />

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link to="/campaigns">
            <Button variant="outline" size="lg" className="group">
              View All Campaigns
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
