import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Loader2, 
  CheckCircle2,
  MessageSquare
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: POST /api/contact to send message
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container-main section-padding">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 mb-4">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Get in Touch</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. 
              Our team is always ready to help.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="card-elevated p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <a 
                      href="mailto:info@hopeconnect.org" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      info@hopeconnect.org
                    </a>
                  </div>
                </div>
              </div>

              <div className="card-elevated p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Call Us</h3>
                    <a 
                      href="tel:+911234567890" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +91 12345 67890
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">Mon-Fri, 9AM-6PM IST</p>
                  </div>
                </div>
              </div>

              <div className="card-elevated p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Visit Us</h3>
                    <p className="text-muted-foreground">
                      123 Hope Street, Bandra West<br />
                      Mumbai, Maharashtra 400050<br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {showSuccess ? (
                <div className="card-elevated p-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6 animate-scale-in">
                    <CheckCircle2 className="w-10 h-10 text-success" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card-elevated p-8">
                  <h2 className="text-xl font-semibold mb-6">Send us a Message</h2>
                  
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  <Button type="submit" variant="hero" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
