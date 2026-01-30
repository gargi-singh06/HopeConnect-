import { useState } from 'react';
import { CampaignCard } from './CampaignCard';
import { Button } from '@/components/ui/button';
import { campaigns } from '@/data/campaigns';
import { Filter, Grid, List } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Campaigns' },
  { id: 'education', label: 'Education' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'environment', label: 'Environment' },
  { id: 'disaster-relief', label: 'Disaster Relief' },
];

interface CampaignsGridProps {
  limit?: number;
  showFilters?: boolean;
}

export function CampaignsGrid({ limit, showFilters = true }: CampaignsGridProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCampaigns = campaigns.filter(
    (campaign) => activeCategory === 'all' || campaign.category === activeCategory
  );

  const displayedCampaigns = limit ? filteredCampaigns.slice(0, limit) : filteredCampaigns;

  return (
    <div>
      {showFilters && (
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Filter className="w-5 h-5 text-muted-foreground" />
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {displayedCampaigns.map((campaign, index) => (
          <CampaignCard key={campaign.id} campaign={campaign} index={index} />
        ))}
      </div>

      {displayedCampaigns.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No campaigns found in this category.</p>
        </div>
      )}
    </div>
  );
}
