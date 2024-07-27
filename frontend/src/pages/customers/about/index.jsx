import React from "react";
import CustomerNavbar from "../../../components/navbar";
import "./about.css";

const AboutPage = () => {
  return (
    <>
      <CustomerNavbar />
      <div className="about-container">
        <section className="section">
          <div className="section-content">
            <h1>MISSION STATEMENT</h1>
            <p>
              At Theplaceisyours, our mission is to create a positive impact
              through sustainable fashion, guided by trust, innovation, and
              integrity. We celebrate Lebanese culture with a unique thrift
              shopping experience that fosters community and belonging.
              Committed to eco-friendly practices and personalized service, we
              aim to make fashion accessible and responsible.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-content">
            <h1>VISION STATEMENT</h1>
            <p>
              Since day one, Theplaceisyours has envisioned becoming a vessel of
              Lebanese cultural expression and sustainable fashion. Our goal has
              always been to cultivate a thriving, inclusive community where
              every individual feels like a friend rather than a mere passing
              customer. We strive to set a new standard for thrift shopping, one
              where everyone not only discovers their unique style but also
              finds a place where they truly belong.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-content">
            <h1>TAILORING SERVICE</h1>
            <p>
              At Theplaceisyours, we proudly offer a unique complimentary
              tailoring service. Thanks to our reliable Lebanese tailoring team,
              we can resize down any item to your exact measurements, ensuring
              the perfect fit for any piece you desire. Whether a T-shirt is a
              size Large, and you need a Small, or any other adjustments are
              necessary, we've got you covered at no extra cost.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-content">
            <div className="refund-title">
              <h1>Refund and Return Policy</h1>
            </div>
            <p>
              All of our items are listed with accurate sizes. We encourage you
              to ask for dimensions or modeled pictures to guarantee order
              satisfaction. Refunds and returns are not accepted unless there is
              a defect or error on our part.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
