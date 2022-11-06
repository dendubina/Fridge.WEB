import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import FridgesList from "./pages/FridgesList/FridgesList";
import useAuth from "./features/Hooks/useAuth";

const Router = () => {
  const auth = useAuth();

  return auth.isLoaded ? (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Fridges" element={<FridgesList />} />
      </Routes>
    </BrowserRouter>
  ) : (
    <div>some loader will be here</div>
  );
};

export default Router;
