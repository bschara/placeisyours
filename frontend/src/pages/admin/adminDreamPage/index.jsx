import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import AdminNavbar from "../../../components/admiNavBar";

const AdminDreamPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const token = Cookies.get("authToken");

    if (!token) {
      navigate("/login");
    } else {
      axios
        .get("http://theplaceisyours.club/api/answers", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setAnswers(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the answers!", error);
        });
    }
  }, [navigate]);

  return (
    <div>
      <AdminNavbar />
      <p>admin place order page</p>
      <h2>All Answers</h2>
      <ul>
        {answers.map((answer) => (
          <li key={answer.id}>{answer.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDreamPage;
