import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Calculator, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login(formData.email, formData.password);
      
      // Redirect based on role
      switch (user.role) {
        case 'client':
          navigate('/client/dashboard');
          break;
        case 'accountant':
          navigate('/accountant/dashboard');
          break;
        case 'super_admin':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      // Error is handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (role) => {
    const credentials = {
      client: { email: 'client@demo.com', password: 'demo123' },
      accountant: { email: 'accountant@demo.com', password: 'demo123' },
      super_admin: { email: 'admin@demo.com', password: 'demo123' },
    };
    setFormData(credentials[role]);
    toast.info('Demo credentials filled', {
      description: `Click login to access as ${role.replace('_', ' ')}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2 text-primary hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to home</span>
          </Link>
          <div className="flex justify-center">
            <div className="bg-primary/10 p-3 rounded-xl">
              <Calculator className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your FinnTax Pro account</p>
        </div>

        {/* Demo Credentials Alert */}
        <Alert className="bg-secondary/10 border-secondary/20">
          <AlertDescription className="text-sm">
            <p className="font-medium mb-2">Demo Accounts Available:</p>
            <div className="space-y-1">
              <button onClick={() => fillDemoCredentials('client')} className="block text-left hover:text-primary transition-colors w-full">
                <span className="font-medium">Client:</span> client@demo.com / demo123
              </button>
              <button onClick={() => fillDemoCredentials('accountant')} className="block text-left hover:text-primary transition-colors w-full">
                <span className="font-medium">Accountant:</span> accountant@demo.com / demo123
              </button>
              <button onClick={() => fillDemoCredentials('super_admin')} className="block text-left hover:text-primary transition-colors w-full">
                <span className="font-medium">Admin:</span> admin@demo.com / demo123
              </button>
            </div>
          </AlertDescription>
        </Alert>

        {/* Login Form */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-background"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded border-input" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <Link to="/" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Create account
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        {/* Security Badge */}
        <div className="text-center text-sm text-muted-foreground">
          <p>🔒 Secured with bank-grade encryption</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
