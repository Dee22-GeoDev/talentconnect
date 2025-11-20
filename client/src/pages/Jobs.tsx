import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, MapPin, Briefcase, Clock, DollarSign } from "lucide-react";
import { useJobs } from "@/hooks/useJobs";
import { useAuth } from "@/hooks/useAuth";
import { useCreateApplication } from "@/hooks/useApplications";
import { toast } from "sonner";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobType, setJobType] = useState("all");
  const [location, setLocation] = useState("all");
  const [coverLetter, setCoverLetter] = useState("");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  
  const { data: jobs = [], isLoading } = useJobs();
  const { user } = useAuth();
  const createApplication = useCreateApplication();

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = jobType === "all" || job.type.toLowerCase() === jobType.toLowerCase();
    const matchesLocation = location === "all" || job.location.toLowerCase().includes(location.toLowerCase());
    
    return matchesSearch && matchesType && matchesLocation;
  });

  const handleApply = async (jobId: string) => {
    if (!user) {
      toast.error('Please log in to apply for jobs');
      return;
    }
    
    await createApplication.mutateAsync({
      job_id: jobId,
      applicant_id: user.id,
      cover_letter: coverLetter,
    });
    
    setCoverLetter("");
    setSelectedJobId(null);
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Browse Jobs</h1>
          <p className="text-lg text-muted-foreground">
            Discover opportunities that match your skills and aspirations
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 shadow-card">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative md:col-span-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search jobs, skills, companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
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
            Showing <span className="font-semibold text-foreground">{filteredJobs.length}</span> job{filteredJobs.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading jobs...</p>
          </div>
        )}

        {/* Job Listings */}
        {!isLoading && (
          <div className="grid gap-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="shadow-card hover:shadow-hover transition-smooth">
                <CardHeader>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <CardTitle className="mb-2 text-xl">{job.title}</CardTitle>
                      <CardDescription className="mb-3 text-base font-medium text-foreground">
                        {job.company}
                      </CardDescription>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {job.type}
                        </div>
                        {job.salary_range && (
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {job.salary_range}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {getTimeAgo(job.created_at)}
                        </div>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="hero" 
                          onClick={() => setSelectedJobId(job.id)}
                          disabled={!user}
                        >
                          Apply Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Apply for {job.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="cover-letter">Cover Letter (Optional)</Label>
                            <Textarea
                              id="cover-letter"
                              placeholder="Tell us why you're a great fit for this role..."
                              value={coverLetter}
                              onChange={(e) => setCoverLetter(e.target.value)}
                              rows={6}
                            />
                          </div>
                          <Button 
                            className="w-full" 
                            onClick={() => handleApply(job.id)}
                            disabled={createApplication.isPending}
                          >
                            {createApplication.isPending ? 'Submitting...' : 'Submit Application'}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">{job.description}</p>
                  <Badge variant="secondary">ID: {job.id.slice(0, 8)}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredJobs.length === 0 && !isLoading && (
          <Card className="p-12 text-center shadow-card">
            <p className="text-lg text-muted-foreground">
              No jobs found matching your criteria. Try adjusting your filters.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Jobs;
