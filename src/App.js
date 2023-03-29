import "./App.css";
import { useEffect  } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ChatPage from "./components/ChatPage";
import Signup from "./components/Signup";

function App() {

 
  return (
    <div className="App">
      <div>
        <Router>
            <Routes>
              <Route exact path="/" element={<HomePage />}></Route>
              <Route exact path="/login" element={<HomePage/>}></Route>
              <Route exact path="/chat" element={<ChatPage />}></Route>
            </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
