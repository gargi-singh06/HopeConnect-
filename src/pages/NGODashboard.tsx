import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { 
  Building2, 
  LogOut, 
  Plus,
  Target,
  Heart,
  Users,
  TrendingUp,
  Edit,
  Eye,
  BarChart3,
  IndianRupee,
  Calendar,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { campaigns, ngos, mockNGOUser } from '@/data/campaigns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function NGODashboard() {
  const navigate = useNavigate();
  const [ngoUser, setNgoUser] = useState<{ email: string; name: string; ngoId: string } | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    description: '',
    goalAmount: '',
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('ngoUser');
    if (storedUser) {
      setNgoUser(JSON.parse(storedUser));
    } else {
      navigate('/ngo/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('ngoUser');
    navigate('/');
  };

  const handleCreateCampaign = async () => {
    setIsCreating(true);
    
    // TODO: POST /api/campaigns to create new campaign
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsCreating(false);
    setShowCreateDialog(false);
    setShowSuccess(true);
    setNewCampaign({ title: '', description: '', goalAmount: '' });
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (!ngoUser) return null;

  const ngo = ngos.find(n => n.id === ngoUser.ngoId);
  const ngoCampaigns = campaigns.filter(c => c.ngoId === ngoUser.ngoId);
  
  const totalDonations = ngoCampaigns.reduce((sum, c) => sum + c.raisedAmount, 0);
  const totalVolunteers = ngoCampaigns.reduce((sum, c) => sum + c.volunteersJoined, 0);
  const activeCampaigns = ngoCampaigns.filter(c => c.status === 'active').length;

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container-main section-padding !pt-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-3xl">
                {ngo?.logo}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{ngo?.name}</h1>
                <p className="text-muted-foreground">NGO Dashboard</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button variant="hero" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create Campaign
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Campaign</DialogTitle>
                    <DialogDescription>
                      Fill in the details to launch a new fundraising campaign.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="campaign-title">Campaign Title</Label>
                      <Input
                        id="campaign-title"
                        placeholder="Enter campaign title"
                        value={newCampaign.title}
                        onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="campaign-desc">Description</Label>
                      <Textarea
                        id="campaign-desc"
                        placeholder="Describe your campaign..."
                        rows={3}
                        value={newCampaign.description}
                        onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="campaign-goal">Goal Amount (₹)</Label>
                      <Input
                        id="campaign-goal"
                        type="number"
                        placeholder="500000"
                        value={newCampaign.goalAmount}
                        onChange={(e) => setNewCampaign({ ...newCampaign, goalAmount: e.target.value })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                      Cancel
                    </Button>
                    <Button 
                      variant="hero" 
                      onClick={handleCreateCampaign}
                      disabled={isCreating || !newCampaign.title || !newCampaign.goalAmount}
                    >
                      {isCreating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        'Create Campaign'
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-xl flex items-center gap-3 animate-fade-up">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span className="font-medium text-success">Campaign created successfully!</span>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card-elevated p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{ngoCampaigns.length}</div>
                  <div className="text-sm text-muted-foreground">Total Campaigns</div>
                </div>
              </div>
            </div>

            <div className="card-elevated p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{activeCampaigns}</div>
                  <div className="text-sm text-muted-foreground">Active Campaigns</div>
                </div>
              </div>
            </div>

            <div className="card-elevated p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <IndianRupee className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    ₹{(totalDonations / 100000).toFixed(1)}L
                  </div>
                  <div className="text-sm text-muted-foreground">Total Raised</div>
                </div>
              </div>
            </div>

            <div className="card-elevated p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{totalVolunteers}</div>
                  <div className="text-sm text-muted-foreground">Total Volunteers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Campaigns Table */}
          <div className="card-elevated">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your Campaigns</h2>
                <Link to="/impact">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <BarChart3 className="w-4 h-4" />
                    View Reports
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium text-muted-foreground">Campaign</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Progress</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Raised</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Volunteers</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {ngoCampaigns.map((campaign) => {
                    const progressPercent = (campaign.raisedAmount / campaign.goalAmount) * 100;
                    return (
                      <tr key={campaign.id} className="hover:bg-muted/30">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                              <img 
                                src={campaign.image} 
                                alt={campaign.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium truncate max-w-[200px]">{campaign.title}</div>
                              <div className="text-sm text-muted-foreground capitalize">{campaign.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="w-32">
                            <Progress value={progressPercent} className="h-2" />
                            <span className="text-xs text-muted-foreground">{progressPercent.toFixed(0)}%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium">₹{(campaign.raisedAmount / 100000).toFixed(1)}L</div>
                          <div className="text-xs text-muted-foreground">of ₹{(campaign.goalAmount / 100000).toFixed(1)}L</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span>{campaign.volunteersJoined}</span>
                            <span className="text-muted-foreground">/ {campaign.volunteersNeeded}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            campaign.status === 'active' 
                              ? 'bg-success/10 text-success' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {ngoCampaigns.length === 0 && (
              <div className="p-12 text-center">
                <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-medium mb-2">No campaigns yet</h3>
                <p className="text-muted-foreground mb-4">Create your first campaign to start receiving donations</p>
                <Button variant="hero" onClick={() => setShowCreateDialog(true)}>
                  <Plus className="w-4 h-4" />
                  Create Campaign
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
