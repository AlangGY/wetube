import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import KakaoStrategy from "passport-kakao";
import {
  facebookLoginCallback,
  githubLoginCallback,
  kakaoLoginCallback,
} from "./controllers/userController";
import user from "./models/user";
import routes from "./routes";

// Local
passport.use(user.createStrategy());
// Github
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `https://boiling-plateau-57903.herokuapp.com${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

//Facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: `https://boiling-plateau-57903.herokuapp.com${routes.facebookCallback}`,
    },
    facebookLoginCallback
  )
);

//KaKaoTalk
passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKO_CLIENT_SECRET, // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
      callbackURL: `https://boiling-plateau-57903.herokuapp.com${routes.kakaoCallback}`,
    },
    kakaoLoginCallback
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  user.findById(id, function (err, user) {
    done(err, user);
  });
});

export default passport;
