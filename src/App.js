import { BrowserRouter, Routes, Route } from "react-router-dom";
import "fontsource-roboto";

import "./App.css";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
