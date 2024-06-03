// routes/vendorRoute.js

import express from "express";
import { createVendor } from "../controllers/vendorController.js";

const router = express.Router();

// Route to handle the creation of a vendor
router.post("/vendors", createVendor);

export default router;
    