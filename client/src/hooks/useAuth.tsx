import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    role: "talent" | "recruiter"
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Axios defaults
axios.defaults.baseURL = "http://localhost:4000";

// Load token when axios runs
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ------------------ LOAD USER FROM TOKEN ------------------
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("/api/auth/me");
        setUser(res.data.user);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  // ------------------ SIGN IN ------------------
  const signIn = async (email: string, password: string) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });

      const { user, token } = res.data;

      localStorage.setItem("token", token);
      setUser(user);

      toast.success("Welcome back!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  // ------------------ SIGN UP ------------------
  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    role: "talent" | "recruiter"
  ) => {
    try {
      const res = await axios.post("/api/auth/register", {
        email,
        password,
        fullName,
        role,
      });

      const { user, token } = res.data;

      localStorage.setItem("token", token);
      setUser(user);

      toast.success("Account created!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  // ------------------ SIGN OUT ------------------
  const signOut = async () => {
    try {
      await axios.post("/api/auth/logout");
    } catch {}

    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
