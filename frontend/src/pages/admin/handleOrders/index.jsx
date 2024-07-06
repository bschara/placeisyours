import OrderProcessingDisplay from "./components/orderProcessingDisplay";
import AdminNavbar from "../../../components/admiNavBar";

const HandleOrders = () => {
  return (
    <div className="orders-page">
      <AdminNavbar />
      <OrderProcessingDisplay />
    </div>
  );
};

export default HandleOrders;
