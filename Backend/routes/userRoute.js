import express from "express";
import {
  CREATE_USER,
  READ_USER,
  UPDATE_USER,
  DELETE_USER,
  LOGIN_USER,
} from "../controllers/userController.js";
import { VERIFYTOKENMW } from "../middlewares/jwtAuthMW.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .get(VERIFYTOKENMW, READ_USER)
  .put(VERIFYTOKENMW, UPDATE_USER)
  .delete(VERIFYTOKENMW, DELETE_USER);

userRouter.route("/register").post(CREATE_USER);
userRouter.route("/login").post(LOGIN_USER);

export { userRouter as USER_ROUTER };
