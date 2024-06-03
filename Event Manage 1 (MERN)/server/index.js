import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import Schema from "./models/userSchema.js";
import subscribeRoute from './routes/web/subscribe.js'
import subscriptionRoutes from './routes/userRoute.js';
import ticketRoutes from './routes/userRoute.js';
import venueRoutes from './routes/userRoute.js';

// import vendorRoutes from "./vendorRoute.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));



const app = express();
app.use(bodyParser.json());

app.use(cors());



// Routes
app.use('/api/subscribe', subscribeRoute);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/', ticketRoutes);
app.use('/api/venu', venueRoutes);

// Call the config method of dotenv to load environment variables
dotenv.config();
app.use("/assets", express.static(path.join(__dirname, "/")));
const PORT = process.env.PORT || 7000; // Use PORT instead of port
const URL = process.env.MONGOURL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));


  

app.use("/api", route);






