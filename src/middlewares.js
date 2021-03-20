import routes from "./routes";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ap-northeast-2",
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "alangtube/video",
  }),
});
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "alangtube/avatar",
  }),
});

export const uploadVideo = multerVideo.single("video");
export const uploadAvatar = multerAvatar.single("avatar");
export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "AlangTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const formatDate = (date) => {
  return `${String(date.getFullYear()).slice(2)}.${
    date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
  }.${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/ ${
    date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  }:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
  // => YY.MM.DD/HH:MM
};
