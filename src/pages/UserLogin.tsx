import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Heart, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

export default function UserLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/user-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password, // password ignored in mock backend
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid credentials');
      }

      // Save user session (mock)
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: 'user',
        })
      );

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">
                Sign in to continue making an impact
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
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
                <span className="px-2 bg-card text-muted-foreground">
                  New to HopeConnect?
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <Link to="/signup">
              <Button variant="outline" className="w-full">
                Create an Account
              </Button>
            </Link>
          </div>

          {/* NGO Login Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Are you an NGO?{' '}
            <Link
              to="/ngo/login"
              className="text-primary font-medium hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
