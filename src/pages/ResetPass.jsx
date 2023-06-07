import PageTopBanner from "../components/PageTopBanner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const ResetPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  return (
    <>
      <PageTopBanner pagename="Reset Password" />
      <div className="main-container login-container">
        <div className="login-form-container">
          <h1>Reset Your Password</h1>
          <form className="login-form">
            <input
              type="text"
              placeholder="Email"
              className="account-input"
              onKeyUp={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="account-input"
              placeholder="New Password"
              style={{ display: `${email !== "" ? "block" : "none"}` }}
            />
            <span className="btn-container">
              <button className="slide-btn">Submit</button>
              <button className="slide-btn" onClick={() => navigate("/login")}>
                Cancel
              </button>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPass;
