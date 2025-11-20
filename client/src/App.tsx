import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Talents from "./pages/Talents";
import About from "./pages/About";
import Auth from "./pages/Auth";

// Talent pages
import TalentDashboard from "./pages/TalentDashboard";
import TalentSavedJobs from "./pages/talent/SavedJobs";
import TalentMessages from "./pages/talent/Messages";
import TalentSettings from "./pages/talent/Settings";

// Recruiter pages
import RecruiterDashboard from "./pages/RecruiterDashboard";
import RecruiterMyJobs from "./pages/recruiter/MyJobs";
import RecruiterPostJob from "./pages/recruiter/PostJob";
import RecruiterMessages from "./pages/recruiter/Messages";
import RecruiterSettings from "./pages/recruiter/Settings";

// Admin wrapper pages
import AdminOverviewPage from "./pages/admin/AdminOverviewPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminJobsPage from "./pages/admin/AdminJobsPage";
import AdminMessagesPage from "./pages/admin/AdminMessagesPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/talents" element={<Talents />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />

            {/* Talent Dashboard */}
            <Route path="/dashboard/talent" element={<TalentDashboard />} />
            <Route path="/dashboard/talent/saved" element={<TalentSavedJobs />} />
            <Route path="/dashboard/talent/messages" element={<TalentMessages />} />
            <Route path="/dashboard/talent/settings" element={<TalentSettings />} />

            {/* Recruiter Dashboard */}
            <Route path="/dashboard/recruiter" element={<RecruiterDashboard />} />
            <Route path="/dashboard/recruiter/jobs" element={<RecruiterMyJobs />} />
            <Route path="/dashboard/recruiter/jobs/new" element={<RecruiterPostJob />} />
            <Route path="/dashboard/recruiter/messages" element={<RecruiterMessages />} />
            <Route path="/dashboard/recruiter/settings" element={<RecruiterSettings />} />

            {/* Admin Dashboard (wrapped properly) */}
            <Route path="/dashboard/admin" element={<AdminOverviewPage />} />
            <Route path="/dashboard/admin/users" element={<AdminUsersPage />} />
            <Route path="/dashboard/admin/jobs" element={<AdminJobsPage />} />
            <Route path="/dashboard/admin/messages" element={<AdminMessagesPage />} />
            <Route path="/dashboard/admin/settings" element={<AdminSettingsPage />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
