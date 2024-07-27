import PostSpecialItemsComponent from "./postSpecialItemsComponent";
import AdminNavbar from "../../../components/admiNavBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const PostSpecialItemsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");

    if (!token) {
      navigate("/adminlogin");
    } else {
    }
  }, [navigate]);

  return (
    <>
      <AdminNavbar />
      <PostSpecialItemsComponent />
    </>
  );
};

export default PostSpecialItemsPage;
