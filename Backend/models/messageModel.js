import mongoose from "mongoose";
import moment from "moment-timezone";

const messageSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: () => moment().tz('Asia/Kolkata').toDate(),
    required: true,
  },
  updated_at: {
    type: Date,
    default: () => moment().tz('Asia/Kolkata').toDate(),
    required: false,
  },
});

const messageModel = mongoose.model("Message", messageSchema);

export { messageModel as MESSAGEMODEL };
