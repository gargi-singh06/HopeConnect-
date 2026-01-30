import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { pricingPlans } from '@/data/campaigns';
import { Check, Building2, ArrowRight, Sparkles } from 'lucide-react';

export default function NGOPricing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container-main section-padding">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">NGO Plans</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select a plan that fits your organization's needs. All plans include our verification process 
              and secure donation handling.
            </p>
          </div>

          {/* Note about platform fee */}
          <div className="bg-secondary/50 rounded-2xl p-6 text-center mb-12 max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Platform Fee:</strong> NGOs pay a small monthly subscription to access the platform. 
              This helps us maintain the platform, verify organizations, and provide support to all users.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`card-elevated p-8 relative ${
                  plan.highlighted ? 'ring-2 ring-primary' : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">₹{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/ngo/register">
                  <Button
                    variant={plan.highlighted ? 'hero' : 'outline'}
                    size="lg"
                    className="w-full group"
                  >
                    <Building2 className="w-5 h-5" />
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ Preview */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">
              Have questions?{' '}
              <Link to="/contact" className="text-primary font-medium hover:underline">
                Contact our team
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />

      {/* TODO: Integrate payment for NGO onboarding */}
    </div>
  );
}
