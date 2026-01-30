import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Heart, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { Campaign } from '@/data/campaigns';
import { ngos } from '@/data/campaigns';

interface CampaignCardProps {
  campaign: Campaign;
  index?: number;
}

const categoryColors = {
  education: 'bg-blue-100 text-blue-700',
  healthcare: 'bg-rose-100 text-rose-700',
  environment: 'bg-emerald-100 text-emerald-700',
  'disaster-relief': 'bg-orange-100 text-orange-700',
};

const categoryLabels = {
  education: 'Education',
  healthcare: 'Healthcare',
  environment: 'Environment',
  'disaster-relief': 'Disaster Relief',
};

export function CampaignCard({ campaign, index = 0 }: CampaignCardProps) {
  const ngo = ngos.find((n) => n.id === campaign.ngoId);
  const progressPercent = (campaign.raisedAmount / campaign.goalAmount) * 100;
  const formattedRaised = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(campaign.raisedAmount);
  const formattedGoal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(campaign.goalAmount);

  return (
    <article
      className={`card-elevated group animate-fade-up`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden rounded-t-xl">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[campaign.category]}`}>
            {categoryLabels[campaign.category]}
          </span>
          {campaign.status === 'active' && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
              Active
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        {/* NGO Info */}
        {ngo && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{ngo.logo}</span>
            <span className="text-sm font-medium text-muted-foreground">{ngo.name}</span>
            {ngo.verified && (
              <CheckCircle2 className="w-4 h-4 text-primary" />
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {campaign.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {campaign.description}
        </p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold text-primary">{formattedRaised}</span>
            <span className="text-muted-foreground">of {formattedGoal}</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{progressPercent.toFixed(0)}% funded</span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {campaign.volunteersJoined} volunteers
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link to={`/campaigns/${campaign.id}`} className="flex-1">
            <Button variant="default" className="w-full group/btn">
              <Heart className="w-4 h-4" />
              Donate
              <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all" />
            </Button>
          </Link>
          <Link to={`/campaigns/${campaign.id}?action=volunteer`}>
            <Button variant="outline" size="icon">
              <Users className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
