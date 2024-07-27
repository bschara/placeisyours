import AdminNavbar from "../../../components/admiNavBar";
import AdminSideBar from "./sidebar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");

    if (!token) {
      navigate("/Adminlogin");
    } else {
    }
  }, [navigate]);
  return (
    <div className="all-dash">
      <AdminNavbar />
      <AdminSideBar />
    </div>
  );
};

export default Dashboard;
