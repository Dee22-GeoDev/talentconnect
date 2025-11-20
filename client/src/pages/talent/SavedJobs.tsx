import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, MapPin, Briefcase, Trash2 } from "lucide-react";

const SavedJobs = () => {
  // This would normally fetch saved jobs from the database
  const savedJobs: any[] = [];

  return (
    <DashboardLayout role="talent">
      <div className="space-y-6 fade-in">
        <div>
          <h2 className="text-2xl font-bold">Saved Jobs</h2>
          <p className="text-muted-foreground">Jobs you've bookmarked for later</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookmarkIcon className="h-5 w-5" />
              Your Saved Jobs ({savedJobs.length})
            </CardTitle>
            <CardDescription>Keep track of interesting opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            {savedJobs.length === 0 ? (
              <div className="text-center py-12">
                <BookmarkIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-2">No saved jobs yet</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Start saving jobs that interest you to easily find them later
                </p>
                <Button variant="outline" onClick={() => window.location.href = '/jobs'}>
                  Browse Jobs
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {savedJobs.map((job: any) => (
                  <div key={job.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">{job.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{job.company}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </Badge>
                        <Badge variant="secondary" className="gap-1">
                          <Briefcase className="h-3 w-3" />
                          {job.type}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" title="Remove">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SavedJobs;
