import { BrowserRouter, Routes, Route } from "react-router-dom";
import "fontsource-roboto";

import "./App.css";
import Login from "pages/Login";
import Register from "pages/Register";
import Main from "pages/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
