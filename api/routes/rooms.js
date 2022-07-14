import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/:hotelid/", verifyAdmin, createRoom); // only admin can create hotel

// UPDATE
router.put("/:id", verifyAdmin, updateRoom); // only admin can update hotel
router.put("/availability/:id", updateRoomAvailability); // only admin can update hotel

// DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom); // only admin can delete hotel

//GET
router.get("/:id", getRoom);

//GET ALL
router.get("/", getRooms);

export default router;
