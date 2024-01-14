import express from "express";
import { VERIFY_TOKEN, REFRESH_TOKEN } from "../controllers/tokenController.js";

const tokenRouter = express.Router();

tokenRouter.route("/verify").get(VERIFY_TOKEN);
tokenRouter.route("/refresh").get(REFRESH_TOKEN);

export { tokenRouter as TOKEN_ROUTER };
