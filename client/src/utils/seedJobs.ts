import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface RemoteJob {
  id: number;
  title: string;
  company_name: string;
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary?: string;
  description: string;
}

export const fetchAndSeedJobs = async (adminUserId: string) => {
  try {
    console.log('Starting job import from Remotive API...');
    toast.loading('Fetching jobs from API...');
    
    // Fetch jobs from Remotive API (free, no API key required)
    const response = await fetch('https://remotive.com/api/remote-jobs?limit=20');
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('Received data from API:', data);
    
    if (!data.jobs || !Array.isArray(data.jobs)) {
      throw new Error('Invalid response format from API');
    }
    
    const jobs = data.jobs as RemoteJob[];
    console.log(`Found ${jobs.length} jobs to import`);

    if (jobs.length === 0) {
      toast.error('No jobs found to import');
      return { success: false, error: 'No jobs available' };
    }

    // Transform and insert jobs into database
    const jobsToInsert = jobs.map(job => ({
      title: job.title,
      company: job.company_name,
      description: job.description.substring(0, 500) + '...', // Truncate long descriptions
      location: job.candidate_required_location || 'Remote',
      type: job.job_type || 'Full-time',
      salary_range: job.salary || 'Competitive',
      posted_by: adminUserId,
    }));

    console.log('Inserting jobs into database...');
    const { error } = await supabase
      .from('jobs')
      .insert(jobsToInsert);

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log('Jobs imported successfully!');
    toast.dismiss();
    toast.success(`Successfully imported ${jobs.length} jobs!`);
    return { success: true, count: jobs.length };
  } catch (error: any) {
    console.error('Error seeding jobs:', error);
    toast.dismiss();
    toast.error('Failed to import jobs: ' + error.message);
    return { success: false, error: error.message };
  }
};
