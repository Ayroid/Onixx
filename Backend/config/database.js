import mongoose from "mongoose";
import { DBMESSAGES } from "./messages.js";

class Database {
  constructor(uri, options) {
    this.uri = uri;
    this.options = options;
  }

  async connect() {
    try {
      await mongoose.connect(this.uri, this.options);
      console.log(DBMESSAGES.DATABASE_CONNECTED);
    } catch (error) {
      console.log(DBMESSAGES.DATABASE_CONNECTION_ERROR, error);
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log(DBMESSAGES.DATABASE_DISCONNECTED);
    } catch (error) {
      console.log(DBMESSAGES.DATABASE_DISCONNECTION_ERROR, error);
    }
  }
}

export { Database };
