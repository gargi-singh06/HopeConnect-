import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DonationSection } from '@/components/donate/DonationSection';
import { VolunteerForm } from '@/components/volunteer/VolunteerForm';
import { 
  Heart, 
  Users, 
  ArrowLeft, 
  CheckCircle2, 
  Calendar,
  Target,
  Share2,
  ExternalLink
} from 'lucide-react';
import { campaigns, ngos } from '@/data/campaigns';

export default function CampaignDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const initialAction = searchParams.get('action') || 'donate';
  const [activeTab, setActiveTab] = useState<'donate' | 'volunteer'>(
    initialAction === 'volunteer' ? 'volunteer' : 'donate'
  );

  const campaign = campaigns.find(c => c.id === id);
  const ngo = campaign ? ngos.find(n => n.id === campaign.ngoId) : null;

  if (!campaign) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Campaign Not Found</h1>
            <Link to="/campaigns">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4" />
                Back to Campaigns
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const progressPercent = (campaign.raisedAmount / campaign.goalAmount) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 lg:h-96">
          <img 
            src={campaign.image} 
            alt={campaign.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="container-main">
              <Link to="/campaigns" className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground mb-4">
                <ArrowLeft className="w-4 h-4" />
                Back to Campaigns
              </Link>
            </div>
          </div>
        </div>

        <div className="container-main section-padding !pt-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* NGO Info */}
              {ngo && (
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{ngo.logo}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{ngo.name}</span>
                      {ngo.verified && <CheckCircle2 className="w-4 h-4 text-primary" />}
                    </div>
                    <span className="text-sm text-muted-foreground">{ngo.focusArea}</span>
                  </div>
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{campaign.title}</h1>

              {/* Progress Stats */}
              <div className="card-elevated p-6 mb-6">
                <div className="flex flex-wrap items-center gap-6 mb-4">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      ₹{campaign.raisedAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      raised of ₹{campaign.goalAmount.toLocaleString()}
                    </div>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="font-semibold">{campaign.volunteersJoined}</div>
                      <div className="text-sm text-muted-foreground">Volunteers</div>
                    </div>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="font-semibold">{progressPercent.toFixed(0)}%</div>
                      <div className="text-sm text-muted-foreground">Complete</div>
                    </div>
                  </div>
                </div>
                <Progress value={progressPercent} className="h-3" />
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none mb-8">
                <h2 className="text-xl font-semibold mb-3">About This Campaign</h2>
                <p className="text-muted-foreground">{campaign.longDescription}</p>
              </div>

              {/* Impact Metrics */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Impact So Far</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {campaign.impactMetrics.map((metric, index) => (
                    <div key={index} className="card-elevated p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Updates */}
              {campaign.updates.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
                  <div className="space-y-4">
                    {campaign.updates.map((update, index) => (
                      <div key={index} className="card-elevated p-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(update.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </div>
                        <h3 className="font-medium mb-1">{update.title}</h3>
                        <p className="text-sm text-muted-foreground">{update.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Action Tabs */}
                <div className="flex rounded-xl border border-border overflow-hidden">
                  <button
                    onClick={() => setActiveTab('donate')}
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                      activeTab === 'donate'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card hover:bg-muted'
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                    Donate
                  </button>
                  <button
                    onClick={() => setActiveTab('volunteer')}
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                      activeTab === 'volunteer'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card hover:bg-muted'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    Volunteer
                  </button>
                </div>

                {/* Action Content */}
                {activeTab === 'donate' ? (
                  <DonationSection
                    campaignId={campaign.id}
                    campaignTitle={campaign.title}
                    goalAmount={campaign.goalAmount}
                    raisedAmount={campaign.raisedAmount}
                  />
                ) : (
                  <VolunteerForm
                    campaignId={campaign.id}
                    campaignTitle={campaign.title}
                  />
                )}

                {/* Share */}
                <Button variant="outline" className="w-full gap-2">
                  <Share2 className="w-4 h-4" />
                  Share This Campaign
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
