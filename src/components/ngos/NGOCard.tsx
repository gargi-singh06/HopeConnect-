import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Users, Target, IndianRupee, ArrowRight } from 'lucide-react';
import type { NGO } from '@/data/campaigns';

interface NGOCardProps {
  ngo: NGO;
  index?: number;
}

export function NGOCard({ ngo, index = 0 }: NGOCardProps) {
  const formattedRaised = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(ngo.totalRaised);

  return (
    <article
      className={`card-elevated group p-6 animate-fade-up`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-3xl shrink-0">
          {ngo.logo}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold truncate group-hover:text-primary transition-colors">
              {ngo.name}
            </h3>
            {ngo.verified && (
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
            )}
          </div>
          <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium mt-1">
            {ngo.focusArea}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {ngo.description}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4 py-4 border-y border-border">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-lg font-semibold">
            <IndianRupee className="w-4 h-4" />
            {formattedRaised.replace('₹', '')}
          </div>
          <div className="text-xs text-muted-foreground">Raised</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-lg font-semibold">
            <Users className="w-4 h-4" />
            {ngo.totalVolunteers}
          </div>
          <div className="text-xs text-muted-foreground">Volunteers</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-lg font-semibold">
            <Target className="w-4 h-4" />
            {ngo.campaignsCount}
          </div>
          <div className="text-xs text-muted-foreground">Campaigns</div>
        </div>
      </div>

      {/* Action */}
      <Link to={`/ngos/${ngo.id}`}>
        <Button variant="outline" className="w-full group/btn">
          View Campaigns
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </article>
  );
}
