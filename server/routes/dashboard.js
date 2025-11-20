import express from "express";
import {
  getTalentDashboard,
  getSavedJobs,
  getTalentMessages,
  updateTalentSettings,
  getRecruiterDashboard,
  getRecruiterJobs,
  postRecruiterJob,
  getRecruiterMessages,
  updateRecruiterSettings,
  getAdminOverview,
  getAllUsers,
  getAllJobs,
  getAdminMessages,
  updateAdminSettings,
} from "../controllers/dashboardController";

const router = express.Router();

// Talent
router.get("/talent", getTalentDashboard);
router.get("/talent/saved", getSavedJobs);
router.get("/talent/messages", getTalentMessages);
router.put("/talent/settings", updateTalentSettings);

// Recruiter
router.get("/recruiter", getRecruiterDashboard);
router.get("/recruiter/jobs", getRecruiterJobs);
router.post("/recruiter/jobs", postRecruiterJob);
router.get("/recruiter/messages", getRecruiterMessages);
router.put("/recruiter/settings", updateRecruiterSettings);

// Admin
router.get("/admin", getAdminOverview);
router.get("/admin/users", getAllUsers);
router.get("/admin/jobs", getAllJobs);
router.get("/admin/messages", getAdminMessages);
router.put("/admin/settings", updateAdminSettings);

export default router;
