import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Progress } from '@/components/ui/progress';
import { campaigns, ngos, platformStats } from '@/data/campaigns';
import { 
  Heart, 
  Users, 
  Target, 
  IndianRupee, 
  TrendingUp,
  BarChart3,
  Sparkles
} from 'lucide-react';

export default function ImpactPage() {
  // Calculate totals
  const totalRaised = campaigns.reduce((sum, c) => sum + c.raisedAmount, 0);
  const totalGoal = campaigns.reduce((sum, c) => sum + c.goalAmount, 0);
  const totalVolunteers = campaigns.reduce((sum, c) => sum + c.volunteersJoined, 0);
  const overallProgress = (totalRaised / totalGoal) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container-main section-padding">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Transparency First</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Collective Impact</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how your contributions are making a real difference. Every donation and volunteer hour counts.
            </p>
          </div>

          {/* Platform Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="card-elevated p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1">{(platformStats.totalPeopleHelped / 1000).toFixed(0)}K+</div>
              <div className="text-sm text-muted-foreground">People Helped</div>
            </div>
            <div className="card-elevated p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <IndianRupee className="w-7 h-7 text-accent" />
              </div>
              <div className="text-3xl font-bold mb-1">₹{(platformStats.totalRaised / 10000000).toFixed(1)}Cr</div>
              <div className="text-sm text-muted-foreground">Total Raised</div>
            </div>
            <div className="card-elevated p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-success" />
              </div>
              <div className="text-3xl font-bold mb-1">{(platformStats.totalVolunteers / 1000).toFixed(0)}K+</div>
              <div className="text-sm text-muted-foreground">Active Volunteers</div>
            </div>
            <div className="card-elevated p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Target className="w-7 h-7 text-blue-600" />
              </div>
              <div className="text-3xl font-bold mb-1">{platformStats.totalCampaigns}+</div>
              <div className="text-sm text-muted-foreground">Campaigns</div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="card-elevated p-8 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Overall Campaign Progress</h2>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-primary">
                  ₹{(totalRaised / 10000000).toFixed(2)} Cr raised
                </span>
                <span className="text-muted-foreground">
                  of ₹{(totalGoal / 10000000).toFixed(2)} Cr goal
                </span>
              </div>
              <Progress value={overallProgress} className="h-4" />
              <p className="text-sm text-muted-foreground mt-2">
                {overallProgress.toFixed(1)}% of total goal reached across all campaigns
              </p>
            </div>
          </div>

          {/* Campaign-wise Impact */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Campaign-wise Impact</h2>
            </div>
            <div className="grid gap-6">
              {campaigns.map((campaign) => {
                const ngo = ngos.find(n => n.id === campaign.ngoId);
                const progress = (campaign.raisedAmount / campaign.goalAmount) * 100;
                
                return (
                  <div key={campaign.id} className="card-elevated p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Image */}
                      <div className="w-full sm:w-32 h-24 rounded-lg overflow-hidden shrink-0">
                        <img 
                          src={campaign.image} 
                          alt={campaign.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <h3 className="font-semibold mb-1">{campaign.title}</h3>
                            <p className="text-sm text-muted-foreground">by {ngo?.name}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            campaign.status === 'active' 
                              ? 'bg-success/10 text-success' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </span>
                        </div>

                        {/* Progress */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-semibold">₹{(campaign.raisedAmount / 100000).toFixed(1)}L</span>
                            <span className="text-muted-foreground">{progress.toFixed(0)}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>

                        {/* Impact Metrics */}
                        <div className="flex flex-wrap gap-4">
                          {campaign.impactMetrics.map((metric, index) => (
                            <div key={index} className="text-center px-4 py-2 bg-secondary rounded-lg">
                              <div className="text-lg font-bold text-primary">{metric.value}</div>
                              <div className="text-xs text-muted-foreground">{metric.label}</div>
                            </div>
                          ))}
                          <div className="text-center px-4 py-2 bg-secondary rounded-lg">
                            <div className="text-lg font-bold text-primary">{campaign.volunteersJoined}</div>
                            <div className="text-xs text-muted-foreground">Volunteers</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
