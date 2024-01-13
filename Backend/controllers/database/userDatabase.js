import { USERMODEL } from "../../models/userModel.js";
import { USERMESSAGES } from "../../config/messages.js";

// DATABASE OPERATIONS

const createUserDB = async (data) => {
  try {
    const result = await USERMODEL(data).save();
    if (result !== null) {
      console.log(USERMESSAGES.USER_CREATED, { userId: result._id });
      return result;
    } else {
      console.log(USERMESSAGES.USER_NOT_CREATED, { userId: result._id });
      return false;
    }
  } catch (error) {
    console.log(
      USERMESSAGES.ERROR_CREATING_USER,
      ({ data: data }, { error: error })
    );
    return false;
  }
};

const readUserDB = async (query, fields) => {
  try {
    const result = await USERMODEL.find(query).select(fields);
    if (result) {
      console.log(USERMESSAGES.USER_READ, { userId: result[0].email });
      return result;
    } else {
      console.log(USERMESSAGES.USER_NOT_READ, { userId: result[0].email });
      return false;
    }
  } catch (error) {
    console.log(USERMESSAGES.ERROR_READING_USER, {
      query: query,
      error: error,
    });
    return false;
  }
};

const updateUserDB = async (query, data, fields) => {
  try {
    console.log(query, data);
    const result = await USERMODEL.findOneAndUpdate(query, data, {
      new: true,
    }).select(fields);
    if (result) {
      console.log(USERMESSAGES.USER_UPDATED, { userId: result });
      return result;
    } else {
      console.log(USERMESSAGES.USER_NOT_UPDATED, { userId: result });
      return false;
    }
  } catch (error) {
    console.log(
      USERMESSAGES.ERROR_UPDATING_USER,
      ({ query: query }, { data: data }, { error: error })
    );
    return false;
  }
};

const deleteUserDB = async (query) => {
  try {
    const result = await USERMODEL.findOneAndDelete(query);

    if (result) {
      console.log(USERMESSAGES.USER_DELETED, { userId: result._id });
      return result;
    } else {
      console.log(USERMESSAGES.USER_NOT_DELETED, { userId: result._id });
      return false;
    }
  } catch (error) {
    console.log(
      USERMESSAGES.ERROR_DELETING_USER,
      ({ query: query }, { error: error })
    );
    return false;
  }
};

// EXPORTING MODULES

export {
  createUserDB as CREATE_USER_DB,
  readUserDB as READ_USER_DB,
  updateUserDB as UPDATE_USER_DB,
  deleteUserDB as DELETE_USER_DB,
};
