
import express from "express"
import multer from "multer"
import { createCard, getCardById } from "../controllers/cardController.js";
const storage = multer.diskStorage({
  destination: "./upload/",
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
});
const cardRouter=express.Router()

cardRouter.post("/createCard",upload.fields([{ name: 'file', maxCount: 5 }]),createCard)
cardRouter.get('/getCard/:cardId', getCardById);

export {cardRouter}