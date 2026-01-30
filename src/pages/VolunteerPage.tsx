import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { VolunteerForm } from '@/components/volunteer/VolunteerForm';
import { Users, CheckCircle2 } from 'lucide-react';

const benefits = [
  'Make a direct impact in your community',
  'Gain valuable experience and skills',
  'Connect with like-minded individuals',
  'Flexible time commitment options',
  'Receive volunteer certification',
  'Be part of meaningful change',
];

export default function VolunteerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container-main section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Info Section */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 mb-4">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Join Our Community</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Become a <span className="gradient-text">Volunteer</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Your time and skills can make a tremendous difference. Join thousands of volunteers 
                who are creating positive change in communities across India.
              </p>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                <h2 className="text-xl font-semibold">Why Volunteer with Us?</h2>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="card-elevated p-4 text-center">
                  <div className="text-2xl font-bold text-primary">5K+</div>
                  <div className="text-xs text-muted-foreground">Volunteers</div>
                </div>
                <div className="card-elevated p-4 text-center">
                  <div className="text-2xl font-bold text-primary">100+</div>
                  <div className="text-xs text-muted-foreground">NGOs</div>
                </div>
                <div className="card-elevated p-4 text-center">
                  <div className="text-2xl font-bold text-primary">50K+</div>
                  <div className="text-xs text-muted-foreground">Hours Given</div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div>
              <VolunteerForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
