import HomePage from "./components/HomePage";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useEffect } from "react";
import store from "./store";
import { loadUser } from "./actions/userActions";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import Cart from "./components/cart/Cart";



function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search/:keyword" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetails />} exact />
          

          <Route path="/cart" element={<Cart />} />

          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />


        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
