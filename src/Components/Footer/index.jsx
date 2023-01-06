import { Outlet } from "react-router";
import "./footer.scss";

export const Footer = () => {
  return (
    <>
      <Outlet />
      <div className="register-footer">
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

          <div className="register-footer-subtitle">Netflix Viet Nam</div>
        </div>
      </div>
    </>
  );
};
