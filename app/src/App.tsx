import "bootstrap/dist/css/bootstrap.min.css";
import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import HomePage from "./pages/HomePage/HomePage";
import POSPage from "./pages/POSPage/POSPage";
import ProductCatagories from "./pages/CatagoriesPage/CatagoriesPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/pos" element={<POSPage />} />
        <Route path="/productspage" element={<ProductsPage />} />
        <Route path="/productcatagories" element={<ProductCatagories />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
