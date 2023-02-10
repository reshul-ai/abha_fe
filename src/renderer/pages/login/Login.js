import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import image from "./login-side-image.png";
import ba_logo from "./BrainAlive.svg";
const Login = () => {
  const navigate = useNavigate();

  const authenticate = (e) => {
    e.preventDefault();
    navigate('/home');
  }
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row h-100 justify-content-center">
          <div className="col-md-6 login-bg" style={{ backgroundImage: `url(${image}` }}>
            <div className="text-center login-left-content h-100 d-flex justify-content-center">
              <h2><img src={ba_logo}/>ABHA</h2>
              <h5> Help Stroke Survivors regain function and improve strength, coordination and balance</h5>
            </div>
          </div>
          <div className="col-md-6 login-form">
            <div className="login-app h-100">

              <form className="formFields" onSubmit={authenticate}>
                <div className="header-welcome">Welcome Back!</div>
                <div className="header2">Login</div>
                <div className="formField">

                  <input
                    type="email"
                    id="email"
                    className="formFieldInput"
                    placeholder="Email"
                    name="email"
                    defaultValue=""

                  />
                </div>

                <div className="formField">
                  <input
                    type="password"
                    id="password"
                    className="formFieldInput"
                    placeholder="Password"
                    name="password"
                    defaultValue=""
                  />
                </div>
                <div className=" d-flex justify-content-between mb-2">
                  <label className=""><input
                    type="checkbox"
                    id="checkbox1"
                    className="formFieldCheckbox"
                    name="checkbox1"
                    defaultChecked
                  />Keep me logged in</label>
                  <Link to="/forgotpassword" className="forgot-password2 text-white">
                    Forgot Password?
                  </Link>
                </div>
                <div className="formField">
                  <button type="submit" className="formFieldButton btn btn-primary">Login</button>
                </div>
                <div style={{ borderTop: "1px solid #E8E8E8", marginLeft: 0, marginRight: 0 }}></div>
                <div className="formField">
                  <label>Don't have an account? &nbsp; 
                    <Link to="/signUp" className="text-white ml-1">Create Account</Link></label></div>
              </form>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
export default Login;