import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_BASE = "/api/dashboard";

// ---------------- Talent ----------------
export const useTalentDashboard = () => {
  return useQuery(["talent-dashboard"], () =>
    fetch(`${API_BASE}/talent`).then((res) => res.json())
  );
};

export const useTalentSavedJobs = () => {
  return useQuery(["talent-saved-jobs"], () =>
    fetch(`${API_BASE}/talent/saved`).then((res) => res.json())
  );
};

export const useTalentMessages = () => {
  return useQuery(["talent-messages"], () =>
    fetch(`${API_BASE}/talent/messages`).then((res) => res.json())
  );
};

export const useUpdateTalentSettings = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (updates: any) =>
      fetch(`${API_BASE}/talent/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      }).then((res) => res.json()),
    {
      onSuccess: () => queryClient.invalidateQueries(["talent-dashboard"]),
    }
  );
};

// ---------------- Recruiter ----------------
export const useRecruiterDashboard = () => {
  return useQuery(["recruiter-dashboard"], () =>
    fetch(`${API_BASE}/recruiter`).then((res) => res.json())
  );
};

export const useRecruiterJobs = () => {
  return useQuery(["recruiter-jobs"], () =>
    fetch(`${API_BASE}/recruiter/jobs`).then((res) => res.json())
  );
};

export const usePostRecruiterJob = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (job: any) =>
      fetch(`${API_BASE}/recruiter/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job),
      }).then((res) => res.json()),
    {
      onSuccess: () => queryClient.invalidateQueries(["recruiter-jobs"]),
    }
  );
};

export const useRecruiterMessages = () => {
  return useQuery(["recruiter-messages"], () =>
    fetch(`${API_BASE}/recruiter/messages`).then((res) => res.json())
  );
};

export const useUpdateRecruiterSettings = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (updates: any) =>
      fetch(`${API_BASE}/recruiter/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      }).then((res) => res.json()),
    {
      onSuccess: () => queryClient.invalidateQueries(["recruiter-dashboard"]),
    }
  );
};

// ---------------- Admin ----------------
export const useAdminOverview = () => {
  return useQuery(["admin-overview"], () =>
    fetch(`${API_BASE}/admin`).then((res) => res.json())
  );
};

export const useAdminUsers = () => {
  return useQuery(["admin-users"], () =>
    fetch(`${API_BASE}/admin/users`).then((res) => res.json())
  );
};

export const useAdminJobs = () => {
  return useQuery(["admin-jobs"], () =>
    fetch(`${API_BASE}/admin/jobs`).then((res) => res.json())
  );
};

export const useAdminMessages = () => {
  return useQuery(["admin-messages"], () =>
    fetch(`${API_BASE}/admin/messages`).then((res) => res.json())
  );
};

export const useUpdateAdminSettings = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (updates: any) =>
      fetch(`${API_BASE}/admin/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      }).then((res) => res.json()),
    {
      onSuccess: () => queryClient.invalidateQueries(["admin-overview"]),
    }
  );
};
