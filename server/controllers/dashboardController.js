import { Request, Response } from "express";

// ---------------- Talent ----------------
export const getTalentDashboard = async (req: Request, res: Response) => {
  // Fetch talent profile, applied jobs, stats
  const talentId = req.user.id; // assuming auth middleware
  res.json({ message: "Talent Dashboard Data", talentId });
};

export const getSavedJobs = async (req: Request, res: Response) => {
  const talentId = req.user.id;
  // fetch saved jobs from DB
  res.json([{ id: "job1", title: "Frontend Developer" }]);
};

export const getTalentMessages = async (req: Request, res: Response) => {
  const talentId = req.user.id;
  // fetch messages
  res.json([{ from: "Recruiter", content: "Hello!" }]);
};

export const updateTalentSettings = async (req: Request, res: Response) => {
  const talentId = req.user.id;
  const updates = req.body;
  // update in DB
  res.json({ message: "Settings updated", updates });
};

// ---------------- Recruiter ----------------
export const getRecruiterDashboard = async (req: Request, res: Response) => {
  const recruiterId = req.user.id;
  res.json({ message: "Recruiter Dashboard", recruiterId });
};

export const getRecruiterJobs = async (req: Request, res: Response) => {
  const recruiterId = req.user.id;
  res.json([{ id: "job1", title: "Backend Developer" }]);
};

export const postRecruiterJob = async (req: Request, res: Response) => {
  const recruiterId = req.user.id;
  const job = req.body;
  // insert job in DB
  res.json({ message: "Job posted successfully", job });
};

export const getRecruiterMessages = async (req: Request, res: Response) => {
  const recruiterId = req.user.id;
  res.json([{ from: "Talent", content: "I applied to your job" }]);
};

export const updateRecruiterSettings = async (req: Request, res: Response) => {
  const recruiterId = req.user.id;
  const updates = req.body;
  res.json({ message: "Settings updated", updates });
};

// ---------------- Admin ----------------
export const getAdminOverview = async (req: Request, res: Response) => {
  // Fetch counts for users, jobs, applications, messages
  res.json({
    totalUsers: 100,
    totalJobs: 50,
    totalApplications: 200,
    totalMessages: 150,
  });
};

export const getAllUsers = async (req: Request, res: Response) => {
  res.json([{ id: "user1", email: "user@example.com", roles: ["talent"] }]);
};

export const getAllJobs = async (req: Request, res: Response) => {
  res.json([{ id: "job1", title: "Frontend Developer" }]);
};

export const getAdminMessages = async (req: Request, res: Response) => {
  res.json([{ from: "Talent", content: "Message to admin" }]);
};

export const updateAdminSettings = async (req: Request, res: Response) => {
  const updates = req.body;
  res.json({ message: "Admin settings updated", updates });
};
