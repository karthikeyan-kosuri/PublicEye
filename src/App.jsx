import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./landing.jsx";
import Login from "./login.jsx";
function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Landing/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
            </Routes>
        </Router>
    );
}
export default App;