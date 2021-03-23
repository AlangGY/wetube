/* eslint-disable camelcase */
import routes from "../routes";
import Video from "../models/video";
import Comment from "../models/comment";
import { convertTZ, deleteVideoS3 } from "../middlewares";

//Global
export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  // const searchingBy = req.query.term;
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

// Video

// export const videos = (req, res) =>
//   res.render("videos", { pageTitle: "Videos" });

//upload
export const getVideo_upload = (req, res) =>
  res.render("videoUpload", { pageTitle: "Video_upload" });
export const postVideo_upload = async (req, res) => {
  const {
    body: { title, description },
    file: { path, thumbnailPath },
    user,
  } = req;
  console.log(req.file, req.body);
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: user.id,
    thumbnailUrl: thumbnailPath,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.video_detail(newVideo.id));
};

export const video_detail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments")
      .populate({
        path: "comments",
        populate: { path: "creator", model: "user" },
      });
    res.render("videoDetail", { pageTitle: `${video.title}`, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getVideo_edit = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id).populate("creator");
    if (video.creator.id !== req.user.id) {
      throw Error();
    }
    res.render("videoEdit", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.video_detail(id));
  }
};

export const postVideo_edit = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.video_detail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const video_delete = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id).populate("creator");
    if (video.creator.id !== req.user.id) {
      throw Error();
    }
    await Video.findOneAndRemove({ _id: id });
    await deleteVideoS3(video.fileUrl, video.thumbnailUrl);
  } catch (error) {}
  res.redirect(routes.home);
};

// Api

// Register Views
export const postRegisterView = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Post Comment

export const postComment = async (req, res) => {
  try {
    const {
      params: { id },
      body: { comment },
      user,
    } = req;
    const video = await Video.findById(id).populate("comments");
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    newComment.createAt = convertTZ(newComment.createAt, "Asia/Seoul");
    newComment.save();
    video.save();
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

// Delete Comment

export const postDeleteComment = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const targetComment = await Comment.findById(id);
    console.log(targetComment.creator._id, req.user.id);
    if (String(targetComment.creator._id) !== req.user.id) {
      throw Error("wrong!");
    }
    await Comment.findOneAndRemove({ _id: id });
    await Video;
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};
