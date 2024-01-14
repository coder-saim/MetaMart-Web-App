import HomePage from "./components/HomePage";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}  />
          <Route path="/search/:keyword" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetails/>} exact />
          <Route path="/login" element={<Login/>}  />
          <Route path="/register" element={<Register/>}  />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
