import express from "express";
import passport from "passport";
import {
  change_password,
  edit_profile,
  facebookLogin,
  getJoin,
  getLogin,
  getMe,
  githubLogin,
  githubLoginCallback,
  kakaoLogin,
  logout,
  postFacebookLogin,
  postGithubLogin,
  postJoin,
  postKakaoLogin,
  postLogin,
  user_detail,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { onlyPrivate, onlyPublic } from "../middlewares";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.home, home);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

//Github Login
globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", {
    failureRedirect: routes.login,
    successFlash: "로그인 되었습니다.",
    failureFlash: "로그인에 실패하였습니다.",
  }),
  postGithubLogin
);
//Facebook Login
globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", {
    failureRedirect: routes.login,
    successFlash: "로그인 되었습니다.",
    failureFlash: "로그인에 실패하였습니다.",
  }),
  postFacebookLogin
);
//Kakao Login
globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", {
    failureRedirect: routes.login,
    successFlash: "알랑튜브에 오신걸 환영합니다.",
    failureFlash: "로그인에 실패하였습니다.",
  }),
  postKakaoLogin
);

export default globalRouter;
