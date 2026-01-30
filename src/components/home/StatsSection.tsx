import { useEffect, useState, useRef } from 'react';
import { Heart, IndianRupee, Users, Target } from 'lucide-react';

const stats = [
  {
    icon: Heart,
    value: 50000,
    suffix: '+',
    label: 'People Helped',
    description: 'Lives transformed through our platform',
  },
  {
    icon: IndianRupee,
    value: 2.5,
    suffix: 'Cr',
    prefix: '₹',
    label: 'Funds Raised',
    description: 'Donated by generous supporters',
    decimal: true,
  },
  {
    icon: Users,
    value: 5000,
    suffix: '+',
    label: 'Active Volunteers',
    description: 'Dedicating their time to causes',
  },
  {
    icon: Target,
    value: 100,
    suffix: '+',
    label: 'Campaigns',
    description: 'Successfully completed or ongoing',
  },
];

function AnimatedCounter({ 
  value, 
  suffix = '', 
  prefix = '', 
  decimal = false,
  inView 
}: { 
  value: number; 
  suffix?: string; 
  prefix?: string;
  decimal?: boolean;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, inView]);

  const displayValue = decimal ? count.toFixed(1) : Math.floor(count).toLocaleString();

  return (
    <span className="stat-number">
      {prefix}{displayValue}{suffix}
    </span>
  );
}

export function StatsSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-br from-primary to-accent py-20 sm:py-24 overflow-hidden"
      aria-labelledby="stats-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container-main px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 id="stats-heading" className="sr-only">Our Impact Statistics</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center ${inView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/10 mb-4">
                <stat.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-2">
                <AnimatedCounter 
                  value={stat.value} 
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  decimal={stat.decimal}
                  inView={inView}
                />
              </div>
              <div className="text-lg font-semibold text-primary-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-primary-foreground/70">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
