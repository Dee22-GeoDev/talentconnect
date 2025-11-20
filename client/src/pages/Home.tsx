import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, MapPin, Search, CheckCircle, TrendingUp } from "lucide-react";
import Navigation from "@/components/Navigation";

const Home = () => {
  return (
    <div className="min-h-screen gradient-subtle">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent" />
        <div className="container relative mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Connecting Local Talents to{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Great Opportunities
              </span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              Bridge the gap between skilled professionals and companies in your community. 
              Find the perfect match, locally.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/jobs">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  <Search className="mr-2 h-5 w-5" />
                  Find a Job
                </Button>
              </Link>
              <Link to="/talents">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Users className="mr-2 h-5 w-5" />
                  Find Talent
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-card">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Active Job Listings</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">1,200+</div>
              <div className="text-sm text-muted-foreground">Talented Professionals</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Why Choose TalentConnect?</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to connect with the right people in your area
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="shadow-card hover:shadow-hover transition-smooth">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Local Focus</CardTitle>
                <CardDescription>
                  Connect with opportunities and talent in your community. Support local growth.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-hover transition-smooth">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Verified Profiles</CardTitle>
                <CardDescription>
                  All talents and companies are verified to ensure quality and authenticity.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-hover transition-smooth">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Smart Matching</CardTitle>
                <CardDescription>
                  Our platform intelligently matches skills with opportunities for better results.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-hover transition-smooth">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Easy Job Posting</CardTitle>
                <CardDescription>
                  Post jobs in minutes and reach qualified local candidates quickly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-hover transition-smooth">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Direct Connection</CardTitle>
                <CardDescription>
                  Message and connect with candidates or recruiters directly through our platform.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-hover transition-smooth">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Advanced Search</CardTitle>
                <CardDescription>
                  Filter by skills, location, experience level, and more to find the perfect match.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y bg-card py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Get started in three simple steps
            </p>
          </div>
          
          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full gradient-hero text-2xl font-bold text-white">
                1
              </div>
              <h3 className="mb-3 text-xl font-bold">Create Your Profile</h3>
              <p className="text-muted-foreground">
                Sign up and build your professional profile or company page in minutes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full gradient-hero text-2xl font-bold text-white">
                2
              </div>
              <h3 className="mb-3 text-xl font-bold">Search & Connect</h3>
              <p className="text-muted-foreground">
                Browse opportunities or talents and reach out to the ones that fit.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full gradient-hero text-2xl font-bold text-white">
                3
              </div>
              <h3 className="mb-3 text-xl font-bold">Grow Together</h3>
              <p className="text-muted-foreground">
                Start working together and build lasting professional relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-primary to-accent p-12 text-center shadow-hover">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Join our community of talented professionals and forward-thinking companies today.
            </p>
            <Link to="/auth?mode=signup">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white text-primary hover:bg-white/90"
              >
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">TalentConnect</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting local talents with great opportunities.
              </p>
            </div>
            
            <div>
              <h4 className="mb-4 font-semibold">For Job Seekers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/jobs" className="hover:text-primary">Browse Jobs</Link></li>
                <li><Link to="/auth" className="hover:text-primary">Create Profile</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4 font-semibold">For Employers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/talents" className="hover:text-primary">Find Talents</Link></li>
                <li><Link to="/auth" className="hover:text-primary">Post a Job</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 TalentConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
