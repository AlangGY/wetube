import express from "express";

import {
  getVideo_edit,
  getVideo_upload,
  postVideo_edit,
  postVideo_upload,
  videos,
  video_delete,
  video_detail,
  video_edit,
} from "../controllers/videoController";
import { onlyPrivate, uploadVideo, uploadLocal } from "../middlewares";
import routes from "../routes";

const videoRouter = express.Router();

// videoRouter.get(routes.home, );
videoRouter.get(routes.video_upload, onlyPrivate, getVideo_upload);
videoRouter.post(
  routes.video_upload,
  onlyPrivate,
  uploadLocal,
  uploadVideo,
  postVideo_upload
);

videoRouter.get(routes.video_detail(), video_detail);

videoRouter.get(routes.video_edit(), onlyPrivate, getVideo_edit);
videoRouter.post(routes.video_edit(), onlyPrivate, postVideo_edit);

videoRouter.get(routes.video_delete(), onlyPrivate, video_delete);

export default videoRouter;
