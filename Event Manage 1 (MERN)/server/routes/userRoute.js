import express from "express";
import multer from "multer";
import {
  createSponsor,
  getAllSponsors,
  updateSponsorById,
  deleteSponsorById,
  toggleActive1,
} from "../controller/sponserController.js";
import {
  createSpeaker,
  getAllSpeakers,
  updateSpeakerById,
  deleteSpeakerById,
  toggleActive4,
} from "../controller/speakerController.js";

import {
  createHotel,
  getAllHotels,
  updateHotelById,
  deleteHotelById,
} from "../controller/hotelController.js";

import {
  create,
  getAll,
  deleteUser,
  update,
  getOne,
} from "../controller/userController.js";

import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  toggleActive,
} from "../controller/blogController.js";

import {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
} from "../controller/vendorController.js";

import {
  createSubscription,
  getAllSubscriptions,
  updateSubscription,
  deleteSubscription,
} from "../controller/subscriptionController.js";

import { getTickets, createTicket, updateTicket, deleteTicket } from '../controller/ticketController.js';

import {
  createVenue,
  getAllVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
  toggleActive2,
  getActiveVenues,
} from "../controller/venueController.js";

import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "../controller/transactionController.js";

import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controller/eventController.js";

import { Signup } from "../controller/signupController.js";
import { SignIn } from "../controller/signinController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, "./public/assets/");
  },
  filename: function (req, file, cb) {
     cb(null, file.originalname);
  },
});

const upload = multer({ storage });


router.post("/create", create);
router.get("/getall", getAll);
router.delete("/delete/:id", deleteUser);
router.get("/getone/:id", getOne);
router.put("/update/:id", update);

router.post("/createblog", createBlog);
router.get("/getallblogs", getAllBlogs);
router.get("/getblogbyid/:id", getBlogById);
router.put("/updatebyid/:id", updateBlog);
router.delete("/deletebyid/:id", deleteBlog);
router.put("/toggleactive/:id", toggleActive);

router.post("/createvendor", createVendor);
router.get("/getallvendors", getAllVendors);
router.get("/getvendorsbyid/:id", getVendorById);
router.put("/updatevendorbyid/:id", updateVendor);
router.delete("/deletevendorbyid/:id", deleteVendor);

router.post("/createvenue", upload.single("image"),createVenue);
router.get("/getallvenues", getAllVenues);
router.get("/getvenuesbyid/:id", getVenueById);
router.put("/updatevenuesbyid/:id", upload.single("image"), updateVenue);
router.delete("/deletevenuesbyid/:id", deleteVenue);
router.put("/toggleactive2/:id", toggleActive2);
router.get('/getactivevenues', getActiveVenues);

router.post("/createsponsor", upload.single("image"), createSponsor);
router.get("/getallsponsors", getAllSponsors);
router.put("/updatesponsorbyid/:id", upload.single("image"), updateSponsorById);
router.delete("/deletesponsorbyid/:id", deleteSponsorById);
router.put("/toggleactive1/:id", toggleActive1);

router.post("/createspeaker", upload.single("image"), createSpeaker);
router.get("/getallspeakers", getAllSpeakers);
router.put("/updatespeakerbyid/:id", upload.single("image"), updateSpeakerById);
router.delete("/deletespeakerbyid/:id", deleteSpeakerById);
router.put("/toggleactive4/:id", toggleActive4);


router.post("/createhotel", upload.single("image"), createHotel);
router.get("/getallhotels", getAllHotels);
router.put("/updateHotelbyid/:id", upload.single("image"), updateHotelById);
router.delete("/deletehotelbyid/:id", deleteHotelById);


router.get('/getallsubscription', getAllSubscriptions);
router.post('/createsubscription', createSubscription);
router.put('/updatesubscription/:id', updateSubscription);
router.delete('/deletesubscription/:id', deleteSubscription);

router.get('/getalltickets', getTickets);
router.post('/createticket', createTicket);
router.put('/updateticket/:id', updateTicket);
router.delete('/deleteticket/:id', deleteTicket);

router.post("/createTransaction", createTransaction);
router.get("/getAllTransactions", getAllTransactions);
router.get("/getTransactionById/:id", getTransactionById);
router.put("/updateTransaction/:id", updateTransaction);
router.delete("/deleteTransaction/:id", deleteTransaction);

router.post("/createEvent", createEvent);
router.get("/getAllEvents", getAllEvents);
router.get("/getEventById/:id", getEventById);
router.put("/updateEvent/:id", updateEvent);
router.delete("/deleteEvent/:id", deleteEvent);

router.post("/signup", Signup);
router.post("/signin", SignIn);

export default router;
