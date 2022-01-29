import mongoose from "mongoose";
import { Secrets } from "../util";

const url = `mongodb+srv://${Secrets.DB_USER}:${Secrets.DB_PASSWORD}@cluster0.yh8ph.mongodb.net/${Secrets.DB_NAME}?retryWrites=true&w=majority`;

export const connectDatabase = () => {
  mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
};
