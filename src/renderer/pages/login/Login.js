import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import image from "./login-side-image.png";
import ba_logo from "./BrainAlive.svg";
const Login = () => {
  const navigate = useNavigate();

  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const authenticate = (e) => {
    e.preventDefault();
    if(email === 'adhavan@braina.live' && password==='brainalive2023')
      navigate('/home');
    else{
      setError('Invalid Email or Password');
    }

  }
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row h-100 justify-content-center">
          <div className="col-md-6 login-bg" style={{ backgroundImage: `url(${image}` }}>
            <div className="text-center login-left-content h-100 d-flex justify-content-center">
              <h2 style={{"fontWeight":"550"}}><img src={ba_logo}/>ABHA</h2>
              <h5 style={{"fontWeight":"500","fontSize":"37px"}}> Help Stroke Survivors regain function and improve strength, coordination and balance</h5>
            </div>
          </div>
          <div className="col-md-6 login-form">
            <div className="row p-0 m-0 h-25"></div>
            <div className="row p-0 m-0">
                      <div className="login-app p-0 m-0">
                          <form className="formFields" onSubmit={authenticate}>
                            <div className="header-welcome p-0 m-0"><h2>Welcome Back!</h2></div>
                            <div className="header2 p-0 m-0"><h4>Login</h4></div>
                            <span style={{color:'red'}}>{error}</span>
                            <div className="formField pt-3 m-0">
                                
                              <input
                                type="email"
                                id="email"
                                className="formFieldInput"
                                placeholder="Email"
                                name="email"
                                defaultValue=""
                                style={{"fontSize":"1rem"}}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setError('')}
                              />
                            </div>

                            <div className="formField pt-2 m-0">
                              
                              <input
                                type="password"
                                id="password"
                                className="formFieldInput"
                                placeholder="Password"
                                name="password"
                                defaultValue=""
                                style={{"fontSize":"1rem"}}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setError('')}
                              />
                            </div>
                            <div className=" d-flex justify-content-between mt-2 ">
                              <label><input
                                type="checkbox"
                                id="checkbox1"
                                className="formFieldCheckbox"
                                name="checkbox1"
                                defaultChecked
                              />&nbsp;Keep me logged in</label>
                              <Link to="/forgotpassword" className="forgot-password2 text-white">
                                Forgot Password?
                              </Link>
                            </div>
                            <div className="formField p-0 m-0">
                              <button type="submit" className="formFieldButton btn btn-primary mb-2 mt-3" >Login</button>
                            </div>
                            {/* <div style={{ borderTop: "1px solid #E8E8E8", marginLeft: 0, marginRight: 0 }}></div> */}
                            <div className="formField p-0 m-0">
                              <label>Don't have an account? &nbsp; 
                                <Link to="/signUp" className="text-white ml-1">Create Account</Link></label></div>
                                
                          </form>

                      </div>
            </div>
            
          </div>
        </div>

      </div>

    </div>
  );
};
export default Login;