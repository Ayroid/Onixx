import { MESSAGEMODEL } from "../../models/messageModel.js";
import { MESSAGE_MESSAGES } from "../../utils/messages.js";

// DATABASE OPERATIONS

const createMessageDB = async (data) => {
  try {
    const result = await MESSAGEMODEL(data).save();
    if (result !== null) {
      console.log(MESSAGE_MESSAGES.MESSAGE_CREATED, { userId: result._id });
      return result;
    } else {
      console.log(MESSAGE_MESSAGES.MESSAGE_NOT_CREATED, { userId: result._id });
      return false;
    }
  } catch (error) {
    console.log(MESSAGE_MESSAGES.ERROR_CREATING_MESSAGE, (data, error));
    return false;
  }
};

const readMessageDB = async (query, fields) => {
  try {
    console.log("Query:", query);
    const result = await MESSAGEMODEL.find(query).select(fields);
    if (result.length > 0) {
      console.log(MESSAGE_MESSAGES.MESSAGE_READ, { userId: result[0].email });
      return result;
    } else {
      console.log(MESSAGE_MESSAGES.MESSAGE_NOT_READ);
      return false;
    }
  } catch (error) {
    console.log(MESSAGE_MESSAGES.ERROR_READING_MESSAGE, {
      query,
      error,
    });
    return false;
  }
};

const updateMessageDB = async (query, data, fields) => {
  try {
    console.log(query, data);
    const result = await MESSAGEMODEL.findOneAndUpdate(query, data, {
      new: true,
    }).select(fields);
    if (result) {
      console.log(MESSAGE_MESSAGES.MESSAGE_UPDATED, { userId: result });
      return result;
    } else {
      console.log(MESSAGE_MESSAGES.MESSAGE_NOT_UPDATED, { userId: result });
      return false;
    }
  } catch (error) {
    console.log(MESSAGE_MESSAGES.ERROR_UPDATING_MESSAGE, (query, data, error));
    return false;
  }
};

const deleteMessageDB = async (query) => {
  try {
    const result = await MESSAGEMODEL.findOneAndDelete(query);

    if (result) {
      console.log(MESSAGE_MESSAGES.MESSAGE_DELETED, { userId: result._id });
      return result;
    } else {
      console.log(MESSAGE_MESSAGES.MESSAGE_NOT_DELETED, { userId: result._id });
      return false;
    }
  } catch (error) {
    console.log(MESSAGE_MESSAGES.ERROR_DELETING_MESSAGE, (query, error));
    return false;
  }
};

// EXPORTING MODULES

export {
  createMessageDB as CREATE_MESSAGE_DB,
  readMessageDB as READ_MESSAGE_DB,
  updateMessageDB as UPDATE_MESSAGE_DB,
  deleteMessageDB as DELETE_MESSAGE_DB,
};
