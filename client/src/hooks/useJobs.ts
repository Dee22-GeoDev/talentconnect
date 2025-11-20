import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Axios defaults
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

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
  return useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await axios.get("/api/jobs");
      return res.data.jobs as Job[];
    },
  });
};

/* ---------------------------
   GET JOBS CREATED BY LOGGED IN USER
---------------------------- */
export const useMyJobs = () => {
  return useQuery({
    queryKey: ["my-jobs"],
    queryFn: async () => {
      const res = await axios.get("/api/jobs/my");
      return res.data.jobs as Job[];
    },
  });
};

/* ---------------------------
   CREATE JOB
---------------------------- */
export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      job: Omit<Job, "id" | "created_at" | "updated_at">
    ) => {
      const res = await axios.post("/api/jobs", job);
      return res.data.job;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
      toast.success("Job posted successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create job");
    },
  });
};

/* ---------------------------
   UPDATE JOB
---------------------------- */
export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Job> & { id: string }) => {
      const res = await axios.put(`/api/jobs/${id}`, updates);
      return res.data.job;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
      toast.success("Job updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update job");
    },
  });
};

/* ---------------------------
   DELETE JOB
---------------------------- */
export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/jobs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
      toast.success("Job deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete job");
    },
  });
};
