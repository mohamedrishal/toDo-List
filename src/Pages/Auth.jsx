import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/allAPI";  

const Auth = ({ register }) => {
  const isRegisterForm = register ? true : false;

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate =useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userData;
    if (!username || !email || !password) {
     alert("Please Fill the Form");
    } else {
      const result = await registerAPI(userData);
      console.log(result);

      if (result.status === 200) {
        alert(`${result.data.username} has Registered Successfully!!`);
        setUserData({
          username: "",
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        console.log(result);
      }
      
    }
  };


  // login
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    if ( !email || !password) {
      alert("Please Fill the Form");
    } else {
      const result = await loginAPI(userData);
      console.log(result);

      if (result.status === 200) {
        // toast.success(`${result.data.username} has Registered Successfully!!`);
        sessionStorage.setItem("exstingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)
        setUserData({
          email: "",
          password: "",
        });
        navigate("/home");
      } else {
        alert(result.response.data);
        console.log(result);
      }
      
    }
  };

  return (
    <div
      style={{ width: "100%", height: "100vh" }}
      className="container-fluid bg-success-subtle d-flex align-items-center justify-content-center "
    >
      <div className="card shadow p-5 bg-success-subtle">
        <div className="row  align-items-center">
          <div className="col-lg-6">
            <img
              className="img-fluid"
              src="https://cdn-icons-png.flaticon.com/512/1/1560.png"
              alt=""
            />
          </div>
          <div className="col-lg-6">
            <div className="d-flex align-items-center flex-column">
              <h1 className="fw-bolder text-dark mt-2">
                <i className=""></i>ToDo List
              </h1>
              <h5 className="fw-bolder mt-2 pb-3 text-secondary">
                {isRegisterForm
                  ? "Sign up to Your Account"
                  : "Sign In to Your Account"}
              </h5>
              <Form className=" text-secondary w-100">
                {isRegisterForm && (
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      value={userData.username}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          username: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                )}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Enter Your Email Id"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        email: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="password"
                    placeholder="Enter a Password"
                    value={userData.password}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        password: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                {isRegisterForm ? (
                  <div>
                    <button onClick={handleRegister} className="btn btn-light mb-2">Register</button>
                    <p className="mt-3">
                      Already Have Account? Click here to
                      <Link to={"/"} className="text-warning">
                        {" "}
                        Login
                      </Link>
                    </p>
                  </div>
                ) : (
                  <div>
                    <button onClick={handleLogin} className="btn btn-light mb-2">Login</button>
                    <p className="mt-3">
                      New User? Click here to
                      <Link  to={"/register"} className="text-warning">
                        {" "}
                        Register
                      </Link>
                    </p>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
