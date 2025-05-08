import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./store/authContext";
import PrivateRoute from "./utils/privateRoute";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import HomePage from "./components/HomePage";
import ProductPage from "./components/ProductPage";
import OrderHistory from "./components/OrderHistory";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>

          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />

            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin" element={<HomePage />} />
              <Route path="/admin/:id" element={<ProductPage />} />
              <Route path="/admin/add" element={<ProductPage />} />
              <Route path="/admin/history" element={<OrderHistory />} />
            </Route>

            <Route element={<PrivateRoute allowedRoles={["user"]} />}>
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Provider>
      </AuthProvider>
    </BrowserRouter>
    // <>
    //   <Provider store={store}>
    //     <Header />
    //     <ProductCarousel/>
    //     <Products />
    //     <Cart />
    //     <Checkout />
    //   </Provider>
    // </>
  );
}

export default App;
