import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import FridgesList from "./pages/Fridges/FridgesList/FridgesList";
import CreateFridge from "./pages/Fridges/CreateFridge/CreateFridge";
import useAuth from "./features/Hooks/useAuth";
import UpdateFridge from "./pages/Fridges/UpdateFridge/UpdateFridge";
import UpdateProductInFridge from "./pages/Fridges/UpdateProductInFridge/UpdateProductInFridge";
import AddProductInFridge from "./pages/Fridges/AddProductInFridge/AddProductInFridge";
import ProductsList from "./pages/Products/ProductsList/ProductsList";
import AddProduct from "./pages/Products/AddProduct/AddProduct";
import EditProduct from "./pages/Products/EditProduct/EditProduct";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import RequireAdmin from "./components/RequireAuthComponents/RequireAdmin";
import UpdateUser from "./pages/UpdateUser/UpdateUser";
import EmailConfirmation from "./pages/EmailConfirmation/EmailConfirmation";
import UserProfile from "./pages/UserProfile/UserProfile";
import RequireAuth from "./components/RequireAuthComponents/RequireAuth";

const Router = () => {
  const auth = useAuth();

  return auth.isLoaded ? (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/SignIn" element={<SignIn />} />

        <Route path="/SignUp" element={<SignUp />} />

        <Route path="/Fridges" element={<FridgesList />} />

        <Route path="/Fridges/Create" element={<CreateFridge />} />

        <Route path="/Fridges/Update/:fridgeId" element={<UpdateFridge />} />

        <Route
          path="/Fridges/:fridgeId/products/:productId"
          element={<UpdateProductInFridge />}
        />

        <Route
          path="/Fridges/:fridgeId/AddProduct"
          element={<AddProductInFridge />}
        />

        <Route path="/Products" element={<ProductsList />} />

        <Route path="/Products/Create" element={<AddProduct />} />

        <Route path="/Products/Edit/:productId" element={<EditProduct />} />

        <Route
          path="/users"
          element={
            <RequireAdmin>
              <AdminPanel />
            </RequireAdmin>
          }
        />

        <Route
          path="/users/:userId/Edit"
          element={
            <RequireAdmin>
              <UpdateUser />
            </RequireAdmin>
          }
        />

        <Route
          path="/users/:userId/emailConfirmation"
          element={<EmailConfirmation />}
        />

        <Route
          path="/profile"
          element={
            <RequireAuth>
              <UserProfile />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  ) : (
    <div>some loader will be here</div>
  );
};

export default Router;
