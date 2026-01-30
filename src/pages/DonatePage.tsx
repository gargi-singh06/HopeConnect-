import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DonationSection } from '@/components/donate/DonationSection';
import { CampaignsGrid } from '@/components/campaigns/CampaignsGrid';
import { Heart, Shield, Lock, Award } from 'lucide-react';

const trustBadges = [
  { icon: Shield, label: 'Verified NGOs', description: 'All organizations are thoroughly vetted' },
  { icon: Lock, label: 'Secure Payments', description: '256-bit SSL encryption' },
  { icon: Award, label: 'Tax Benefits', description: '80G tax exemption certificates' },
];

export default function DonatePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container-main section-padding">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 mb-4">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Every Rupee Counts</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Make a <span className="gradient-text">Donation</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your generosity creates lasting change. Choose a campaign below or make a general donation 
              to support our mission.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            {trustBadges.map((badge, index) => (
              <div key={index} className="card-elevated p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <badge.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{badge.label}</h3>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </div>
            ))}
          </div>

          {/* Quick Donation */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">General Donation</h2>
              <p className="text-muted-foreground mb-6">
                Not sure which campaign to support? Make a general donation and we'll allocate your 
                contribution to the causes that need it most.
              </p>
              <DonationSection 
                campaignTitle="General Fund - Support All Causes"
                goalAmount={10000000}
                raisedAmount={6500000}
              />
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&auto=format&fit=crop"
                  alt="People helping each other"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl p-4 shadow-card">
                <div className="text-3xl font-bold text-primary mb-1">₹2.5Cr+</div>
                <div className="text-sm text-muted-foreground">Raised This Year</div>
              </div>
            </div>
          </div>

          {/* Campaign Selection */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Or Choose a Campaign</h2>
            <p className="text-muted-foreground mb-8">
              Select a specific campaign to see exactly where your donation goes.
            </p>
            <CampaignsGrid limit={6} showFilters={false} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
