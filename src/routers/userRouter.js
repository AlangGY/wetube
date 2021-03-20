/* eslint-disable quotes */
import express from "express";
import {
  getChange_password,
  getEdit_profile,
  getMe,
  postChange_password,
  postEdit_profile,
  user_detail,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";
import routes from "../routes";

const userRouter = express.Router();

// edit Profile
userRouter.get(routes.edit_profile, onlyPrivate, getEdit_profile);
userRouter.post(
  routes.edit_profile,
  onlyPrivate,
  uploadAvatar,
  postEdit_profile
);

userRouter.get(routes.change_password, onlyPrivate, getChange_password);
userRouter.post(routes.change_password, onlyPrivate, postChange_password);

// Current User
userRouter.get(routes.me, onlyPrivate, getMe);

// :id
userRouter.get(routes.user_detail(), user_detail);
export default userRouter;
