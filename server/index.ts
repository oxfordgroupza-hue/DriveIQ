import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { getSlots, postSignup } from "./routes/signup";
import { sendWhatsAppOtp, verifyWhatsAppOtp, sendSmsOtp, verifySmsOtp, sendEmailOtp, verifyEmailOtp } from "./routes/otp";
import { sendVisionLink, getVisionToken, submitVisionResult, getVisionDoc } from "./routes/vision";
import { getUser, confirmPayment } from "./routes/user";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // DriveIQ Early Bird
  app.get("/api/slots", getSlots);
  app.post("/api/signup", postSignup);

  // OTP endpoints (demo/dev)
  app.post("/api/send-whatsapp-otp", sendWhatsAppOtp);
  app.post("/api/verify-whatsapp-otp", verifyWhatsAppOtp);
  app.post("/api/send-sms-otp", sendSmsOtp);
  app.post("/api/verify-sms-otp", verifySmsOtp);
  app.post("/api/send-email-otp", sendEmailOtp);
  app.post("/api/verify-email-otp", verifyEmailOtp);

  // User/profile
  app.get("/api/user", getUser);
  app.post("/api/confirm-payment", confirmPayment);

  // Vision testing
  app.post("/api/send-vision-link", sendVisionLink);
  app.get("/api/vision-token/:token", getVisionToken);
  app.post("/api/vision-submit", submitVisionResult);
  app.get("/api/vision-doc/:email/:type", getVisionDoc);

  return app;
}
