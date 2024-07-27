import ItemsComponent from "./components/itemsComponent/ItemsComponent";
import "./store.css";
import AdminNavbar from "../../../components/admiNavBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AdminStorePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");

    if (!token) {
      navigate("/login");
    } else {
    }
  }, [navigate]);

  return (
    <div className="store-whole-page">
      <div className="navv">
        <AdminNavbar />
      </div>
      <ItemsComponent />
    </div>
  );
};

export default AdminStorePage;
