import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Users, ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/3 to-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="container-main section-padding pt-24 sm:pt-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 mb-6 animate-fade-up">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Trusted by 100+ NGOs across India</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-up stagger-1">
              Connecting{' '}
              <span className="gradient-text">Hope</span>
              <br />
              to Those Who Need It Most
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-up stagger-2">
              Join thousands of donors and volunteers making a real difference. 
              Support verified NGOs, track your impact, and help transform lives across India.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up stagger-3">
              <Link to="/donate">
                <Button variant="hero" size="xl" className="w-full sm:w-auto group">
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Donate Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/volunteer">
                <Button variant="outline" size="xl" className="w-full sm:w-auto group">
                  <Users className="w-5 h-5" />
                  Become a Volunteer
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 pt-10 border-t border-border/50 animate-fade-up stagger-4">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Lives Impacted</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">₹2.5Cr</div>
                  <div className="text-sm text-muted-foreground">Funds Raised</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">5K+</div>
                  <div className="text-sm text-muted-foreground">Volunteers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image / Illustration */}
          <div className="relative animate-fade-up stagger-2">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main Image Container */}
              <div className="absolute inset-4 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop"
                  alt="Volunteers helping community members"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-card rounded-2xl p-4 shadow-card animate-pulse-soft">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-success fill-success" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">New Donation</div>
                    <div className="text-xs text-muted-foreground">₹5,000 just now</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-4 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Active Volunteers</div>
                    <div className="text-xs text-muted-foreground">1,247 this month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
