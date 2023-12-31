import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const initialState = { email: "", password: "" };

const Login = () => {
  const [state, setState] = useState(initialState);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/auth/login", state)
      .then((res) => {
        console.log("res.data : ", res.data);
        alert("User successfuly Loggedin!!");
        // setIsRegister(false);
        setState(initialState);
        console.log("Token Payload : ", jwtDecode(res.data.token));
        navigate("/");
      })
      .catch((error) => {
        console.log("Error : ", error.message);
      });
  };

  const handleGoogleAuthentication = (e) => {
    e.preventDefault();
  };

  const handleFacebookAuthentication = (e) => {
    e.preventDefault();
  };

  const handleGithubAuthentication = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="mvh-100 loginPage d-flex justify-content-center align-items-center">
        <div className="container ">
          <div className="row">
            <div className="col">
              <Link className="btn btn-home" to="/">
                <i class="fa-solid fa-arrow-left"></i>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <div className="card  w-100">
                <div className="div card-body">
                  <h3>LOGIN</h3>
                  <form onSubmit={handleSubmit}>
                    <label for="exampleInputEmail1" className="form-label">
                      Email
                    </label>
                    <br />
                    <div class="input-group flex-nowrap">
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Email"
                        aria-label="Email"
                        name="email"
                        required
                        onChange={handleChange}
                      />
                      {/* <span class="input-group-text" id="addon-wrapping">@</span> */}
                    </div>
                    <label for="password" className="form-label">
                      Password
                    </label>
                    <div class="input-group flex-nowrap">
                      <input
                        type={isPasswordShow ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="addon-wrapping"
                        required
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        class="input-group-text"
                        id="addon-wrapping"
                        onClick={() => {
                          setIsPasswordShow(!isPasswordShow);
                        }}
                      >
                        <i
                          class={`fa-solid fa-eye${
                            isPasswordShow ? "" : "-slash"
                          }`}
                        ></i>
                      </button>
                    </div>
                    <div className="mb-3 mt-1 m form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                      />
                      <label className="form-check-label" for="exampleCheck1">
                        Remember me
                      </label>
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        disabled={isLoading}
                        class="btn  loginButton"
                      >
                        {!isLoading ? (
                          "Login"
                        ) : (
                          <div className="spinner-border spinner-border-sm"></div>
                        )}
                      </button>
                    </div>
                    <div className="text-end">
                      <Link to="/forgetPassword">forgot Passsword?</Link>
                    </div>
                  </form>
                  <div style={{ position: "relative" }}>
                    <span className="OR text-center">
                      <i class="fa-solid fa-o"></i>
                      <i class="fa-solid fa-r"></i>
                    </span>
                    <hr />
                  </div>
                  <div className="text-center">
                    <i
                      class="btn fa-brands fa-google fw-5 "
                      onClick={handleGoogleAuthentication}
                    ></i>
                    <i
                      class="btn fa-brands fa-facebook-f mx-3 my-1"
                      onClick={handleFacebookAuthentication}
                    ></i>
                    <i
                      class="btn fa-brands fa-github"
                      onClick={handleGithubAuthentication}
                    ></i>
                  </div>
                  <div className="text-center">
                    Need an account?{" "}
                    <span>
                      <Link to="/signup">SIGNUP</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
