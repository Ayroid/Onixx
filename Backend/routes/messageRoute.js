import express from "express";
import {
  CREATE_MESSAGE,
  READ_MESSAGE,
  UPDATE_MESSAGE,
  DELETE_MESSAGE,
} from "../controllers/messageController.js";
import { VERIFYTOKENMW } from "../middlewares/jwtAuthMW.js";

const messageRouter = express.Router();

messageRouter
  .route("/")
  .get(VERIFYTOKENMW, READ_MESSAGE)
  .post(VERIFYTOKENMW, CREATE_MESSAGE)
  .put(VERIFYTOKENMW, UPDATE_MESSAGE)
  .delete(VERIFYTOKENMW, DELETE_MESSAGE);

export { messageRouter as MESSAGE_ROUTER };
