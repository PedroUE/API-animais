import express from "express";
import {getAllAnimais, getAnimaisById, createAnimal, deleteAnimal, updateAnimais} from "../controller/animaisController.js"

const router = express.Router();

router.get("/", getAllAnimais);
router.get("/:id", getAnimaisById);
router.post("/", createAnimal);
router.delete("/:id", deleteAnimal);
router.put("/:id", updateAnimais);


export default router;