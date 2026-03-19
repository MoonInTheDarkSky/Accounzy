import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Shield, 
  Scan, 
  TrendingUp, 
  Users, 
  Lock, 
  FileCheck, 
  BarChart3, 
  Globe,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  FileText,
  Calculator,
  Clock
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Scan className="h-6 w-6" />,
      title: 'AI Bill Scanning',
      description: 'Google Vision AI powered automatic data extraction from bills and receipts',
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: 'Irish Tax Compliance',
      description: 'VAT returns, expense categorization, and ROS integration preparation',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'GDPR Compliant',
      description: 'Full compliance with EU data protection regulations and Irish DPC requirements',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Multi-User System',
      description: 'Role-based access for clients, accountants, and administrators',
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Real-Time Analytics',
      description: 'Comprehensive reporting and insights for better financial decisions',
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and zero-trust security architecture',
    },
  ];

  const benefits = [
    'Automated expense tracking and categorization',
    'Irish VAT and tax compliance monitoring',
    'Secure document storage and sharing',
    'Real-time collaboration with accountants',
    'GDPR-compliant data management',
    'Mobile-first bill scanning',
  ];

  const testimonials = [
    {
      name: 'Mary O\'Sullivan',
      role: 'Finance Director',
      company: 'Dublin Tech Solutions',
      content: 'The AI bill scanning has reduced our processing time by 70%. It\'s been transformative for our accounting workflow.',
    },
    {
      name: 'Patrick Murphy',
      role: 'Managing Partner',
      company: 'Murphy & Associates',
      content: 'Finally, a solution that understands Irish tax compliance. The GDPR features give our clients complete confidence.',
    },
    {
      name: 'Siobhan Walsh',
      role: 'Business Owner',
      company: 'Walsh Retail Group',
      content: 'Managing expenses across multiple locations is now effortless. The mobile app is intuitive and saves us hours weekly.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calculator className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">FinnTax Pro</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20 border-secondary/20">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered Accounting
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Smart Accounting for
                <span className="text-primary block mt-2">Irish Businesses</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Streamline your financial operations with AI-powered bill scanning, automated tax compliance, 
                and comprehensive GDPR protection. Built specifically for Irish accounting firms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                  <Link to="/register">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/login">View Demo</Link>
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </div>
            <div className="relative animate-slide-in">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f"
                  alt="Professional accounting workspace"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              {/* Floating Stats Cards */}
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-lg shadow-lg border animate-slide-up">
                <div className="flex items-center space-x-3">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">70%</p>
                    <p className="text-sm text-muted-foreground">Time Saved</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-card p-4 rounded-lg shadow-lg border animate-slide-up" style={{animationDelay: '0.2s'}}>
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">100%</p>
                    <p className="text-sm text-muted-foreground">GDPR Compliant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground mb-8">Trusted by leading Irish businesses and accounting firms</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8" />
              <span className="text-lg font-semibold">Enterprise Corp</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building className="h-8 w-8" />
              <span className="text-lg font-semibold">Dublin Finance</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8" />
              <span className="text-lg font-semibold">Celtic Accounting</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="text-primary border-primary/20">
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Everything you need for modern accounting
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to streamline your accounting workflow and ensure compliance
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="text-secondary border-secondary/20">
              Simple Process
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              How FinnTax Pro Works
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold">Scan Your Bills</h3>
              <p className="text-muted-foreground">
                Upload or photograph receipts and bills. Our AI instantly extracts all relevant data.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-secondary text-secondary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold">Auto-Categorization</h3>
              <p className="text-muted-foreground">
                Expenses are automatically categorized according to Irish tax compliance rules.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-accent text-accent-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold">Generate Reports</h3>
              <p className="text-muted-foreground">
                Get instant tax-ready reports and seamless collaboration with your accountant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="text-primary border-primary/20">
                Benefits
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Why Irish businesses choose FinnTax Pro
              </h2>
              <p className="text-lg text-muted-foreground">
                Built specifically for Irish tax compliance with GDPR at its core
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90 mt-4" asChild>
                <Link to="/register">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1772588627499-baefc8ab0ce7"
                alt="Tax compliance and documentation"
                className="rounded-xl shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="text-secondary border-secondary/20">
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Loved by accountants and businesses
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-sm text-primary">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8 text-primary-foreground">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Ready to transform your accounting workflow?
            </h2>
            <p className="text-lg text-primary-foreground/90">
              Join hundreds of Irish businesses already saving time and ensuring compliance with FinnTax Pro
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/register">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/login">Login to Demo</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-8 text-sm text-primary-foreground/80 pt-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>Bank-Grade Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Calculator className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">FinnTax Pro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered accounting platform for Irish businesses
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link to="/" className="hover:text-primary transition-colors">GDPR</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 FinnTax Pro. All rights reserved. Made in Ireland 🇮🇪</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Missing Building icon import
const Building = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

export default LandingPage;
