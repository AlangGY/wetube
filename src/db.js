import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✔️Connected to DB");
const handleError = () => console.log("❌Error on DB");

db.once("open", handleOpen);
db.once("error", handleError);
