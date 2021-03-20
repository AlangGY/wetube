/* eslint-disable quotes */
import express from "express";
import {
  postComment,
  postDeleteComment,
  postRegisterView,
} from "../controllers/videoController";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.postComment, postComment);
apiRouter.post(routes.deleteComment, postDeleteComment);

export default apiRouter;
