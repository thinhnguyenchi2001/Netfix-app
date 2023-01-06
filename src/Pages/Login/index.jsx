import netflixLogo from "../../images/netflix-logo.png";
import imgBackGround from "../../images/netflix-background.jpg";
import "./login.scss";
import { useEffect, useState } from "react";
import { httpClient } from "../../httpClient.ts";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setCurrentUser, setSessin_id } from "../../Store/index";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const sessinId = useSelector((state) => state.app.sessinId);
  const userToken = useSelector((state) => state.app.token);
  const navigate = useNavigate();

  const Confirm = () => {
    userToken &&
      window
        .open(`https://www.themoviedb.org/authenticate/${userToken}`)
        .focus();
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
        .catch(() =>
          alert("Can not login. Please check your account and password !")
        );
    } else {
      navigate("/register");
    }
  };

  useEffect(() => {
    httpClient.get("authentication/token/new").then((response) => {
      localStorage.setItem("userToken", response.data.request_token);
      dispatch(setToken(response.data.request_token));
    });
  }, []);

  const LoginAccount = (e) => {
    e.preventDefault();
    Confirm();
  };
  return (
    <div className="login-page">
      <div className="login-header-wrapper">
        <div className="login-header">
          {" "}
          <div className="header-logo">
            <Link to="/">
              <img src={netflixLogo} alt="" />
            </Link>
          </div>
          <div className="header-group-right"></div>
        </div>
      </div>
      <div className="image-background">
        <img src={imgBackGround} alt="" />
      </div>
      <div className="login-body">
        <form action="">
          <div className="login-form-title">Đăng nhập</div>
          <input
            className="login-email-or-phone"
            value={username}
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="login-password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-btn" onClick={(e) => LoginAccount(e)}>
            Đăng nhập
          </button>
          <div className="group-login-support">
            <div className="login-remember">
              {" "}
              <input
                style={{ accentColor: "white" }}
                type="checkbox"
                name=""
                id=""
              />{" "}
              Ghi nhớ tôi
            </div>
            <span>Bạn cần giúp đỡ?</span>
          </div>

          <div className="login-to-register">
            <p>
              Bạn mới tham gia Netflix?{" "}
              <Link to="/register">Đăng ký ngay.</Link>
            </p>
          </div>
          <p>
            Trang này được Google reCAPTCHA bảo vệ để đảm bảo bạn không phải là
            robot <a href=""> Tìm hiểu thêm.</a>
          </p>
        </form>
      </div>
      <div className="login-footer">
        <div className="footer-details">
          <div className="login-footer-title">
            Bạn có câu hỏi? Liên hệ với chúng tôi.
          </div>
          <ul className="footer-question-list">
            <li className="footer-question-item">Câu hỏi thường gặp</li>
            <li className="footer-question-item">Trung tâm trợ giúp</li>
            <li className="footer-question-item">Tài khoản</li>
            <li className="footer-question-item">Trung tâm đa phương tiện</li>
            <li className="footer-question-item">Quan hệ với nhà đầu tư</li>
            <li className="footer-question-item">Việc làm</li>
            <li className="footer-question-item">Các cách xem</li>
            <li className="footer-question-item">Điều khoản sử dụng</li>
            <li className="footer-question-item">Quyền riêng tư</li>
            <li className="footer-question-item">Tùy chọn cookie</li>
            <li className="footer-question-item">Thông tin doanh nghiệp</li>
            <li className="footer-question-item">Liên hệ với chúng tôi</li>
            <li className="footer-question-item">Kiểm tra tốc độ</li>
            <li className="footer-question-item">Thông báo pháp lý</li>
            <li className="footer-question-item">LChỉ có trên Netflix</li>
          </ul>
          <div className="footer-language-picker">Tiéng Việt</div>
          <div className="login-footer-subtitle">Netflix Việt Nam</div>
        </div>
      </div>
    </div>
  );
};
