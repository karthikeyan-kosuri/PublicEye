import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./landing.jsx";
import Login from "./login.jsx";
import Signup from "./signup.jsx";
import Dashboard from "./dashboard.jsx"; // Import Dashboard component

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token"); // Check if token exists
  return token ? element : <Navigate to="/login" />; // Redirect to login if no token
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} /> {/* Protected Route */}
      </Routes>
    </Router>
  );
}

export default App;
