import routes from "./routes";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import Ffmpeg from "fluent-ffmpeg";
import util from "util";
import fs from "fs";

//  uploadtoS3
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ap-northeast-2",
});

const uploadS3 = async (data, filename) => {
  const name = `${filename}.mp4`;
  await s3
    .putObject({
      Key: name,
      Bucket: "alangtube/video",
      ContentType: "video/mp4",
      Body: data,
      ACL: "public-read",
    })
    .promise();
  console.log("Uploaded!");
  return name;
};
// ffmpeg
const ffmpegVideo = async (file) => {
  const command = new Promise((resolve, reject) => {
    Ffmpeg(file.path)
      .format("mp4")
      .output(`output.mp4`)
      .on("start", () => console.log("Start Convert!"))
      .on("error", (err) => console.log(`Can't Process : ${err.message}`))
      .save(`localVideo/${file.filename}.mp4`)
      .on("end", () => {
        console.log("finished!");
        resolve();
      });
  });
  return command;
};
//  convert to mp4 with ffmpeg
export const convertVideo = async (req, res, next) => {
  try {
    const { file } = req;
    await ffmpegVideo(file).then(async () => {
      const readFile = util.promisify(fs.readFile);
      const data = await readFile(`localVideo/${file.filename}.mp4`);
      await uploadS3(data, file.filename);
      fs.unlinkSync(file.path);
      fs.unlinkSync(`localVideo/${file.filename}.mp4`);
      file.path = `https://alangtube.s3.ap-northeast-2.amazonaws.com/video/${file.filename}.mp4`;
      next();
    });
  } catch (err) {
    console.log(err);
  }
};

// local upload
const multerLocal = multer({
  dest: "localVideo/",
});

export const uploadLocal = multerLocal.single("video");
// upload aws-S3
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "alangtube/avatar",
  }),
});

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
