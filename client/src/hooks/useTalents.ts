import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export interface Talent {
  id: string;
  user_id: string;
  title: string;
  skills: string[];
  experience_years: number | null;
  bio: string | null;
  portfolio_url: string | null;
  resume_url: string | null;
  created_at: string;
  updated_at: string;
  profiles?: {
    full_name: string | null;
    email: string;
  };
}

// Base API URL
const API_BASE = 'http://localhost:4000/api'; // full backend URL

// ------------------ FETCH ALL TALENTS ------------------
export const useTalents = () => {
  return useQuery({
    queryKey: ['talents'],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/talents`);
      return res.data as Talent[];
    },
  });
};

// ------------------ FETCH MY TALENT PROFILE ------------------
export const useMyTalentProfile = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['my-talent-profile', userId],
    queryFn: async () => {
      if (!userId) return null;
      const res = await axios.get(`${API_BASE}/talents/${userId}`);
      return res.data as Talent | null;
    },
    enabled: !!userId,
  });
};

// ------------------ CREATE TALENT PROFILE ------------------
export const useCreateTalentProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (talent: Omit<Talent, 'id' | 'created_at' | 'updated_at' | 'profiles'>) => {
      const res = await axios.post(`${API_BASE}/talents`, talent);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['talents']);
      queryClient.invalidateQueries(['my-talent-profile']);
      toast.success('Profile created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create profile');
    },
  });
};

// ------------------ UPDATE TALENT PROFILE ------------------
export const useUpdateTalentProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Talent> & { id: string }) => {
      const res = await axios.put(`${API_BASE}/talents/${id}`, updates);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['talents']);
      queryClient.invalidateQueries(['my-talent-profile']);
      toast.success('Profile updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    },
  });
};
