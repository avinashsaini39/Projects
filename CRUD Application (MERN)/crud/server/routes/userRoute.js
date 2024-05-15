import express from 'express';
import {create, deleteUser, getAll, getOne, searchUsers, update} from '../controller/userController.js';


const route = express.Router();

route.post("/create", create);
route.get("/getAll", getAll);
route.get("/getOne/:id", getOne);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteUser);
route.get("/search", searchUsers);



export default route;
