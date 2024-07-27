import OrderProcessingDisplay from "./components/orderProcessingDisplay";
import AdminNavbar from "../../../components/admiNavBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const HandleOrders = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");

    if (!token) {
      navigate("/login");
    } else {
    }
  }, [navigate]);
  return (
    <div className="orders-page">
      <AdminNavbar />
      <OrderProcessingDisplay />
    </div>
  );
};

export default HandleOrders;
