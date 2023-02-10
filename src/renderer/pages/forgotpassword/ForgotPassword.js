import React from "react";
import { Link,useNavigate } from "react-router-dom";
import '../login/Login.css';
import image from "../login/login-side-image.png";
import ba_logo from "../login/BrainAlive.svg";
const ForgotPassword=()=>{
    const navigate = useNavigate();

    const authenticate = (e) => {
        e.preventDefault();
        navigate('/resetpassword');
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
              
                <div className="header12">Forgot Password?</div>
                <div className="formField">

                  <input
                    type="email"
                    id="email"
                    className="formFieldInput"
                    placeholder="Registered Email"
                    name="email"
                    defaultValue=""

                  />
                </div>
                
                <div className="formField">
                  <button type="submit" className="formFieldButton btn btn-primary">Get OTP</button>
                </div>
              
              </form>

            </div>

          </div>
        </div>

      </div>

    </div>
    );
};
export default ForgotPassword;