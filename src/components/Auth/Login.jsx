import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  useEffect(() => {
    // Check if the user is already authorized (has a valid access token)
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsAuthorized(true);
    }
  }, [setIsAuthorized]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://job-seeker-backend.onrender.com/api/v1/users/login",
        { email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setPassword("");
      setRole("");
      setEmail("");
      setIsAuthorized(true);
      setUser(response.data.data);
      // Set user role and access token in localStorage with expiration time of 12 hours
      const expirationTime = Date.now() + 12 * 60 * 60 * 1000; // 12 hours in milliseconds
      localStorage.setItem("userRole", response.data.data.role);
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("expirationTime", expirationTime.toString());
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="authPage">
        <div className="container">
          <div className="header">
            <img src="/JobZeelogo.png" alt="logo" />
            <h3>Login to your account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Login as</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Job Seeker">Job Seeker</option>
                  <option value="Recruiter">Recruiter</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Email</label>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ganesh@gmail.com"
                  autoComplete="email"
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="XXXXXXXX"
                  autoComplete="current-password"
                />
                <RiLock2Fill />
              </div>
            </div>
            <button onClick={handleLogin} type="submit">
              Login
            </button>
            <Link to={"/register"}>register Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/login.png" alt="login" />
        </div>
      </div>
    </>
  );
};

export default Login;
