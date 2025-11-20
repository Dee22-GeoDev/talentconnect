import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { useMyJobs } from "@/hooks/useJobs";
import { useRecruiterApplications } from "@/hooks/useApplications";
import { useNavigate } from "react-router-dom";

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: jobs = [], isLoading: jobsLoading } = useMyJobs(user?.id);
  const { data: applications = [], isLoading: appsLoading } = useRecruiterApplications(user?.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "pending": return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "rejected": return "bg-red-500/10 text-red-700 dark:text-red-400";
      default: return "bg-muted";
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return `${Math.floor(diffInDays / 7)} weeks ago`;
  };

  return (
    <DashboardLayout role="recruiter">
      <div className="space-y-6 fade-in">
        <div className="space-y-2 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Recruiter Dashboard</h2>
            <p className="text-muted-foreground">Manage your job postings and connect with top talent</p>
          </div>
          <Button className="gap-2" onClick={() => navigate('/dashboard/recruiter/jobs/new')}>
            <Plus className="h-4 w-4" />
            Post New Job
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobs.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.filter(a => a.status === 'pending').length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Your Job Postings
            </CardTitle>
            <CardDescription>Manage and track your active job listings</CardDescription>
          </CardHeader>
          <CardContent>
            {jobsLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : jobs.length === 0 ? (
              <p className="text-muted-foreground">No jobs posted yet</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Posted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{job.location}</TableCell>
                      <TableCell><Badge variant="secondary">{job.type}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{getTimeAgo(job.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Latest candidates who applied to your positions</CardDescription>
          </CardHeader>
          <CardContent>
            {appsLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : applications.length === 0 ? (
              <p className="text-muted-foreground">No applications yet</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.slice(0, 10).map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.profiles?.full_name || app.profiles?.email}</TableCell>
                      <TableCell>{app.jobs?.title}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(app.status)} variant="secondary">
                          {app.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{getTimeAgo(app.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RecruiterDashboard;
