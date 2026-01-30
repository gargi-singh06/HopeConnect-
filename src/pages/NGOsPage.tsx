import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { NGOCard } from '@/components/ngos/NGOCard';
import { ngos } from '@/data/campaigns';
import { Building2 } from 'lucide-react';

export default function NGOsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container-main section-padding">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 mb-4">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Verified Organizations</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Partner NGOs</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover verified non-profit organizations making a real difference. 
              Each NGO is thoroughly vetted to ensure your contributions create maximum impact.
            </p>
          </div>

          {/* NGO Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ngos.map((ngo, index) => (
              <NGOCard key={ngo.id} ngo={ngo} index={index} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
