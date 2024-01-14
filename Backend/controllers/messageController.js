import dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";
import {
  MESSAGE_MESSAGES,
  SERVER_MESSAGES,
  USER_MESSAGES,
} from "../config/messages.js";

// CONSTANTS
const fields = {
  _id: 0,
  __v: 0,
  user_id: 0,
  created_at: 0,
  updated_at: 0,
};

// DATABASE CONTROLLERS

import {
  CREATE_MESSAGE_DB,
  READ_MESSAGE_DB,
  UPDATE_MESSAGE_DB,
  DELETE_MESSAGE_DB,
} from "./database/messageDatabase.js";

import { UPDATE_USER_DB } from "./database/userDatabase.js";

// CONTROLLERS

const createMessage = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { content } = req.body;
    const query = { user_id: user_id };

    const messageExists = await READ_MESSAGE_DB(query);
    if (messageExists.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .send(MESSAGE_MESSAGES.MESSAGE_ALREADY_EXISTS);
    }

    const message = await CREATE_MESSAGE_DB({
      user_id,
      content,
    });

    if (message) {
      console.log(MESSAGE_MESSAGES.MESSAGE_CREATED, { message: message });
      const updated = await UPDATE_USER_DB(
        { _id: user_id },
        { $push: { messages: message._id } }
      );
      if (updated) {
        console.log(USER_MESSAGES.USER_UPDATED, { message: message });
        return res
          .status(StatusCodes.CREATED)
          .send(MESSAGE_MESSAGES.MESSAGE_CREATED);
      } else {
        console.log(USER_MESSAGES.ERROR_UPDATING_USER);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
      }
    } else {
      console.log(MESSAGE_MESSAGES.ERROR_CREATING_MESSAGE, { error: error });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  } catch (error) {
    console.log(MESSAGE_MESSAGES.ERROR_CREATING_MESSAGE, { error: error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const readMessage = async (req, res) => {
  try {
    const query = !req.query.email ? {} : { email: req.query.email };
    const message = await READ_MESSAGE_DB(query, fields);

    if (message.length > 0) {
      console.log(MESSAGE_MESSAGES.MESSAGE_FOUND, { message: message });
      return res.status(StatusCodes.OK).send(message);
    } else {
      console.log(MESSAGE_MESSAGES.MESSAGE_NOT_FOUND, { message: message });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(MESSAGE_MESSAGES.MESSAGE_NOT_FOUND);
    }
  } catch (error) {
    console.log(MESSAGE_MESSAGES.ERROR_READING_MESSAGE, { error: error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const updateMessage = async (req, res) => {
  try {
    const query = { user_id: req.user.user_id };
    const data = req.body;
    const message = await UPDATE_MESSAGE_DB(query, data, fields);
    if (message) {
      console.log(MESSAGE_MESSAGES.MESSAGE_UPDATED, { message: message });
      return res.status(StatusCodes.OK).send(message);
    } else {
      console.log(MESSAGE_MESSAGES.MESSAGE_NOT_UPDATED, { message: message });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(MESSAGE_MESSAGES.MESSAGE_NOT_UPDATED);
    }
  } catch (error) {
    console.log(MESSAGE_MESSAGES.ERROR_UPDATING_MESSAGE, { error: error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const deleteMessage = async (req, res) => {
  try {
    const query = { user_id: req.user.user_id };
    const message = await DELETE_MESSAGE_DB(query);
    if (message) {
      console.log(MESSAGE_MESSAGES.MESSAGE_DELETED, { message: message });
      const updated = await UPDATE_USER_DB(
        { _id: req.user.user_id },
        { $pull: { messages: message._id } }
      );
      if (updated) {
        console.log(USER_MESSAGES.USER_UPDATED, { message: message });
        return res
          .status(StatusCodes.OK)
          .send(MESSAGE_MESSAGES.MESSAGE_DELETED);
      } else {
        console.log(USER_MESSAGES.ERROR_UPDATING_USER);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
      }
    } else {
      console.log(MESSAGE_MESSAGES.MESSAGE_NOT_DELETED, { message: message });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(MESSAGE_MESSAGES.MESSAGE_NOT_DELETED);
    }
  } catch (error) {
    console.log(MESSAGE_MESSAGES.ERROR_DELETING_MESSAGE, { error: error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export {
  createMessage as CREATE_MESSAGE,
  readMessage as READ_MESSAGE,
  updateMessage as UPDATE_MESSAGE,
  deleteMessage as DELETE_MESSAGE,
};
