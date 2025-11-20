import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Activity, Shield, CheckCircle } from "lucide-react";
import { useAllUsers, useAdminStats } from "@/hooks/useAdmin";
import { useJobs } from "@/hooks/useJobs";
import { fetchAndSeedJobs } from "@/utils/seedJobs";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { useQueryClient } from "@tanstack/react-query";

const Overview = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const { user } = useAuth();
  const { data: users = [], isLoading: usersLoading } = useAllUsers();
  const { data: jobs = [], isLoading: jobsLoading } = useJobs();
  const { data: stats } = useAdminStats();
  const queryClient = useQueryClient();

  const handleSeedJobs = async () => {
    if (!user?.id) return;
    setIsSeeding(true);
    const result = await fetchAndSeedJobs(user.id);
    if (result.success) {
      // Refresh the jobs list
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    }
    setIsSeeding(false);
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
    <div className="space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card hover-lift">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalUsers || 0}</div>
            <p className="text-xs text-muted-foreground mt-2">Registered users</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover-lift">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Talents</CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalTalents || 0}</div>
            <p className="text-xs text-muted-foreground mt-2">Talent profiles</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover-lift">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Jobs</CardTitle>
              <Briefcase className="h-5 w-5 text-info" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalJobs || 0}</div>
            <p className="text-xs text-muted-foreground mt-2">Job postings</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover-lift">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Applications</CardTitle>
              <Activity className="h-5 w-5 text-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalApplications || 0}</div>
            <p className="text-xs text-muted-foreground mt-2">Submissions</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button onClick={handleSeedJobs} disabled={isSeeding} variant="outline">
            {isSeeding ? 'Importing...' : 'Import Jobs from API'}
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Recent Users
            </CardTitle>
            <CardDescription>Latest users who joined</CardDescription>
          </CardHeader>
          <CardContent>
            {usersLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : (
              <div className="space-y-3">
                {users.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-smooth">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{user.full_name || 'Anonymous'}</h4>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((role) => (
                        <Badge key={role} variant="secondary" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Recent Jobs
            </CardTitle>
            <CardDescription>Latest job postings</CardDescription>
          </CardHeader>
          <CardContent>
            {jobsLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : (
              <div className="space-y-3">
                {jobs.slice(0, 5).map((job) => (
                  <div key={job.id} className="p-3 border rounded-lg hover:bg-accent/50 transition-smooth">
                    <p className="text-sm font-medium">{job.title}</p>
                    <p className="text-xs text-muted-foreground">{job.company}</p>
                    <p className="text-xs text-muted-foreground mt-1">{getTimeAgo(job.created_at)}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
