import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Signup.css';
import ba_logo from "../login/BrainAlive.svg";
import image from "../login/login-side-image.png";
const Signup = () => {
  const navigate = useNavigate();

  const authenticate = (e) => {
    e.preventDefault();
    navigate('/');
  }
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row h-100  justify-content-center">
          
          <div className="col-md-6 login-form">
            <div className="login-app h-100">

              <form className="formFields" onSubmit={authenticate}>
                <div className="header1">Create Account</div>

                <div className="formField pt-2 m-0">
               
                  <input type="text" id="Name" className="formFieldInput"
                    name="Name" defaultValue="" onChange="" placeholder="Name"
                    style={{"fontSize":"1rem"}}
                  />
                </div>
                <div className="formField pt-2 m-0">
                
                  <input type="email" id="email" className="formFieldInput"
                    placeholder="Email" name="email" defaultValue="" onChange=""
                    style={{"fontSize":"1rem"}}
                  />
                </div>

                <div className="formField pt-2 m-0">
            
                  <input type="password" id="password"
                    className="formFieldInput" placeholder="Password"
                    name="password" defaultValue="" onChange="" style={{"fontSize":"1rem"}}  />
                </div>
                <div className="formField pt-2 m-0">
               
                  <input type="password" id="Cpassword"
                    className="formFieldInput" placeholder="Confirm Password"
                    name="Cpassword" defaultValue="" onChange="" style={{"fontSize":"1rem"}} />
                </div>
                <div className="formField p-0 m-0">
                  <button type="submit" className="formFieldButton mt-4 mb-2">Create Account</button>
                </div>
                {/* <div style={{ borderTop: "2px solid #fff ", marginLeft: 0, marginRight: 0 }}></div> */}
                <div className="formField p-0 m-0"><label>Already have an account? <Link to="/" className="header4">Log In</Link></label></div>



              </form>

            </div>

          </div>
          <div className="col-md-6 login-bg" style={{ backgroundImage: `url(${image}` }}>
            <div className="text-center login-left-content login-rightt-content h-100 d-flex justify-content-center">
              <h2 style={{"fontWeight":"550"}}><img src={ba_logo}/>ABHA</h2>
              <h5 style={{"fontWeight":"500","fontSize":"37px"}}> Help Stroke Survivors regain function and improve strength, coordination and balance</h5>
            </div>
          </div>
        </div>
       
      </div>

    </div>
  );
};
export default Signup;