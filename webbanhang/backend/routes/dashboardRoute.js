import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import adminAuth from "../middleware/adminAuth.js";

const dashboardRouter = express.Router();

// Route để lấy thống kê dashboard (chỉ admin)
dashboardRouter.get("/stats", adminAuth, getDashboardStats);

export default dashboardRouter;
