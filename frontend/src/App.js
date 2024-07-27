import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUpPage from "./pages/signUpPage";
import LoginPage from "./pages/loginPage";
import CustomerStorePage from "./pages/customers/store";
import ItemDetailPage from "./pages/customers/store/components/itemsComponent/itemsDetail.jsx";
import PostItemsPage from "./pages/admin/postItems/index.jsx";
import HandleOrders from "./pages/admin/handleOrders/index.jsx";
import AdminStorePage from "././pages/admin/adminStore/index.jsx";
import Dashboard from "./pages/admin/dashboard/index.jsx";
import HomePage from "./pages/customers/home/index.jsx";
import AboutPage from "./pages/customers/about/index.jsx";
import CheckOutPage from "./pages/customers/checkout/checkoutPage/index.jsx";
import AdminPlaceOrder from "./pages/admin/adminPlaceOrder/index.jsx";
import { CartProvider } from "./pages/customers/checkout/cart/cartContext/index.jsx";
import DreamPage from "./pages/customers/dreamPage/index.jsx";
import DropsPage from "./pages/customers/drops_page/index.jsx";
import PostSpecialItemsPage from "./pages/admin/specialPostItems/index.jsx";
import SpecialCheckoutPage from "./pages/customers/specialCheckOutPage/index.jsx";

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aboutPage" element={<AboutPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/customersStore" element={<CustomerStorePage />} />
          <Route path="/itemsDetails/:id" element={<ItemDetailPage />} />
          <Route path="/adminPostItems" element={<PostItemsPage />} />
          <Route
            path="/adminPostSpecialItems"
            element={<PostSpecialItemsPage />}
          />
          <Route path="/handleOrders" element={<HandleOrders />} />
          <Route path="/adminStore" element={<AdminStorePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/adminPlaceOrder" element={<AdminPlaceOrder />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/dreamPage" element={<DreamPage />} />
          <Route path="/drops_page" element={<DropsPage />} />
          <Route path="/adminLogin" element={<LoginPage />} />
          <Route
            path="/specialCheckoutPage"
            element={<SpecialCheckoutPage />}
          />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
