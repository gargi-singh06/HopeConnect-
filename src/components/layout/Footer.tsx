import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const footerLinks = {
  platform: [
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Browse Campaigns', path: '/campaigns' },
    { name: 'Find NGOs', path: '/ngos' },
    { name: 'Impact Reports', path: '/impact' },
  ],
  forNGOs: [
    { name: 'Register Your NGO', path: '/ngo/register' },
    { name: 'Pricing Plans', path: '/ngo/pricing' },
    { name: 'NGO Dashboard', path: '/ngo/dashboard' },
    { name: 'Success Stories', path: '/success-stories' },
  ],
  support: [
    { name: 'Help Center', path: '/help' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Report an Issue', path: '/report' },
  ],
  legal: [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Refund Policy', path: '/refund' },
    { name: 'Cookie Policy', path: '/cookies' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background" role="contentinfo">
      <div className="container-main section-padding !pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-background">
                HOPECONNECT
              </span>
            </Link>
            <p className="text-background/70 text-sm mb-6">
              Connecting hope to those who need it most. A platform bridging donors, volunteers, and NGOs for meaningful impact.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-semibold mb-4 text-background">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-background">For NGOs</h3>
            <ul className="space-y-2">
              {footerLinks.forNGOs.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-background">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-background">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-background/70">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <a href="mailto:info@hopeconnect.org" className="hover:text-primary transition-colors">
                  info@hopeconnect.org
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-background/70">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                <a href="tel:+911234567890" className="hover:text-primary transition-colors">
                  +91 12345 67890
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-background/70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © 2026 HopeConnect. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.slice(0, 2).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-background/60 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
