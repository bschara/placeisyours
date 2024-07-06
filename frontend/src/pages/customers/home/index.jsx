// import React, { useState, useEffect } from "react";
// import CustomerNavbar from "../../../components/navbar";
// import "./homePage.css";

// const HomePage = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMailingListOpen, setIsMailingListOpen] = useState(false);
//   const [isMobileView, setIsMobileView] = useState(false);
//   const spotifyEmbedUrl =
//     "https://open.spotify.com/embed/playlist/1iT91qeUzL9955M1y3iBDg?utm_source=generator";

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobileView(window.innerWidth <= 768);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const toggleMailingList = () => {
//     setIsMailingListOpen(!isMailingListOpen);
//   };

//   return (
//     <div className="whole-home-page">
//       <CustomerNavbar />
//       <div className="home-page">
//         <div className="first-side">
//           <div className="text-pod">
//             <h1>Welcome to Theplaceisyours</h1>
//           </div>
//         </div>
//         <div className="second-side">
//           <div className="playlist-dropdown">
//             <button
//               onClick={toggleDropdown}
//               className={`dropdown-button ${isMobileView ? "mobile-view" : ""}`}
//             >
//               {isMobileView
//                 ? "Discover Our Playlist"
//                 : isDropdownOpen
//                 ? "Hide Playlist"
//                 : "Discover Our Playlist"}
//             </button>
//             {isDropdownOpen && (
//               <div className="playlist-content">
//                 <iframe
//                   title="spotify-integ"
//                   src={spotifyEmbedUrl}
//                   width="100%"
//                   height="380"
//                   frameBorder="0"
//                   allow="encrypted-media"
//                 ></iframe>
//               </div>
//             )}
//           </div>
//           {isMobileView && (
//             <div className="mailing-list">
//               <button
//                 onClick={toggleMailingList}
//                 className="dropdown-button mobile-view"
//               >
//                 {isMailingListOpen
//                   ? "Hide Mailing List"
//                   : "Subscribe to our Mailing List"}
//               </button>
//               {isMailingListOpen && (
//                 <div className="mailing-list-content">
//                   <form>
//                     <input
//                       type="email"
//                       placeholder="Enter your email"
//                       required
//                     />
//                     <input type="submit" value="Subscribe" />
//                   </form>
//                 </div>
//               )}
//             </div>
//           )}
//           {!isMobileView && (
//             <div className="mailing-list">
//               <h2>Subscribe to our Mailing List</h2>
//               <form>
//                 <input type="email" placeholder="Enter your email" required />
//                 <input type="submit" value="Subscribe" />
//               </form>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
import React, { useState, useEffect } from "react";
import CustomerNavbar from "../../../components/navbar";
import "./homePage.css";

const HomePage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMailingListOpen, setIsMailingListOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [email, setEmail] = useState(""); // Add state for email
  const [message, setMessage] = useState(""); // Add state for feedback message
  const spotifyEmbedUrl =
    "https://open.spotify.com/embed/playlist/1iT91qeUzL9955M1y3iBDg?utm_source=generator";

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMailingList = () => {
    setIsMailingListOpen(!isMailingListOpen);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://192.168.1.9:8081/api/mailingList/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Successfully subscribed to the mailing list!");
      } else {
        const errorData = await response.json();
        setMessage(`Error: email already subscribed to mailing list`);
      }
    } catch (error) {
      setMessage("Failed to subscribe to the mailing list.");
    }
  };

  return (
    <div className="whole-home-page">
      <CustomerNavbar />
      <div className={`home-page ${isMobileView ? "mobile-view" : ""}`}>
        <div className="first-part">
          <h1>Welcome to Theplaceisyours</h1>
        </div>
        <div className="second-part">
          <div className="playlist-dropdown">
            <button
              onClick={toggleDropdown}
              className={`dropdown-button ${isMobileView ? "mobile-view" : ""}`}
            >
              {isMobileView
                ? "Discover Our Playlist"
                : isDropdownOpen
                ? "Hide Playlist"
                : "Discover Our Playlist"}
            </button>
            {isDropdownOpen && (
              <div className="playlist-content">
                <iframe
                  title="spotify-integ"
                  src={spotifyEmbedUrl}
                  width="100%"
                  height="380"
                  frameBorder="0"
                  allow="encrypted-media"
                ></iframe>
              </div>
            )}
          </div>
          <div className="mailing-list">
            {isMobileView ? (
              <>
                <button
                  onClick={toggleMailingList}
                  className="dropdown-button mobile-view"
                >
                  {isMailingListOpen
                    ? "Hide Mailing List"
                    : "Subscribe to our Mailing List"}
                </button>
                {isMailingListOpen && (
                  <div className="mailing-list-content">
                    <form onSubmit={handleSubscribe}>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                      <input type="submit" value="Subscribe" />
                    </form>
                    {message && <p>{message}</p>}
                  </div>
                )}
              </>
            ) : (
              <>
                <h2>Subscribe to our Mailing List</h2>
                <form onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  <input type="submit" value="Subscribe" />
                </form>
                {message && <p>{message}</p>}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;