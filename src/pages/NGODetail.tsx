import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CampaignCard } from '@/components/campaigns/CampaignCard';
import { 
  ArrowLeft, 
  CheckCircle2, 
  IndianRupee, 
  Users, 
  Target,
  ExternalLink
} from 'lucide-react';
import { campaigns, ngos } from '@/data/campaigns';

export default function NGODetail() {
  const { id } = useParams();
  const ngo = ngos.find(n => n.id === id);
  const ngoCampaigns = campaigns.filter(c => c.ngoId === id);

  if (!ngo) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">NGO Not Found</h1>
            <Link to="/ngos">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4" />
                Back to NGOs
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedRaised = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(ngo.totalRaised);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container-main section-padding">
          {/* Back Link */}
          <Link to="/ngos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to NGOs
          </Link>

          {/* NGO Header */}
          <div className="card-elevated p-8 mb-12">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-24 h-24 rounded-2xl bg-secondary flex items-center justify-center text-5xl shrink-0">
                {ngo.logo}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{ngo.name}</h1>
                  {ngo.verified && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      Verified
                    </span>
                  )}
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
                  {ngo.focusArea}
                </span>
                <p className="text-muted-foreground max-w-2xl">{ngo.description}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <IndianRupee className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{formattedRaised}</div>
                  <div className="text-sm text-muted-foreground">Total Raised</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{ngo.totalVolunteers}</div>
                  <div className="text-sm text-muted-foreground">Volunteers</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{ngo.campaignsCount}</div>
                  <div className="text-sm text-muted-foreground">Campaigns</div>
                </div>
              </div>
            </div>
          </div>

          {/* Campaigns */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Campaigns by {ngo.name}</h2>
            {ngoCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ngoCampaigns.map((campaign, index) => (
                  <CampaignCard key={campaign.id} campaign={campaign} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 card-elevated">
                <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">No active campaigns at the moment</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
