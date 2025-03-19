import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginbg from "./assets/login-design.png";
import logo from "./assets/logo.png";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="relative">
      <img src={loginbg} className="object-cover h-screen w-full" />
      <div className="absolute top-7 left-5 w-50">
        <img src={logo} alt="Logo" />
      </div>
      <div className="absolute top-20 left-70 mt-15 backdrop-blur-md rounded-4xl shadow-2xl">
        <div className="w-80 h-90 m-10 font-medium">
          <h1 className="text-[30px] font-bold">Sign Up</h1>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <br />
          <p>Email</p>
          <input
            type="text"
            className="w-full h-10 rounded-sm bg-white my-2 text-sm px-2"
            placeholder="username@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Password</p>
          <input
            type="password"
            className="w-full h-10 rounded-sm bg-white my-2 text-sm px-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full h-10 text-white my-5 rounded-sm bg-[#386641] cursor-pointer"
            onClick={handleSignup}
          >
            Sign Up
          </button>
          <p className="font-light">
            Already have an account? {" "}
            <span
              className="text-[#386641] font-medium cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
