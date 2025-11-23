import axios, { AxiosError } from 'axios';
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

// ------------------ FETCH ALL TALENTS ------------------
export const useTalents = () => {
  return useQuery<Talent[], Error>({
    queryKey: ['talents'],
    queryFn: async () => {
      const res = await api.get('/api/talents');
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// ------------------ FETCH MY TALENT PROFILE ------------------
export const useMyTalentProfile = (userId: string | undefined) => {
  return useQuery<Talent | null, Error>({
    queryKey: ['my-talent-profile', userId],
    queryFn: async () => {
      if (!userId) return null;
      const res = await api.get(`/api/talents/${userId}`);
      return res.data;
    },
    enabled: !!userId,
    retry: 1,
  });
};

// ------------------ CREATE TALENT PROFILE ------------------
export const useCreateTalentProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Talent,
    AxiosError<{ message: string }>,
    Omit<Talent, 'id' | 'created_at' | 'updated_at' | 'profiles'>
  >({
    mutationFn: async (talent) => {
      const res = await api.post('/api/talents', talent);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['talents'] });
      queryClient.invalidateQueries({ queryKey: ['my-talent-profile'] });
      toast.success('Profile created successfully!');
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.message || 'Failed to create profile';
      console.error('Create profile error:', error);
      toast.error(errorMsg);
    },
  });
};

// ------------------ UPDATE TALENT PROFILE ------------------
export const useUpdateTalentProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Talent,
    AxiosError<{ message: string }>,
    Partial<Talent> & { id: string }
  >({
    mutationFn: async ({ id, ...updates }) => {
      const res = await api.put(`/api/talents/${id}`, updates);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['talents'] });
      queryClient.invalidateQueries({ queryKey: ['my-talent-profile'] });
      toast.success('Profile updated successfully!');
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.message || 'Failed to update profile';
      console.error('Update profile error:', error);
      toast.error(errorMsg);
    },
  });
};

// ------------------ DELETE TALENT PROFILE ------------------
export const useDeleteTalentProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message: string }>, string>({
    mutationFn: async (id) => {
      await api.delete(`/api/talents/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['talents'] });
      queryClient.invalidateQueries({ queryKey: ['my-talent-profile'] });
      toast.success('Profile deleted successfully!');
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.message || 'Failed to delete profile';
      console.error('Delete profile error:', error);
      toast.error(errorMsg);
    },
  });
};