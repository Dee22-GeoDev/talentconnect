import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { useMyJobs, useDeleteJob } from "@/hooks/useJobs";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: jobs = [], isLoading } = useMyJobs(user?.id);
  const deleteJob = useDeleteJob();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      await deleteJob.mutateAsync(id);
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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">My Job Postings</h2>
            <p className="text-muted-foreground">Manage your active job listings</p>
          </div>
          <Button className="gap-2" onClick={() => navigate('/dashboard/recruiter/jobs/new')}>
            <Plus className="h-4 w-4" />
            Post New Job
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Jobs ({jobs.length})</CardTitle>
            <CardDescription>All your posted job opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : jobs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No jobs posted yet</p>
                <Button onClick={() => navigate('/dashboard/recruiter/jobs/new')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Post Your First Job
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{job.location}</TableCell>
                      <TableCell><Badge variant="secondary">{job.type}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{getTimeAgo(job.created_at)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" title="View">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Delete"
                            onClick={() => handleDelete(job.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
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

export default MyJobs;
