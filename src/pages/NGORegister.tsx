import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { pricingPlans } from '@/data/campaigns';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Loader2, 
  CheckCircle2,
  ArrowRight,
  Check
} from 'lucide-react';

const focusAreas = [
  'Education',
  'Healthcare',
  'Environment',
  'Disaster Relief',
  'Women Empowerment',
  'Child Welfare',
  'Animal Welfare',
  'Other',
];

export default function NGORegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    orgName: '',
    email: '',
    phone: '',
    address: '',
    focusArea: '',
    registrationNumber: '',
    description: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: POST /api/ngo/register to register NGO
    // TODO: Integrate Razorpay for plan payment
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setStep(3);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container-main section-padding">
          {/* Progress Steps */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= s
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  <span className={`hidden sm:block text-sm ${step >= s ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {s === 1 ? 'Select Plan' : s === 2 ? 'Organization Details' : 'Complete'}
                  </span>
                  {s < 3 && <div className="w-12 h-0.5 bg-border" />}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Select Plan */}
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Register Your NGO</h1>
                <p className="text-muted-foreground">Choose a plan to get started</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {pricingPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`card-elevated p-8 relative cursor-pointer transition-all ${
                      selectedPlan === plan.id ? 'ring-2 ring-primary' : 'hover:shadow-lg'
                    }`}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    {plan.highlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                          Recommended
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
                      {plan.features.slice(0, 5).map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={plan.highlighted ? 'hero' : 'outline'}
                      size="lg"
                      className="w-full"
                    >
                      Select {plan.name}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Organization Details */}
          {step === 2 && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Organization Details</h1>
                <p className="text-muted-foreground">
                  Tell us about your NGO. Selected plan:{' '}
                  <span className="font-medium text-primary">
                    {pricingPlans.find((p) => p.id === selectedPlan)?.name}
                  </span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="card-elevated p-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="orgName">Organization Name *</Label>
                    <div className="relative mt-1">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="orgName"
                        placeholder="Your NGO Name"
                        className="pl-10"
                        value={formData.orgName}
                        onChange={(e) => handleChange('orgName', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="registrationNumber">Registration Number *</Label>
                    <div className="relative mt-1">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="registrationNumber"
                        placeholder="e.g., 80G12345678"
                        className="pl-10"
                        value={formData.registrationNumber}
                        onChange={(e) => handleChange('registrationNumber', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Official Email *</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="contact@yourorg.org"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="focusArea">Focus Area *</Label>
                  <Select
                    value={formData.focusArea}
                    onValueChange={(value) => handleChange('focusArea', value)}
                  >
                    <SelectTrigger id="focusArea" className="mt-1">
                      <SelectValue placeholder="Select your primary focus area" />
                    </SelectTrigger>
                    <SelectContent>
                      {focusAreas.map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="address">Office Address *</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Textarea
                      id="address"
                      placeholder="Full office address"
                      className="pl-10"
                      rows={2}
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">About Your Organization *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your organization's mission and impact..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button type="submit" variant="hero" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Complete Registration
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="max-w-md mx-auto text-center">
              <div className="card-elevated p-12">
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6 animate-scale-in">
                  <CheckCircle2 className="w-10 h-10 text-success" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Registration Submitted!</h1>
                <p className="text-muted-foreground mb-8">
                  Thank you for registering with HopeConnect. Our team will verify your organization 
                  and get back to you within 2-3 business days.
                </p>
                <Link to="/">
                  <Button variant="hero" size="lg">
                    Return to Home
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* TODO: Integrate Razorpay payment for NGO registration */}
    </div>
  );
}
