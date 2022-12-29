import "bootstrap/dist/css/bootstrap.min.css";
import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import HomePage from "./pages/HomePage/HomePage";
import POSPage from "./pages/POSPage/POSPage";
import ProductCatagories from "./pages/CatagoriesPage/CatagoriesPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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
