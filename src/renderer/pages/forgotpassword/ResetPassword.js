import React from "react";
import { Link,useNavigate } from "react-router-dom";
import '../login/Login.css';
import image from "../login/login-side-image.png";
import ba_logo from "../login/BrainAlive.svg";
const Resetpassword=()=>{
    const navigate = useNavigate();

    const authenticate = (e) => {
        e.preventDefault();
        navigate('/');
    }
    return (
      <div className="App">
      <div className="container-fluid">
        <div className="row h-100 justify-content-center">
          <div className="col-md-6 login-bg" style={{ backgroundImage: `url(${image}` }}>
            <div className="text-center login-left-content h-100 d-flex justify-content-center">
            <h2 style={{"fontWeight":"550"}}><img src={ba_logo}/><span>ABHA</span></h2>
              <h5 style={{"fontWeight":"500","fontSize":"37px"}}> Help Stroke Survivors regain function and improve strength, coordination and balance</h5>
            </div>
          </div>
          <div className="col-md-6 login-form">
            <div className="login-app h-100">

              <form className="formFields" onSubmit={authenticate}>
              
                <div className="header12"><h1>Reset Password</h1></div>
                
                <div className="formField p-0 m-0">
              
                  <input
                    type="password" id="password" className="formFieldInput"
                    placeholder="Enter New Password"  name="password"
                    defaultValue="" onChange="" style={{"fontSize":"1rem"}}  />
                </div>
                <div className="formField pt-2 m-0">
               
                  <input
                    type="password" id="password" className="formFieldInput"
                    placeholder="Confirm New Password"  name="password"
                    defaultValue="" onChange="" style={{"fontSize":"1rem"}}  />
                </div><div className="formField pt-2 m-0">
                
                  <input
                    type="password" id="password" className="formFieldInput"
                    placeholder="Enter OTP"  name="password"
                    defaultValue="" onChange="" style={{"fontSize":"1rem"}}  />
                </div>
                <div className="formField">
                  <button type="submit" className="formFieldButton btn btn-primary">Save New Password </button>
                </div>
              
              </form>

            </div>

          </div>
        </div>

      </div>

    </div>
    );
};
export default Resetpassword;