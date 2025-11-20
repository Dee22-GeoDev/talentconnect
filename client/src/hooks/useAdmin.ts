import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export interface UserWithRoles {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  roles: string[];
}

const API_BASE = '/api'; // replace with your backend URL if different

// Fetch all users with their roles
export const useAllUsers = () => {
  return useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/users`);
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json() as Promise<UserWithRoles[]>;
    },
  });
};

// Add a role to a user
export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      const res = await fetch(`${API_BASE}/users/${userId}/roles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to add role');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-users'] });
      toast.success('Role added successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to add role');
    },
  });
};

// Remove a role from a user
export const useRemoveUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      const res = await fetch(`${API_BASE}/users/${userId}/roles/${role}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to remove role');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-users'] });
      toast.success('Role removed successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to remove role');
    },
  });
};

// Fetch admin stats
export const useAdminStats = () => {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/admin/stats`);
      if (!res.ok) throw new Error('Failed to fetch admin stats');
      return res.json() as Promise<{
        totalUsers: number;
        totalJobs: number;
        totalApplications: number;
        totalTalents: number;
      }>;
    },
  });
};
