import axios, { AxiosError } from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Base API URL
const API_BASE = import.meta.env.VITE_API_URL || 'https://talentconnect-deployment.onrender.com';

// Create axios instance with auth token
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Attach token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  type: string;
  salary_range: string | null;
  posted_by: string;
  created_at: string;
  updated_at: string;
}

/* ---------------------------
   GET ALL JOBS
---------------------------- */
export const useJobs = () => {
  return useQuery<Job[], Error>({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await api.get("/api/jobs");
      return res.data.jobs;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/* ---------------------------
   GET JOBS CREATED BY LOGGED IN USER
---------------------------- */
export const useMyJobs = () => {
  return useQuery<Job[], Error>({
    queryKey: ["my-jobs"],
    queryFn: async () => {
      const res = await api.get("/api/jobs/my");
      return res.data.jobs;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/* ---------------------------
   CREATE JOB
---------------------------- */
export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Job,
    AxiosError<{ message: string }>,
    Omit<Job, "id" | "created_at" | "updated_at">
  >({
    mutationFn: async (job) => {
      const res = await api.post("/api/jobs", job);
      return res.data.job;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
      toast.success("Job posted successfully!");
    },
    onError: (error) => {
      const errorMsg = error?.response?.data?.message || "Failed to create job";
      console.error("Create job error:", error);
      toast.error(errorMsg);
    },
  });
};

/* ---------------------------
   UPDATE JOB
---------------------------- */
export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Job,
    AxiosError<{ message: string }>,
    Partial<Job> & { id: string }
  >({
    mutationFn: async ({ id, ...updates }) => {
      const res = await api.put(`/api/jobs/${id}`, updates);
      return res.data.job;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
      toast.success("Job updated successfully!");
    },
    onError: (error) => {
      const errorMsg = error?.response?.data?.message || "Failed to update job";
      console.error("Update job error:", error);
      toast.error(errorMsg);
    },
  });
};

/* ---------------------------
   DELETE JOB
---------------------------- */
export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message: string }>, string>({
    mutationFn: async (id) => {
      await api.delete(`/api/jobs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
      toast.success("Job deleted successfully!");
    },
    onError: (error) => {
      const errorMsg = error?.response?.data?.message || "Failed to delete job";
      console.error("Delete job error:", error);
      toast.error(errorMsg);
    },
  });
};