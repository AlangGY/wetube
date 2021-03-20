// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users

const USERS = "/users";
const EDIT_PROFILE = "/edit-profile";
const DELETE_PROFILE = "/delete-profile";
const CHANGE_PASSWORD = "/change-password";
const USER_DETAIL = "/:id";
const ME = "/me";

// Videos

const VIDEOS = "/videos";
const VIDEO_UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const VIDEO_EDIT = "/:id/edit";
const VIDEO_DELETE = "/:id/delete";

// Github

const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// Facebook

const FACEBOOK = "/auth/facebook";
const FACEBOOK_CALLBACK = "/auth/facebook/callback";

// Kakao

const KAKAO = "/auth/kakao";
const KAKAO_CALLBACK = "/auth/kakao/callback";

// API

const API = "/api";
const REGISTER_VIEW = "/:id/view";
const POST_COMMENT = "/:id/comment";
const DELETE_COMMENT = "/:id/commentDelete";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  user_detail: (id) => {
    if (id) {
      return `/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  edit_profile: EDIT_PROFILE,
  delete_profile: DELETE_PROFILE,
  me: ME,
  change_password: CHANGE_PASSWORD,
  videos: VIDEOS,
  video_upload: VIDEO_UPLOAD,
  // video_upload: `${VIDEOS}${VIDEO_UPLOAD}`,
  video_detail: (id) => {
    if (id) {
      return `${VIDEOS}/${id}`;
    } else {
      return VIDEO_DETAIL;
    }
  },
  video_edit: (id) => {
    if (id) {
      return `${VIDEOS}/${id}/edit`;
    } else {
      return VIDEO_EDIT;
    }
  },
  video_delete: (id) => {
    if (id) {
      return `${VIDEOS}/${id}/delete`;
    } else {
      return VIDEO_DELETE;
    }
  },
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  facebook: FACEBOOK,
  facebookCallback: FACEBOOK_CALLBACK,
  kakao: KAKAO,
  kakaoCallback: KAKAO_CALLBACK,
  api: API,
  registerView: REGISTER_VIEW,
  postComment: POST_COMMENT,
  deleteComment: DELETE_COMMENT,
};
export default routes;
