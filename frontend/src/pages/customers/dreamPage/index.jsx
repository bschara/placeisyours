import { useState } from "react";
import CustomerNavbar from "../../../components/navbar";
import "./dreamPage.css";

const DreamPage = () => {
  const [answer, setAnswer] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {};

  return (
    <>
      <CustomerNavbar />
      <div className="dream-page">
        <div className="container">
          <p>
            Tell us what your dream is, we'll ask you about it 1 year from now.
            These next 5 months are yours.
          </p>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your dream"
          />
          <button>Submit</button>
          <div className="remark">
            <p>*leave your info at the end to contact you</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DreamPage;
