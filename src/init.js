import "@babel/polyfill";
import dotenv from "dotenv";
import "./db";
import app from "./app";

import "./models/video";
import "./models/comment";
import "./models/user";
dotenv.config();
const PORT = process.env.PORT || 3000;

const handleListening = () =>
  console.log(
    `✔️Listening on: https://boiling-plateau-57903.herokuapp.com:${PORT}`
  );

app.listen(PORT, handleListening);
