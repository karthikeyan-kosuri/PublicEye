import { useNavigate } from "react-router-dom";
import loginbg from "./assets/login-design.png";
const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="relative">
        <img src={loginbg} className="object-cover h-screen w-full"></img>
        <div className="absolute top-25 left-70 mt-15 backdrop-blur-md rounded-4xl shadow-2xl">
            <div className="w-110 h-100 ">
                <div className="m-10 font-medium">
                    <h1 className="text-[30px] font-bold">Login</h1>
                    <br></br>
                    <p>Email</p>
                    <input type="text" id="email" className="w-full h-10 rounded-sm bg-white my-2 placeholder:font-light text-sm px-2" placeholder="username@gmail.com"></input>
                    <br></br>
                    <p>Password</p>
                    <input type="password" id="password" className="w-full h-10 rounded-sm bg-white my-2 placeholder:font-light text-sm px-2" placeholder="Password"></input>
                    <br></br>
                    <a className="text-[#386641] cursor-pointer">Forgot Password?</a>
                    <br></br>
                    <button className="w-full h-10 text-white my-5 rounded-sm bg-[#386641] cursor-pointer">Sign in</button>
                    <br></br>
                    <p className="font-light">Don’t have an account yet? <span><a className="text-[#386641] font-medium cursor-pointer">Register for free</a></span></p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
{
  /*const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const loginData = { uid, password };

    try {
        // Send the login data to the server
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        // Check if the response is okay
        if (response.ok) {
            const result = await response.json();

            // Redirect to dashboard if login is successful
            window.location.href = '../Main Dashboard/dashboard.html';
        } else {
            const errorResult = await response.json();
            alert(errorResult.message || "Login failed!");
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred, please try again later.');
    }

    // Prevent default form submission
    return false;

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', login);*/
}
