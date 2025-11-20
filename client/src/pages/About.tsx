import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Users, Heart, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">About TalentConnect</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            We're on a mission to bridge the gap between local talents and opportunities, 
            creating stronger communities one connection at a time.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-lg text-muted-foreground">
                At TalentConnect, we believe that great opportunities shouldn't require 
                relocating across the country. We're dedicated to helping talented individuals 
                find meaningful work in their communities while empowering local businesses 
                to discover the skilled professionals they need to grow.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">Our Values</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="shadow-card transition-smooth hover:shadow-hover">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <CardTitle>Local Focus</CardTitle>
                <CardDescription>
                  Strengthening communities by connecting local talent with local opportunities
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card transition-smooth hover:shadow-hover">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <CardTitle>Authenticity</CardTitle>
                <CardDescription>
                  Building genuine connections through verified profiles and transparent communication
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card transition-smooth hover:shadow-hover">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-7 w-7 text-primary" />
                </div>
                <CardTitle>Accessibility</CardTitle>
                <CardDescription>
                  Making professional opportunities accessible to everyone, regardless of background
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card transition-smooth hover:shadow-hover">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <TrendingUp className="h-7 w-7 text-primary" />
                </div>
                <CardTitle>Growth</CardTitle>
                <CardDescription>
                  Supporting continuous learning and career development for all our members
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-3xl">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                TalentConnect was born from a simple observation: talented professionals and 
                growing companies often struggle to find each other, even when they're in the 
                same community. Traditional job boards are crowded and impersonal, while local 
                networking can be time-consuming and limited in reach.
              </p>
              <p>
                We created TalentConnect to solve this problem by building a platform that 
                combines the reach of online job boards with the personal touch of local 
                networking. Our goal is to make it easy for companies to find qualified 
                candidates nearby and for professionals to discover opportunities in their area.
              </p>
              <p>
                Today, we're proud to serve thousands of professionals and companies across 
                multiple communities, facilitating connections that drive both individual 
                careers and local economic growth.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="gradient-hero p-12 shadow-hover">
            <h2 className="mb-4 text-3xl font-bold text-white">Join Our Community</h2>
            <p className="mb-6 text-lg text-white/90">
              Whether you're looking for talent or seeking opportunities, we're here to help.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/jobs">
                <Button size="lg" variant="outline" className="w-full bg-white text-primary hover:bg-white/90 sm:w-auto">
                  Browse Jobs
                </Button>
              </Link>
              <Link to="/talents">
                <Button size="lg" variant="outline" className="w-full bg-white text-primary hover:bg-white/90 sm:w-auto">
                  Find Talents
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
