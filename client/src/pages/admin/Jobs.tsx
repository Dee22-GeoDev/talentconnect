import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Briefcase } from "lucide-react";
import { useJobs } from "@/hooks/useJobs";

const Jobs = () => {
  const { data: jobs = [], isLoading } = useJobs();

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Job Postings Management
          </CardTitle>
          <CardDescription>Monitor and manage all job postings on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading jobs...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Posted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id} className="hover:bg-accent/50 transition-smooth">
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell className="text-muted-foreground">{job.company}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{job.location}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">{job.type}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{job.salary_range}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{getTimeAgo(job.created_at)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Jobs;
