import { useState } from "react";
import CustomerNavbar from "../../../components/navbar";
import "./dreamPage.css";

const DreamPage = () => {
  const [answer, setAnswer] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://theplaceisyours.club/api/answers/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answer }),
        }
      );

      if (response.ok) {
        alert("answer received!");
      } else {
        alert("you have made too many requests ");
      }
    } catch (error) {
      alert("error", error);
    }
  };

  return (
    <>
      <CustomerNavbar />
      <div className="dream-page">
        <div className="container">
          <p>
            Tell us what your dream is, we'll ask you about it at the end of the
            year. These next 5 months are yours.
          </p>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your dream"
          />
          <button onClick={handleSubscribe}>Submit</button>
          <div className="remark">
            <p>*leave your info at the end to contact you</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DreamPage;
