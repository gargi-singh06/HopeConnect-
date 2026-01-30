import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Users, Loader2 } from 'lucide-react';

const interestAreas = [
  { value: 'education', label: 'Education' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'environment', label: 'Environment' },
  { value: 'disaster-relief', label: 'Disaster Relief' },
];

interface VolunteerFormProps {
  campaignId?: string;
  campaignTitle?: string;
  onSubmit?: (data: VolunteerFormData) => void;
}

interface VolunteerFormData {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

export function VolunteerForm({ campaignId, campaignTitle, onSubmit }: VolunteerFormProps) {
  const [formData, setFormData] = useState<VolunteerFormData>({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<VolunteerFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<VolunteerFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.interest) {
      newErrors.interest = 'Please select an area of interest';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // TODO: POST /api/volunteers
    // await fetch('/api/volunteers', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ ...formData, campaignId }),
    // });

    // Mock submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);
    onSubmit?.(formData);
  };

  const handleChange = (field: keyof VolunteerFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (showSuccess) {
    return (
      <div className="card-elevated p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4 animate-scale-in">
          <CheckCircle2 className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
        <p className="text-muted-foreground mb-4">
          Thank you for volunteering to help. We'll review your application and get back to you soon.
        </p>
        <Button variant="outline" onClick={() => setShowSuccess(false)}>
          Submit Another Application
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-elevated p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Users className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Volunteer Registration</h3>
          {campaignTitle && (
            <p className="text-sm text-muted-foreground">For: {campaignTitle}</p>
          )}
        </div>
      </div>

      <div className="space-y-5">
        {/* Name */}
        <div>
          <Label htmlFor="volunteer-name">Full Name *</Label>
          <Input
            id="volunteer-name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={errors.name ? 'border-destructive' : ''}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-destructive mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="volunteer-email">Email Address *</Label>
          <Input
            id="volunteer-email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={errors.email ? 'border-destructive' : ''}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-destructive mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="volunteer-phone">Phone Number *</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              +91
            </span>
            <Input
              id="volunteer-phone"
              type="tel"
              inputMode="numeric"
              placeholder="98765 43210"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value.replace(/[^0-9\s]/g, ''))}
              className={`pl-12 ${errors.phone ? 'border-destructive' : ''}`}
              maxLength={12}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
          </div>
          {errors.phone && (
            <p id="phone-error" className="text-sm text-destructive mt-1">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Interest Area */}
        <div>
          <Label htmlFor="volunteer-interest">Area of Interest *</Label>
          <Select
            value={formData.interest}
            onValueChange={(value) => handleChange('interest', value)}
          >
            <SelectTrigger
              id="volunteer-interest"
              className={errors.interest ? 'border-destructive' : ''}
            >
              <SelectValue placeholder="Select your area of interest" />
            </SelectTrigger>
            <SelectContent>
              {interestAreas.map((area) => (
                <SelectItem key={area.value} value={area.value}>
                  {area.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.interest && (
            <p className="text-sm text-destructive mt-1">{errors.interest}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="volunteer-message">Why do you want to volunteer? (Optional)</Label>
          <Textarea
            id="volunteer-message"
            placeholder="Tell us about your motivation and any relevant experience..."
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            rows={4}
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="hero"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Users className="w-5 h-5" />
              Register as Volunteer
            </>
          )}
        </Button>
      </div>

      {/* TODO Comment */}
      {/* TODO: POST /api/volunteers to submit volunteer registration */}
    </form>
  );
}
