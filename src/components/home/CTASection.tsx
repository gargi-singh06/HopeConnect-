import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building2, ArrowRight, CheckCircle2 } from 'lucide-react';

const benefits = [
  'Reach thousands of potential donors',
  'Manage campaigns with ease',
  'Track donations in real-time',
  'Connect with dedicated volunteers',
];

export function CTASection() {
  return (
    <section className="section-padding" aria-labelledby="cta-heading">
      <div className="container-main">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-8 sm:p-12 lg:p-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '30px 30px',
            }} />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            {/* Content */}
            <div>
              <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
                Are You an NGO?
                <br />
                Join HopeConnect Today
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-6">
                Register your organization and start receiving donations from thousands of generous supporters. 
                Get verified, create campaigns, and expand your reach.
              </p>
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-primary-foreground">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/ngo/register">
                  <Button size="xl" className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 group">
                    <Building2 className="w-5 h-5" />
                    Register Your NGO
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/ngo/pricing">
                  <Button size="xl" variant="hero-outline" className="w-full sm:w-auto">
                    View Pricing Plans
                  </Button>
                </Link>
              </div>
            </div>

            {/* Illustration */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-primary-foreground/10 rounded-2xl transform rotate-3" />
                <div className="relative bg-card rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">NGO Dashboard</div>
                      <div className="text-sm text-muted-foreground">Manage everything in one place</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                      <span className="text-sm">Active Campaigns</span>
                      <span className="font-bold text-primary">12</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                      <span className="text-sm">Total Donations</span>
                      <span className="font-bold text-primary">₹85L</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                      <span className="text-sm">Volunteers</span>
                      <span className="font-bold text-primary">450</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
