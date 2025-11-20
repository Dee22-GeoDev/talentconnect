import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useMyTalentProfile, useCreateTalentProfile, useUpdateTalentProfile } from "@/hooks/useTalents";
import { Settings as SettingsIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

const profileSchema = z.object({
  title: z.string().min(1, "Professional title is required").max(100, "Title must be less than 100 characters"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional().nullable(),
  skills: z.string().min(1, "At least one skill is required"),
  experience_years: z.number().min(0, "Experience years must be positive").max(50, "Experience years must be realistic").optional().nullable(),
  portfolio_url: z.string().url("Must be a valid URL").optional().or(z.literal('')).nullable(),
  resume_url: z.string().url("Must be a valid URL").optional().or(z.literal('')).nullable(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const Settings = () => {
  const { user } = useAuth();
  const { data: profile, isLoading: profileLoading } = useMyTalentProfile(user?.id);
  const createProfile = useCreateTalentProfile();
  const updateProfile = useUpdateTalentProfile();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (profile) {
      reset({
        title: profile.title,
        bio: profile.bio || '',
        skills: profile.skills?.join(', ') || '',
        experience_years: profile.experience_years || undefined,
        portfolio_url: profile.portfolio_url || '',
        resume_url: profile.resume_url || '',
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!user?.id) return;

    const skillsArray = data.skills.split(',').map(s => s.trim()).filter(Boolean);
    
    const profileData = {
      user_id: user.id,
      title: data.title,
      bio: data.bio || null,
      skills: skillsArray,
      experience_years: data.experience_years || null,
      portfolio_url: data.portfolio_url || null,
      resume_url: data.resume_url || null,
    };

    if (profile) {
      await updateProfile.mutateAsync({ id: profile.id, ...profileData });
    } else {
      await createProfile.mutateAsync(profileData);
    }
  };

  return (
    <DashboardLayout role="talent">
      <div className="space-y-6 fade-in">
        <div>
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              {profile ? 'Update your profile details' : 'Create your talent profile to get discovered by recruiters'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={user?.email || ''} 
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Professional Title *</Label>
                <Input 
                  id="title" 
                  placeholder="e.g. Senior Software Engineer"
                  {...register('title')}
                />
                {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience_years">Years of Experience</Label>
                <Input 
                  id="experience_years" 
                  type="number"
                  placeholder="e.g. 5"
                  {...register('experience_years', { valueAsNumber: true })}
                />
                {errors.experience_years && <p className="text-sm text-destructive">{errors.experience_years.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Tell recruiters about yourself, your experience, and what you're looking for"
                  rows={4}
                  {...register('bio')}
                />
                {errors.bio && <p className="text-sm text-destructive">{errors.bio.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma separated) *</Label>
                <Input 
                  id="skills" 
                  placeholder="e.g. React, TypeScript, Node.js"
                  {...register('skills')}
                />
                {errors.skills && <p className="text-sm text-destructive">{errors.skills.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolio_url">Portfolio URL</Label>
                <Input 
                  id="portfolio_url" 
                  type="url"
                  placeholder="https://your-portfolio.com"
                  {...register('portfolio_url')}
                />
                {errors.portfolio_url && <p className="text-sm text-destructive">{errors.portfolio_url.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="resume_url">Resume URL</Label>
                <Input 
                  id="resume_url" 
                  type="url"
                  placeholder="https://your-resume.pdf"
                  {...register('resume_url')}
                />
                {errors.resume_url && <p className="text-sm text-destructive">{errors.resume_url.message}</p>}
              </div>

              <Button type="submit" disabled={isSubmitting || profileLoading}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {profile ? 'Save Changes' : 'Create Profile'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>Manage how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Job Recommendations</p>
                <p className="text-sm text-muted-foreground">Get notified of matching jobs</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Application Updates</p>
                <p className="text-sm text-muted-foreground">Status changes on your applications</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Messages</p>
                <p className="text-sm text-muted-foreground">Get notified of new messages</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
