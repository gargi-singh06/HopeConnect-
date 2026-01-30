import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { 
  Heart, 
  Users, 
  LogOut, 
  Calendar, 
  Target,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink
} from 'lucide-react';
import { campaigns, mockUser } from '@/data/campaigns';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  // Calculate stats from mock data
  const totalDonated = mockUser.donations.reduce((sum, d) => sum + d.amount, 0);
  const donationCount = mockUser.donations.length;
  const volunteerCount = mockUser.volunteerApplications.length;

  const getCampaign = (id: string) => campaigns.find(c => c.id === id);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
            <CheckCircle2 className="w-3 h-3" />
            Approved
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container-main section-padding !pt-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Welcome, {user.name.split(' ')[0]}!</h1>
              <p className="text-muted-foreground">Track your contributions and impact</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="card-elevated p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">₹{totalDonated.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Donated</div>
                </div>
              </div>
            </div>

            <div className="card-elevated p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{donationCount}</div>
                  <div className="text-sm text-muted-foreground">Campaigns Supported</div>
                </div>
              </div>
            </div>

            <div className="card-elevated p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{volunteerCount}</div>
                  <div className="text-sm text-muted-foreground">Volunteer Applications</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Donation History */}
            <div className="card-elevated">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Donation History</h2>
                  <Link to="/campaigns">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <TrendingUp className="w-4 h-4" />
                      Donate More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="divide-y divide-border">
                {mockUser.donations.map((donation) => {
                  const campaign = getCampaign(donation.campaignId);
                  return (
                    <div key={donation.id} className="p-4 sm:p-6 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <img 
                          src={campaign?.image} 
                          alt={campaign?.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link 
                          to={`/campaigns/${donation.campaignId}`}
                          className="font-medium hover:text-primary truncate block"
                        >
                          {campaign?.title}
                        </Link>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(donation.date).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-primary">
                          ₹{donation.amount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {mockUser.donations.length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">
                    <Heart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No donations yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Volunteer Applications */}
            <div className="card-elevated">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Volunteer Status</h2>
                  <Link to="/volunteer">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Users className="w-4 h-4" />
                      Find Opportunities
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="divide-y divide-border">
                {mockUser.volunteerApplications.map((application) => {
                  const campaign = getCampaign(application.campaignId);
                  return (
                    <div key={application.id} className="p-4 sm:p-6 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <img 
                          src={campaign?.image} 
                          alt={campaign?.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link 
                          to={`/campaigns/${application.campaignId}`}
                          className="font-medium hover:text-primary truncate block"
                        >
                          {campaign?.title}
                        </Link>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          Applied {new Date(application.date).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'short' 
                          })}
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(application.status)}
                      </div>
                    </div>
                  );
                })}
                {mockUser.volunteerApplications.length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No volunteer applications yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Impact Preview */}
          <div className="mt-8 card-elevated p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Your Impact</h2>
              <Link to="/impact">
                <Button variant="outline" size="sm" className="gap-1">
                  <ExternalLink className="w-4 h-4" />
                  View Full Report
                </Button>
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-secondary rounded-xl">
                <div className="text-3xl font-bold text-primary mb-1">~120</div>
                <div className="text-sm text-muted-foreground">People Helped</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-xl">
                <div className="text-3xl font-bold text-primary mb-1">3</div>
                <div className="text-sm text-muted-foreground">NGOs Supported</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-xl">
                <div className="text-3xl font-bold text-primary mb-1">4</div>
                <div className="text-sm text-muted-foreground">Causes Contributed</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
