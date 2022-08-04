import { BrowserRouter, Routes, Route } from "react-router-dom";
import "fontsource-roboto";

import Signup from "./pages/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import Signin from "pages/Signin";
// import PrivateRoute from "./navigation/PrivateRoute";
import PrivateRouteV2 from "navigation/PrivateRouteV2";
import ForgotPassword from "./pages/ForgotPassword";
import UpdateProfile from "./pages/UpdateProfile";

import "./App.css";
import Main from "pages/Main";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* <PrivateRoute exact path="/" element={<Main />} /> */}
          {/* <PrivateRoute path="/update-profile" element={<UpdateProfile />} /> */}
          {/* <Route path="/" element={<Main />} /> */}
          {/* <Route path="/update-profile" element={<UpdateProfile />} /> */}
          <Route path="/" element={<PrivateRouteV2 />}>
            <Route path="/" element={<Main />} />
          </Route>
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
