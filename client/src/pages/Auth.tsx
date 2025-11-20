import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Briefcase } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();

  const defaultTab =
    searchParams.get("mode") === "signup" ? "signup" : "login";

  const [userType, setUserType] = useState<"talent" | "recruiter">("talent");
  const [loading, setLoading] = useState(false);

  // ------------------ REDIRECT WHEN AUTHENTICATED ------------------
  useEffect(() => {
    if (user) {
      const role = user.role;

      if (role === "admin") {
        navigate("/dashboard/admin");
      } else if (role === "recruiter") {
        navigate("/dashboard/recruiter");
      } else {
        navigate("/dashboard/talent");
      }
    }
  }, [user, navigate]);

  // ------------------ LOGIN ------------------
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await signIn(email, password);
    setLoading(false);
  };

  // ------------------ SIGNUP ------------------
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("signup-email") as string;
    const password = formData.get("signup-password") as string;
    const fullName = formData.get("signup-name") as string;

    await signUp(email, password, fullName, userType);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-card">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg gradient-hero">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Welcome to TalentConnect</CardTitle>
            <CardDescription>
              Connect with opportunities or discover talented professionals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* ------------------ LOGIN TAB ------------------ */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="hero"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                  <div className="text-center text-sm text-muted-foreground">
                    <a href="#" className="hover:text-primary">
                      Forgot password?
                    </a>
                  </div>
                </form>
              </TabsContent>

              {/* ------------------ SIGNUP TAB ------------------ */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  {/* USER TYPE */}
                  <div className="space-y-2">
                    <Label htmlFor="signup-type">I am a...</Label>
                    <Select
                      value={userType}
                      onValueChange={(value) =>
                        setUserType(value as "talent" | "recruiter")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="talent">
                          Job Seeker / Talent
                        </SelectItem>
                        <SelectItem value="recruiter">
                          Recruiter / Employer
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* FULL NAME OR COMPANY */}
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">
                      {userType === "talent" ? "Full Name" : "Company Name"}
                    </Label>
                    <Input
                      id="signup-name"
                      name="signup-name"
                      type="text"
                      placeholder={
                        userType === "talent" ? "John Doe" : "Your Company"
                      }
                      required
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      name="signup-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    By signing up, you agree to our{" "}
                    <a href="#" className="hover:text-primary">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="hover:text-primary">
                      Privacy Policy
                    </a>
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
