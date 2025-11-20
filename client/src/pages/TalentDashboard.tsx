import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMyApplications } from "@/hooks/useApplications";
import { useMyTalentProfile } from "@/hooks/useTalents";
import { useNavigate } from "react-router-dom";

const TalentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: applications = [], isLoading: appsLoading } = useMyApplications(user?.id);
  const { data: profile } = useMyTalentProfile(user?.id);

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
    <DashboardLayout role="talent">
      <div className="space-y-6 fade-in">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Welcome back!</h2>
          <p className="text-muted-foreground">Track your applications and discover new opportunities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.filter(a => a.status === 'pending').length}</div>
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Profile Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile ? '✓' : '○'}</div>
              <p className="text-xs text-muted-foreground mt-1">{profile ? 'Complete' : 'Incomplete'}</p>
            </CardContent>
          </Card>
        </div>

        {!profile && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Complete Your Profile
              </CardTitle>
              <CardDescription>Create your talent profile to increase visibility</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={() => navigate('/dashboard/talent/settings')}>
                Create Profile
              </Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Recent Applications
            </CardTitle>
            <CardDescription>Track the status of your job applications</CardDescription>
          </CardHeader>
          <CardContent>
            {appsLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : applications.length === 0 ? (
              <p className="text-muted-foreground">No applications yet</p>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold">{app.jobs?.title}</h4>
                      <p className="text-sm text-muted-foreground">{app.jobs?.company}</p>
                      <p className="text-xs text-muted-foreground mt-1">{getTimeAgo(app.created_at)}</p>
                    </div>
                    <Badge className={getStatusColor(app.status)} variant="secondary">
                      {app.status}
                    </Badge>
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

export default TalentDashboard;
