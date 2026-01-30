import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Heart, User, Building2 } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Campaigns', path: '/campaigns' },
  { name: 'NGOs', path: '/ngos' },
  { name: 'Impact', path: '/impact' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-main section-padding !py-0" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            aria-label="HopeConnect Home"
          >
            <span className="text-xl sm:text-2xl font-bold gradient-text">
              HOPECONNECT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary bg-secondary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="w-4 h-4" />
                User Login
              </Button>
            </Link>
            <Link to="/ngo/login">
              <Button variant="outline" size="sm" className="gap-2">
                <Building2 className="w-4 h-4" />
                NGO Login
              </Button>
            </Link>
            <Link to="/donate">
              <Button variant="hero" size="sm">
                Donate Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-[500px] pb-6' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-2 pt-4 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary bg-secondary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
              <Link to="/login">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <User className="w-4 h-4" />
                  User Login
                </Button>
              </Link>
              <Link to="/ngo/login">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Building2 className="w-4 h-4" />
                  NGO Login
                </Button>
              </Link>
              <Link to="/donate">
                <Button variant="hero" className="w-full">
                  Donate Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
