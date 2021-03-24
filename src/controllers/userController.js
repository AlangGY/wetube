import passport from "passport";
import routes from "../routes";
import User from "../models/user";

// Global
export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    req.flash("error", "비밀번호가 일치하지 않습니다.");
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = User({
        name,
        email,
      });
      await User.register(user, password);
      req.flash("success", "계정이 생성되었습니다!");

      next();
    } catch (error) {
      console.log(error);
    }
  }
};

// GithubLogin
export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl: avatar_url,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

// FacebookLogin
export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  console.log(accessToken, refreshToken, profile, cb);
  const user = null;
  return cb(null, user);
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

// KakaoLogin
export const kakaoLogin = passport.authenticate("kakao");

export const kakaoLoginCallback = async (_, __, profile, done) => {
  const {
    _json: { id, kakao_account },
  } = profile;
  const {
    profile: { nickname, thumbnail_image_url },
    email,
  } = kakao_account;
  console.log(id, nickname, thumbnail_image_url, email);
  try {
    const user = await User.findOne({ kakaoId: id });
    if (user) {
      user.email = kakao_account.email;
      user.save();
      return done(null, user);
    } else {
      const newUser = await User.create({
        email,
        name: nickname,
        kakaoId: id,
        avatarUrl: thumbnail_image_url,
      });
      return done(null, newUser);
    }
  } catch (error) {
    return done(error);
  }
};
export const postKakaoLogin = (req, res) => {
  res.redirect(routes.home);
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login,
  successFlash: "로그인 되었습니다.",
  failureFlash: "로그인에 실패하였습니다.",
});

export const logout = (req, res) => {
  req.logout();
  req.flash("info", "로그아웃되었습니다");
  res.redirect(routes.home);
};

// User
export const getMe = async (req, res) => {
  const user = await User.findOne({ _id: req.user._id }).populate("videos");
  res.render("userDetail", { pageTitle: "User_detail", user });
};
export const user_detail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findOne({ _id: id }).populate("videos");
    console.log(user);
    res.render("userDetail", { pageTitle: "User_detail", user });
  } catch (error) {
    console.log(error);
    req.flash("error", "존재하지않는 유저입니다.");
    res.redirect(routes.home);
  }
};

// editProfile
export const getEdit_profile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit_profile" });
export const postEdit_profile = async (req, res) => {
  const {
    user: { _id: id },
    body: { name, email },
    file,
  } = req;

  try {
    await User.findOneAndUpdate(
      { _id: id },
      { email, name, avatarUrl: file ? file.location : req.user.avatarUrl }
    );
    req.flash("success", "프로필이 변경되었습니다.");
    res.redirect(routes.home);
  } catch (error) {
    req.flash("error", "프로필 변경에 실패하였습니다.");
    res.redirect(routes.edit_profile);
  }
};

export const getChange_password = (req, res) =>
  res.render("changePassword", { pageTitle: "Change_password" });
export const postChange_password = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword2 },
  } = req;
  try {
    if (newPassword !== newPassword2) {
      req.flash("error", "비밀번호가 일치하지 않습니다.");
      res.status(400);
      res.redirect(`${routes.users}${routes.change_password}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    req.flash("success", "비밀번호가 변경되었습니다.");

    res.redirect(`${routes.users}${routes.me}`);
  } catch (error) {
    req.flash("error", "비밀번호 변경에 실패하였습니다.");
    res.redirect(`${routes.users}${routes.change_password}`);
  }
};
