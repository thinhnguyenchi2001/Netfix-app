import "./register.scss";
import netflixLogo from "../../images/netflix-logo.png";
import imgBackGround from "../../images/netflix-background.jpg";
import tv from "../../images/tv.png";
import mobile from "../../images/mobile.jpg";
import children from "../../images/children.png";
import vn from "../../images/vn.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { httpClient } from "../../httpClient.ts";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setCurrentUser, setSessin_id } from "../../Store/index";

// import { fetchTVs, fetchMovies } from "../../API";
// import { useEffect } from "react";

export const Register = () => {
  const navigate = useNavigate();
  const userToken = useSelector((state) => state.app.token);
  const dispatch = useDispatch();

  const Confirm = () => {
    httpClient.get("authentication/token/new").then((response) => {
      localStorage.setItem("userToken", response.data.request_token);
      dispatch(setToken(response.data.request_token));
    });

    userToken &&
      window.open(`https://www.themoviedb.org/authenticate/${userToken}`);

    if (
      window.confirm("Please authenticate the user for authorization !") == true
    ) {
      httpClient
        .post("/authentication/session/new", {
          request_token: userToken,
        })
        .then((response) => {
          dispatch(setSessin_id(response.data.session_id));
          navigate("/");
        })
        .catch(() => alert("Can not login !"));
    } else {
      window.reload();
    }
  };

  // useEffect(() => {}, []);

  const LoginAccount = (e) => {
    e.preventDefault();
    Confirm();
  };
  return (
    <div className="register-page">
      <div className="register-header-wrapper">
        <div className="register-header">
          {" "}
          <div className="header-logo">
            <Link to="/">
              <img src={netflixLogo} alt="" />
            </Link>
          </div>
          {/* <div className="header-group-right">
            <div className="language-picker">Tiếng Việt</div>
            <div className="register-btn">Đăng nhập</div>
          </div> */}
        </div>
      </div>
      <div className="image-background">
        <img src={imgBackGround} alt="" />
      </div>
      <div className="register-body">
        <div className="body-hero">
          <div className="body-hero-card">
            <div className="hero-card-title">
              Unlimited movies, TV shows, and more.
            </div>
            <div className="hero-card-subtitle">
              Watch anywhere. Cancel anytime.
            </div>
            <form className="register-form" action="">
              <div className="form-title">
                Ready to watch? Enter your email to create or restart your
                membership.
              </div>
              <div className="register-group-input">
                <button onClick={(e) => LoginAccount(e)}>Get Started</button>
              </div>
            </form>
          </div>
        </div>
        <div className="body-story-card">
          <div className="story-card">
            <div className="story-card-text">
              <div className="story-card-title">Enjoy on your TV.</div>
              <div className="story-card-subtitle">
                Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
                Blu-ray players, and more.
              </div>
            </div>
            <div className="story-card-img">
              <img src={tv} alt="" />
            </div>
          </div>
        </div>
        <div className="body-story-card">
          <div className="story-card">
            <div className="story-card-img">
              <img src={mobile} alt="" />
            </div>
            <div className="story-card-text">
              <div className="story-card-title">
                Download your shows to watch offline.
              </div>
              <div className="story-card-subtitle">
                Save your favorites easily and always have something to watch.
              </div>
            </div>
          </div>
        </div>
        <div className="body-story-card">
          <div className="story-card">
            <div className="story-card-text">
              <div className="story-card-title">Watch everywhere.</div>
              <div className="story-card-subtitle">
                Stream unlimited movies and TV shows on your phone, tablet,
                laptop, and TV.
              </div>
            </div>
            <div className="story-card-img"></div>
          </div>
        </div>
        <div className="body-story-card">
          <div className="story-card">
            <div className="story-card-img">
              <img src={children} alt="" />
            </div>
            <div className="story-card-text">
              <div className="story-card-title">Create profiles for kids.</div>
              <div className="story-card-subtitle">
                Send kids on adventures with their favorite characters in a
                space made just for them—free with your membership.
              </div>
            </div>
          </div>
        </div>
        <div className="body-story-card">
          <div className="story-card">
            <div className="story-card-text">
              <div className="story-card-title">
                Have an Android Phone? Get our new free plan!
              </div>
              <div className="story-card-subtitle">
                Watch a selection of new movies and TV shows without adding any
                payment details!
              </div>
              <button className="story-card-btn">Get the app {">"}</button>
            </div>
            <div className="story-card-img">
              <img src={vn} alt="" />
            </div>
          </div>
        </div>
        <div className="body-question-card">
          <div className="question-card-title">Frequently Asked Questions</div>
          <ul className="question-card-list">
            <li className="question-card-item">
              What is Netflix?<span>+</span>
            </li>
            <li className="question-card-item">
              How much does Netflix cost?<span>+</span>
            </li>
            <li className="question-card-item">
              Where can I watch? <span>+</span>
            </li>
            <li className="question-card-item">
              How do I cancel?<span>+</span>
            </li>
            <li className="question-card-item">
              What can I watch on Netflix?<span>+</span>
            </li>
            <li className="question-card-item">
              Is Netflix good for kids?<span>+</span>
            </li>
          </ul>
          <form className="register-form" action="">
            <h3 className="form-title">
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <div className="register-group-input">
              <button>Get Stared</button>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="register-footer">
        <div className="footer-details">
          <div className="register-footer-title">Questions? Contact us.</div>
          <ul className="footer-question-list">
            <li className="footer-question-item">FAQ</li>
            <li className="footer-question-item">Help Center</li>
            <li className="footer-question-item">Account</li>
            <li className="footer-question-item">Media Center</li>
            <li className="footer-question-item">Investor Relations</li>
            <li className="footer-question-item">Jobs</li>
            <li className="footer-question-item">Ways to Watch</li>
            <li className="footer-question-item">Terms of Use</li>
            <li className="footer-question-item">Privacy</li>
            <li className="footer-question-item">Cookie Preferences</li>
            <li className="footer-question-item">Corporate Information</li>
            <li className="footer-question-item">Contact Us</li>
            <li className="footer-question-item">Speed Test</li>
            <li className="footer-question-item">Legal Notices</li>
            <li className="footer-question-item">Only on Netflix</li>
          </ul>

          <div className="register-footer-subtitle">Netflix Việt Nam</div>
        </div>
      </div> */}
    </div>
  );
};
