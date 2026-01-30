import { Building2, Search, Heart, BarChart3 } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Browse NGOs & Campaigns',
    description: 'Explore verified NGOs and their campaigns across education, healthcare, environment, and more.',
  },
  {
    icon: Heart,
    title: 'Donate or Volunteer',
    description: 'Choose to contribute financially or offer your time and skills to support causes you care about.',
  },
  {
    icon: Building2,
    title: 'NGOs Receive Support',
    description: 'Verified NGOs receive donations directly and connect with volunteers for their campaigns.',
  },
  {
    icon: BarChart3,
    title: 'Track Your Impact',
    description: 'View detailed impact reports showing exactly how your contribution is making a difference.',
  },
];

export function HowItWorks() {
  return (
    <section className="section-padding" aria-labelledby="how-it-works-heading">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 id="how-it-works-heading" className="text-3xl sm:text-4xl font-bold mb-4">
            How HopeConnect Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple, transparent process connecting donors and volunteers with verified NGOs
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative text-center animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector Line (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
              )}

              {/* Step Number */}
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-secondary mb-4">
                <step.icon className="w-8 h-8 text-primary" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
