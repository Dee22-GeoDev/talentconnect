import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, userRole, signOut } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleDashboard = () => {
    if (userRole === 'admin') {
      navigate('/dashboard/admin');
    } else if (userRole === 'recruiter') {
      navigate('/dashboard/recruiter');
    } else {
      navigate('/dashboard/talent');
    }
  };

  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-hero">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">TalentConnect</span>
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/jobs">
              <Button 
                variant="ghost" 
                className={isActive("/jobs") ? "bg-accent" : ""}
              >
                Browse Jobs
              </Button>
            </Link>
            <Link to="/talents">
              <Button 
                variant="ghost"
                className={isActive("/talents") ? "bg-accent" : ""}
              >
                Browse Talents
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                variant="ghost"
                className={isActive("/about") ? "bg-accent" : ""}
              >
                About
              </Button>
            </Link>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="gradient-hero text-white">
                        {getInitials(user.email || '')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleDashboard}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      Sign In
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/auth?role=talent" className="cursor-pointer">
                        Sign In as Talent
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/auth?role=recruiter" className="cursor-pointer">
                        Sign In as Recruiter
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link to="/auth?mode=signup">
                  <Button variant="hero">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-2 slide-in">
            <Link to="/jobs" onClick={() => setIsMobileMenuOpen(false)}>
              <Button 
                variant="ghost" 
                className={cn("w-full justify-start", isActive("/jobs") ? "bg-accent" : "")}
              >
                Browse Jobs
              </Button>
            </Link>
            <Link to="/talents" onClick={() => setIsMobileMenuOpen(false)}>
              <Button 
                variant="ghost"
                className={cn("w-full justify-start", isActive("/talents") ? "bg-accent" : "")}
              >
                Browse Talents
              </Button>
            </Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
              <Button 
                variant="ghost"
                className={cn("w-full justify-start", isActive("/about") ? "bg-accent" : "")}
              >
                About
              </Button>
            </Link>
            <div className="border-t pt-2 space-y-2">
              {user ? (
                <>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => {
                      handleDashboard();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth?role=talent" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Sign In as Talent
                    </Button>
                  </Link>
                  <Link to="/auth?role=recruiter" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Sign In as Recruiter
                    </Button>
                  </Link>
                  <Link to="/auth?mode=signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="hero" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
