import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useCreateJob } from "@/hooks/useJobs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

const jobSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters"),
  company: z.string().trim().min(2, "Company name must be at least 2 characters").max(100, "Company name must be less than 100 characters"),
  location: z.string().trim().min(2, "Location must be at least 2 characters").max(100, "Location must be less than 100 characters"),
  type: z.string().min(1, "Please select a job type"),
  description: z.string().trim().min(50, "Description must be at least 50 characters").max(5000, "Description must be less than 5000 characters"),
  salary_range: z.string().trim().max(50, "Salary range must be less than 50 characters").optional(),
});

const PostJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const createJob = useCreateJob();
  
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    description: "",
    salary_range: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      toast.error("You must be logged in to post a job");
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data
      const validatedData = jobSchema.parse(formData);
      
      // Create job
      await createJob.mutateAsync({
        title: validatedData.title,
        company: validatedData.company,
        location: validatedData.location,
        type: validatedData.type,
        description: validatedData.description,
        salary_range: validatedData.salary_range || null,
        posted_by: user.id,
      });

      // Reset form and navigate
      setFormData({
        title: "",
        company: "",
        location: "",
        type: "",
        description: "",
        salary_range: "",
      });
      
      navigate("/dashboard/recruiter/jobs");
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error("Please fix the errors in the form");
      } else {
        toast.error("Failed to post job. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout role="recruiter">
      <div className="space-y-6 fade-in max-w-3xl">
        <div>
          <h2 className="text-2xl font-bold">Post a New Job</h2>
          <p className="text-muted-foreground">Fill in the details to create a new job listing</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Job Details
            </CardTitle>
            <CardDescription>Provide comprehensive information to attract the right candidates</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g. Senior Software Engineer"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  placeholder="e.g. Tech Corp Inc."
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  className={errors.company ? "border-destructive" : ""}
                />
                {errors.company && <p className="text-sm text-destructive">{errors.company}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g. New York, NY or Remote"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className={errors.location ? "border-destructive" : ""}
                  />
                  {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Job Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleChange("type", value)}
                  >
                    <SelectTrigger className={errors.type ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary_range">Salary Range (Optional)</Label>
                <Input
                  id="salary_range"
                  placeholder="e.g. $80,000 - $120,000"
                  value={formData.salary_range}
                  onChange={(e) => handleChange("salary_range", e.target.value)}
                  className={errors.salary_range ? "border-destructive" : ""}
                />
                {errors.salary_range && <p className="text-sm text-destructive">{errors.salary_range}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role, responsibilities, requirements, and benefits..."
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={10}
                  className={errors.description ? "border-destructive" : ""}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.description.length} / 5000 characters (minimum 50 required)
                </p>
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Posting..." : "Post Job"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/dashboard/recruiter/jobs")}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PostJob;
