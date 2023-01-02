import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";
import ProductCatagories from "./pages/CatagoriesPage/CatagoriesPage";
import ErrorPage from "./pages/Error/ErrorPage";
import HomePage from "./pages/Home/HomePage";
import POSPage from "./pages/POS/POSPage";
import ProductsPage from "./pages/Products/ProductsPage";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
