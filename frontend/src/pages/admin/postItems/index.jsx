import PostItemsComponent from "./postItemsComponent";
import AdminNavbar from "../../../components/admiNavBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

const PostItemsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");

    if (!token) {
      navigate("/Adminlogin");
    } else {
    }
  }, [navigate]);

  return (
    <>
      <AdminNavbar />
      <PostItemsComponent />
    </>
  );
};

export default PostItemsPage;
