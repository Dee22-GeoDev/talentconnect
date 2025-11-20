import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Users as UsersIcon } from "lucide-react";
import { useAllUsers, useUpdateUserRole, useRemoveUserRole } from "@/hooks/useAdmin";

const Users = () => {
  const { data: users = [], isLoading } = useAllUsers();
  const updateRole = useUpdateUserRole();
  const removeRole = useRemoveUserRole();

  const handleAddRole = async (userId: string, role: string) => {
    await updateRole.mutateAsync({ userId, role });
  };

  const handleRemoveRole = async (userId: string, role: string) => {
    await removeRole.mutateAsync({ userId, role });
  };

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
            <UsersIcon className="h-5 w-5" />
            User Management
          </CardTitle>
          <CardDescription>Manage platform users and their roles</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
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
                            <DropdownMenuItem 
                              className="text-destructive" 
                              onClick={() => handleRemoveRole(user.id, user.roles[0])}
                            >
                              Remove Role
                            </DropdownMenuItem>
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
    </div>
  );
};

export default Users;
