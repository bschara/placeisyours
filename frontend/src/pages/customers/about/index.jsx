// import React from "react";
// import CustomerNavbar from "../../../components/navbar";
// import "./about.css";

// const AboutPage = () => {
//   return (
//     <>
//       <CustomerNavbar />
//       <div className="text-home">
//         <h1>MISSION STATEMENT</h1>
//         <p>
//           At Theplaceisyours, our mission is to celebrate Lebanese culture,
//           arts, and streetwear by creating a unique thrift shopping experience
//           rooted in community and sustainability. We strive to offer our
//           customers not just fashion, but a sense of belonging and welcome, with
//           every piece we curate. Online shopping can be tricky, and we get it.
//           That’s why through our tailoring services, we ensure that every item
//           fits perfectly, making fashion accessible and personal. We are
//           committed to environmental responsibility by embracing thrifted
//           treasures and using reusable bags, contributing to a more sustainable
//           future for all.
//         </p>
//         <h1>VISION STATEMENT</h1>
//         <p>
//           Since day 1, Theplaceisyours was a vision to become a leading beacon
//           of Lebanese cultural expression and sustainable fashion. We have
//           always aimed to foster a thriving, inclusive community where every
//           individual feels like a friend more than a passing customer. We aspire
//           to set a new standard for thrift shopping—one where every person finds
//           not only their style but also a place they truly belong.
//         </p>
//         <h1>TAILORING SERVICE</h1>
//         <p>
//           At Theplaceisyours, we proudly offer a unique complimentary tailoring
//           service. Whether a T-shirt is a size Large, and you need a Small, or
//           any other adjustments are necessary, we've got you covered at no extra
//           cost. Thanks to our reliable Lebanese tailoring team, we can resize
//           down on any item to your exact measurements, ensuring the perfect fit
//           for any piece you desire. Here, sizing is never an obstacle—if you
//           love it, you can have it in your size.
//         </p>
//         <h1>Refund and Return Policy</h1>
//         <p>
//           All of our times are listed correctly based on their true to-fit
//           sizes. We encourage you to ask for dimensions or modeled pictures, so
//           you’re guaranteed order satisfaction. Refunds & Returns are not
//           accepted.
//         </p>
//       </div>
//     </>
//   );
// };

// export default AboutPage;

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
              At Theplaceisyours, our mission is to celebrate Lebanese culture,
              arts, and streetwear by creating a unique thrift shopping
              experience rooted in community and sustainability. We strive to
              offer our customers not just fashion, but a sense of belonging and
              welcome, with every piece we curate. Online shopping can be
              tricky, and we get it. That’s why through our tailoring services,
              we ensure that every item fits perfectly, making fashion
              accessible and personal. We are committed to environmental
              responsibility by embracing thrifted treasures and using reusable
              bags, contributing to a more sustainable future for all.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-content">
            <h1>VISION STATEMENT</h1>
            <p>
              Since day 1, Theplaceisyours was a vision to become a leading
              beacon of Lebanese cultural expression and sustainable fashion. We
              have always aimed to foster a thriving, inclusive community where
              every individual feels like a friend more than a passing customer.
              We aspire to set a new standard for thrift shopping— one where
              every person finds not only their style but also a place they
              truly belong.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-content">
            <h1>TAILORING SERVICE</h1>
            <p>
              At Theplaceisyours, we proudly offer a unique complimentary
              tailoring service. Whether a T-shirt is a size Large, and you need
              a Small, or any other adjustments are necessary, we've got you
              covered at no extra cost. Thanks to our reliable Lebanese
              tailoring team, we can resize down on any item to your exact
              measurements, ensuring the perfect fit for any piece you desire.
              Here, sizing is never an obstacle—if you love it, you can have it
              in your size.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-content">
            <h1>Refund and Return Policy</h1>
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
