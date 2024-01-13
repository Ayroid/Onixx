import dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";
import { genSalt, hash } from "bcrypt";
import { USERMESSAGES } from "../config/messages.js";

// CONSTANTS
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const fields = {
  _id: 0,
  __v: 0,
  password: 0,
  created_at: 0,
  updated_at: 0,
};

// DATABASE CONTROLLERS

import {
  CREATE_USER_DB,
  READ_USER_DB,
  UPDATE_USER_DB,
  DELETE_USER_DB,
} from "./database/userDatabase.js";

// CONTROLLERS

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const query = { email: email };

    const salt = await genSalt(SALT_ROUNDS);
    const hashedPassword = await hash(password, salt);

    const userExists = await READ_USER_DB(query);
    if (userExists.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .send(USERMESSAGES.USER_ALREADY_EXISTS);
    }

    const user = await CREATE_USER_DB({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      console.log(USERMESSAGES.USER_CREATED, { user: user });
      return res.status(StatusCodes.CREATED).send(USERMESSAGES.USER_CREATED);
    } else {
      console.log(USERMESSAGES.ERROR_CREATING_USER, { error: error });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(USERMESSAGES.INTERNAL_SERVER_ERROR);
    }
  } catch (error) {
    console.log(USERMESSAGES.ERROR_CREATING_USER, { error: error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(USERMESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const readUser = async (req, res) => {
  try {
    const query = !req.query.email ? {} : { email: req.query.email };
    const user = await READ_USER_DB(query, fields);

    if (user.length > 0) {
      console.log(USERMESSAGES.USER_FOUND, { user: user });
      return res.status(StatusCodes.OK).send(user);
    } else {
      console.log(USERMESSAGES.USER_NOT_FOUND, { user: user });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(USERMESSAGES.USER_NOT_FOUND);
    }
  } catch (error) {
    console.log(USERMESSAGES.ERROR_READING_USER, { error: error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(USERMESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const updateUser = async (req, res) => {
  try {
    const query = { email: req.query.email };
    const data = req.body;
    const user = await UPDATE_USER_DB(query, data, fields);
    if (user) {
      console.log(USERMESSAGES.USER_UPDATED, { user: user });
      return res.status(StatusCodes.OK).send(user);
    } else {
      console.log(USERMESSAGES.USER_NOT_UPDATED, { user: user });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(USERMESSAGES.USER_NOT_UPDATED);
    }
  } catch (error) {
    console.log(USERMESSAGES.ERROR_UPDATING_USER, { error: error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(USERMESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const deleteUser = async (req, res) => {
  try {
    const query = { email: req.query.email };
    const user = await DELETE_USER_DB(query);
    if (user) {
      console.log(USERMESSAGES.USER_DELETED, { user: user });
      return res.status(StatusCodes.OK).send(USERMESSAGES.USER_DELETED);
    } else {
      console.log(USERMESSAGES.USER_NOT_DELETED, { user: user });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(USERMESSAGES.USER_NOT_DELETED);
    }
  } catch (error) {
    console.log(USERMESSAGES.ERROR_DELETING_USER, { error: error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(USERMESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export {
  createUser as CREATE_USER,
  readUser as READ_USER,
  updateUser as UPDATE_USER,
  deleteUser as DELETE_USER,
};
