import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  MessageSquare, 
  Settings,
  BookmarkIcon,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "talent" | "recruiter" | "admin";
}

const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { signOut } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  const talentLinks = [
    { path: "/dashboard/talent", label: "Dashboard", icon: LayoutDashboard },
    { path: "/jobs", label: "Browse Jobs", icon: Briefcase },
    { path: "/dashboard/talent/saved", label: "Saved Jobs", icon: BookmarkIcon },
    { path: "/dashboard/talent/messages", label: "Messages", icon: MessageSquare },
    { path: "/dashboard/talent/settings", label: "Settings", icon: Settings },
  ];

  const recruiterLinks = [
    { path: "/dashboard/recruiter", label: "Dashboard", icon: LayoutDashboard },
    { path: "/talents", label: "Browse Talents", icon: Users },
    { path: "/dashboard/recruiter/jobs", label: "My Jobs", icon: Briefcase },
    { path: "/dashboard/recruiter/messages", label: "Messages", icon: MessageSquare },
    { path: "/dashboard/recruiter/settings", label: "Settings", icon: Settings },
  ];

  const adminLinks = [
    { path: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/dashboard/admin/users", label: "Users", icon: Users },
    { path: "/dashboard/admin/jobs", label: "Jobs", icon: Briefcase },
    { path: "/dashboard/admin/messages", label: "Messages", icon: MessageSquare },
    { path: "/dashboard/admin/settings", label: "Settings", icon: Settings },
  ];

  const links = role === "talent" ? talentLinks : role === "recruiter" ? recruiterLinks : adminLinks;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-sidebar transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col border-r border-sidebar-border">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-sidebar-foreground">TalentConnect</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive(link.path)
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="border-t border-sidebar-border p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50"
              onClick={() => signOut()}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-card px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-foreground capitalize">
              {role} Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-background p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
