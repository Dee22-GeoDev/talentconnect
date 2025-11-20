import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Briefcase } from "lucide-react";
import { useTalents } from "@/hooks/useTalents";

const Talents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("all");
  const [location, setLocation] = useState("all");

  const { data: talents = [], isLoading } = useTalents();

  const filteredTalents = talents.filter((talent) => {
    const matchesSearch = 
      talent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (talent.bio && talent.bio.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (talent.profiles?.full_name && talent.profiles.full_name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesExperience = 
      experienceLevel === "all" ||
      (experienceLevel === "junior" && talent.experience_years && talent.experience_years <= 2) ||
      (experienceLevel === "mid" && talent.experience_years && talent.experience_years >= 3 && talent.experience_years <= 5) ||
      (experienceLevel === "senior" && talent.experience_years && talent.experience_years >= 6);
    
    return matchesSearch && matchesExperience;
  });

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Browse Talents</h1>
          <p className="text-lg text-muted-foreground">
            Connect with skilled professionals ready to make an impact
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 shadow-card">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative md:col-span-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search talents, skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Experience Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid (3-5 years)</SelectItem>
                  <SelectItem value="senior">Senior (6+ years)</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="california">California</SelectItem>
                  <SelectItem value="texas">Texas</SelectItem>
                  <SelectItem value="washington">Washington</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredTalents.length}</span> talent{filteredTalents.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading talent profiles...</p>
          </div>
        )}

        {/* Talent Listings */}
        {!isLoading && (
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredTalents.map((talent) => (
              <Card key={talent.id} className="shadow-card hover:shadow-hover transition-smooth">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="gradient-hero text-lg font-semibold text-white">
                        {getInitials(talent.profiles?.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="mb-1">{talent.profiles?.full_name || 'Anonymous'}</CardTitle>
                      <CardDescription className="mb-2 text-base font-medium text-foreground">
                        {talent.title}
                      </CardDescription>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        {talent.experience_years && (
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {talent.experience_years} years
                          </div>
                        )}
                      </div>
                    </div>
                    <Badge variant="default">Available</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {talent.bio && (
                    <p className="mb-4 text-sm text-muted-foreground">{talent.bio}</p>
                  )}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {talent.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {talent.portfolio_url && (
                      <a 
                        href={talent.portfolio_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        View Portfolio
                      </a>
                    )}
                    {talent.resume_url && (
                      <a 
                        href={talent.resume_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        View Resume
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredTalents.length === 0 && !isLoading && (
          <Card className="p-12 text-center shadow-card">
            <p className="text-lg text-muted-foreground">
              No talents found matching your criteria. Try adjusting your filters.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Talents;
