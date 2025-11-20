import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";
import { fetchAndSeedJobs } from "@/utils/seedJobs";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Briefcase,
  TrendingUp,
  Activity,
  Shield,
  CheckCircle,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAllUsers, useUpdateUserRole, useRemoveUserRole, useAdminStats } from "@/hooks/useAdmin";
import { useJobs } from "@/hooks/useJobs";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSeeding, setIsSeeding] = useState(false);
  const { user } = useAuth();
  const { data: users = [], isLoading: usersLoading } = useAllUsers();
  const { data: jobs = [], isLoading: jobsLoading } = useJobs();
  const { data: stats } = useAdminStats();
  const updateRole = useUpdateUserRole();
  const removeRole = useRemoveUserRole();

  const handleSeedJobs = async () => {
    if (!user?.id) return;
    setIsSeeding(true);
    await fetchAndSeedJobs(user.id);
    setIsSeeding(false);
  };

  const handleAddRole = async (userId: string, role: string) => {
    await updateRole.mutateAsync({ userId, role });
  };

  const handleRemoveRole = async (userId: string, role: string) => {
    await removeRole.mutateAsync({ userId, role });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success/10 text-success border-success/20";
      case "Pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "Under Review":
        return "bg-info/10 text-info border-info/20";
      default:
        return "bg-muted text-muted-foreground";
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
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Platform Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="shadow-card hover-lift scale-in">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
                <Users className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats?.totalUsers || 0}</div>
              <p className="text-xs text-muted-foreground mt-2">Registered on platform</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover-lift scale-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Talents</CardTitle>
                <Users className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats?.totalTalents || 0}</div>
              <p className="text-xs text-muted-foreground mt-2">Talent profiles created</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover-lift scale-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Jobs</CardTitle>
                <Briefcase className="h-5 w-5 text-info" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats?.totalJobs || 0}</div>
              <p className="text-xs text-muted-foreground mt-2">Job postings</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover-lift scale-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Applications</CardTitle>
                <Activity className="h-5 w-5 text-warning" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats?.totalApplications || 0}</div>
              <p className="text-xs text-muted-foreground mt-2">Total submissions</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover-lift scale-in" style={{ animationDelay: '0.4s' }}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Platform Health</CardTitle>
                <Shield className="h-5 w-5 text-success" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="text-lg font-bold text-success">Excellent</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="jobs">Job Management</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Recent Users
                  </CardTitle>
                  <CardDescription>Latest users who joined the platform</CardDescription>
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
                    <Briefcase className="h-5 w-5 text-info" />
                    Recent Job Postings
                  </CardTitle>
                  <CardDescription>Latest jobs posted on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  {jobsLoading ? (
                    <p className="text-muted-foreground">Loading...</p>
                  ) : (
                    <div className="space-y-3">
                      {jobs.slice(0, 5).map((job) => (
                        <div key={job.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-smooth">
                          <div className="flex-1">
                            <p className="text-sm font-medium">{job.title}</p>
                            <p className="text-xs text-muted-foreground">{job.company}</p>
                            <p className="text-xs text-muted-foreground mt-1">{getTimeAgo(job.created_at)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="fade-in">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Management
                </CardTitle>
                <CardDescription>Manage platform users and their roles</CardDescription>
              </CardHeader>
              <CardContent>
                {usersLoading ? (
                  <p className="text-muted-foreground">Loading users...</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Roles</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id} className="hover:bg-accent/50 transition-smooth">
                          <TableCell className="font-medium">{user.full_name || 'Anonymous'}</TableCell>
                          <TableCell className="text-muted-foreground">{user.email}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {user.roles.map((role) => (
                                <Badge key={role} variant="secondary" className="text-xs">
                                  {role}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{getTimeAgo(user.created_at)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="hover:bg-accent">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleAddRole(user.id, 'admin')}>
                                  Add Admin Role
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAddRole(user.id, 'recruiter')}>
                                  Add Recruiter Role
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAddRole(user.id, 'talent')}>
                                  Add Talent Role
                                </DropdownMenuItem>
                                {user.roles.length > 0 && (
                                  <>
                                    <DropdownMenuItem className="text-destructive" onClick={() => handleRemoveRole(user.id, user.roles[0])}>
                                      Remove Role
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Job Management Tab */}
          <TabsContent value="jobs" className="fade-in">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Job Postings Management
                    </CardTitle>
                    <CardDescription>Monitor and manage all job postings on the platform</CardDescription>
                  </div>
                  <Button 
                    onClick={handleSeedJobs} 
                    disabled={isSeeding}
                    variant="outline"
                    size="sm"
                  >
                    {isSeeding ? 'Importing...' : 'Import Jobs from API'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {jobsLoading ? (
                  <p className="text-muted-foreground">Loading jobs...</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Type</TableHead>
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
                          <TableCell className="text-sm text-muted-foreground">{getTimeAgo(job.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
