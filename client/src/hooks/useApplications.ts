import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export interface Application {
  id: string;
  job_id: string;
  applicant_id: string;
  status: string;
  cover_letter: string | null;
  created_at: string;
  updated_at: string;
  jobs?: {
    title: string;
    company: string;
    location: string;
  };
  profiles?: {
    full_name: string | null;
    email: string;
  };
}

const API_BASE = '/api'; // replace with your backend URL if different

export const useMyApplications = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['my-applications', userId],
    queryFn: async () => {
      if (!userId) return [];

      const res = await fetch(`${API_BASE}/applications/user/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch your applications');
      return res.json() as Promise<Application[]>;
    },
    enabled: !!userId,
  });
};

export const useJobApplications = (jobId: string | undefined) => {
  return useQuery({
    queryKey: ['job-applications', jobId],
    queryFn: async () => {
      if (!jobId) return [];

      const res = await fetch(`${API_BASE}/applications/job/${jobId}`);
      if (!res.ok) throw new Error('Failed to fetch job applications');
      return res.json() as Promise<Application[]>;
    },
    enabled: !!jobId,
  });
};

export const useRecruiterApplications = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['recruiter-applications', userId],
    queryFn: async () => {
      if (!userId) return [];

      const res = await fetch(`${API_BASE}/applications/recruiter/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch recruiter applications');
      return res.json() as Promise<Application[]>;
    },
    enabled: !!userId,
  });
};

export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (application: { job_id: string; applicant_id: string; cover_letter?: string }) => {
      const res = await fetch(`${API_BASE}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(application),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to submit application');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-applications'] });
      queryClient.invalidateQueries({ queryKey: ['job-applications'] });
      toast.success('Application submitted successfully!');
    },
    onError: (error: any) => {
      if (error.message?.includes('duplicate')) {
        toast.error('You have already applied to this job');
      } else {
        toast.error(error.message || 'Failed to submit application');
      }
    },
  });
};

export const useUpdateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch(`${API_BASE}/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to update application');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-applications'] });
      queryClient.invalidateQueries({ queryKey: ['job-applications'] });
      queryClient.invalidateQueries({ queryKey: ['recruiter-applications'] });
      toast.success('Application status updated!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update application');
    },
  });
};

export const useDeleteApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_BASE}/applications/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to withdraw application');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-applications'] });
      toast.success('Application withdrawn successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to withdraw application');
    },
  });
};
