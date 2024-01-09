import HomePage from "./components/HomePage";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from "./components/product/ProductDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/product/:id" element={<ProductDetails/>} exact />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
