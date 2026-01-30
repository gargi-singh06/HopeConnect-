import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Building2, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

export default function NGOLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // TODO: Implement actual NGO authentication
    // await supabase.auth.signInWithPassword({ email, password })

    // Mock login
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (formData.email && formData.password) {
      localStorage.setItem('ngoUser', JSON.stringify({ 
        email: formData.email, 
        name: 'EduBright Initiative',
        ngoId: 'ngo-2'
      }));
      navigate('/ngo/dashboard');
    } else {
      setError('Please enter valid credentials');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-24 px-4">
        <div className="w-full max-w-md">
          <div className="card-elevated p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary mb-4">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mb-2">NGO Login</h1>
              <p className="text-muted-foreground">Access your organization's dashboard</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="ngo-email">Organization Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="ngo-email"
                    type="email"
                    placeholder="contact@yourorg.org"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <Label htmlFor="ngo-password">Password</Label>
                  <Link to="/ngo/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="ngo-password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Access Dashboard
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Not registered yet?</span>
              </div>
            </div>

            {/* Register Link */}
            <Link to="/ngo/register">
              <Button variant="outline" className="w-full">
                <Building2 className="w-5 h-5" />
                Register Your NGO
              </Button>
            </Link>
          </div>

          {/* User Login Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Looking to donate or volunteer?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              User login
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
