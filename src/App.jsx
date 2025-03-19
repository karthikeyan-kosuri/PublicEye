import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./landing.jsx";
import Login from "./login.jsx";
import Signup from "./signup.jsx";
function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Landing/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/signup" element={<Signup/>}></Route>
            </Routes>
        </Router>
    );
}
export default App;