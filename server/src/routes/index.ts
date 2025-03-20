import { Router } from "express";
import authRoutes from "./authRoute";
import serviceRoutes from "./serviceRoute";
import barberRoutes from "./barberRoute";
import profileRoutes from "./profileRoute";
import appointmentRoutes from "./appointmentRoute";
import testimonialRoutes from "./testimonialRoute";
import productRoutes from "./productRoute";
import cartRoutes from "./cartRoute";
import reportRoutes from "./reportRoute";
import customerRoutes from "./customerRoute";


const router = Router();

// Registrar todas las rutas en un solo objeto
router.use("/auth", authRoutes);
router.use("/service", serviceRoutes);
router.use("/barber", barberRoutes);
router.use("/profile", profileRoutes);
router.use("/testimonial", testimonialRoutes);
router.use("/appointment", appointmentRoutes);
router.use("/product", productRoutes);
router.use("/cart", cartRoutes);
router.use("/report", reportRoutes);
router.use("/customer", customerRoutes);

export default router;