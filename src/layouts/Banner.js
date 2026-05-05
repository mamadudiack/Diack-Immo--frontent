import React from "react";
import image from './imgs/senImmo.jpg';
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@300;400;500&display=swap');

        .profile-banner {
          position: relative;
          width: 100%;
          height: 75vh;
          overflow: hidden;
          font-family: 'Montserrat', sans-serif;
        }

        .profile-banner__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transform: scale(1.04);
          transition: transform 8s ease;
        }

        .profile-banner:hover .profile-banner__img {
          transform: scale(1.0);
        }

        /* Dark gradient overlay */
        .profile-banner__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(10, 10, 10, 0.68) 0%,
            rgba(10, 10, 10, 0.30) 60%,
            rgba(10, 10, 10, 0.08) 100%
          );
        }

        /* Thin gold decorative line */
        .profile-banner__line {
          position: absolute;
          left: 9%;
          top: 50%;
          transform: translateY(-50%);
          width: 2px;
          height: 120px;
          background: linear-gradient(to bottom, transparent, #c9a96e, transparent);
        }

        .profile-banner__content {
          position: absolute;
          top: 50%;
          left: 12%;
          transform: translateY(-50%);
          color: #fff;
          max-width: 480px;
        }

        .profile-banner__eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #c9a96e;
          margin-bottom: 16px;
          opacity: 0.9;
        }

        .profile-banner__title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 300;
          line-height: 1.15;
          letter-spacing: 0.01em;
          color: #fff;
          margin: 0 0 32px 0;
        }

        .profile-banner__title span {
          font-weight: 600;
          font-style: italic;
          color: #e8d5b0;
        }

        .profile-banner__btn {
          display: inline-block;
          position: relative;
          padding: 0;
          background: transparent;
          border: none;
          cursor: pointer;
          text-decoration: none;
        }

        .profile-banner__btn-inner {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 14px 36px;
          border: 1px solid rgba(201, 169, 110, 0.6);
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: color 0.4s ease, border-color 0.4s ease;
          background: rgba(201, 169, 110, 0.08);
          backdrop-filter: blur(4px);
        }

        .profile-banner__btn-inner::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #c9a96e;
          transform: translateX(-101%);
          transition: transform 0.45s cubic-bezier(0.77, 0, 0.18, 1);
          z-index: 0;
        }

        .profile-banner__btn-inner:hover::before {
          transform: translateX(0);
        }

        .profile-banner__btn-inner:hover {
          color: #1a1208;
          border-color: #c9a96e;
        }

        .profile-banner__btn-text {
          position: relative;
          z-index: 1;
        }

        .profile-banner__btn-arrow {
          position: relative;
          z-index: 1;
          width: 18px;
          height: 1px;
          background: currentColor;
          transition: width 0.3s ease;
        }

        .profile-banner__btn-arrow::after {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          width: 6px;
          height: 6px;
          border-right: 1px solid currentColor;
          border-top: 1px solid currentColor;
        }

        .profile-banner__btn-inner:hover .profile-banner__btn-arrow {
          width: 24px;
        }

        /* Bottom tag */
        .profile-banner__badge {
          position: absolute;
          bottom: 32px;
          right: 40px;
          color: rgba(255,255,255,0.4);
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }

        @media (max-width: 900px) {
          .profile-banner {
            height: 60vh;
          }

          .profile-banner__content {
            left: 8%;
            top: 45%;
            max-width: 420px;
          }

          .profile-banner__badge {
            right: 24px;
            bottom: 24px;
          }
        }

        @media (max-width: 640px) {
          .profile-banner {
            height: 52vh;
          }

          .profile-banner__line {
            display: none;
          }

          .profile-banner__content {
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 92%;
            padding: 0 1rem;
            text-align: center;
          }

          .profile-banner__btn-inner {
            width: 100%;
            justify-content: center;
            padding: 12px 18px;
          }

          .profile-banner__title {
            font-size: clamp(2rem, 7vw, 2.8rem);
          }

          .profile-banner__badge {
            position: static;
            transform: none;
            writing-mode: horizontal-tb;
            margin: 1rem auto 0;
          }
        }
      `}</style>

      <div className="profile-banner">
        <img src={image} alt="banner" className="profile-banner__img" />
        <div className="profile-banner__overlay" />
        <div className="profile-banner__line" />

        <div className="profile-banner__content">
          <p className="profile-banner__eyebrow">Immobilier de prestige</p>
          <h1 className="profile-banner__title">
            Découvrez nos <span>projets</span> d'exception
          </h1>

          <Link to="/properties" className="profile-banner__btn">
            <span className="profile-banner__btn-inner">
              <span className="profile-banner__btn-text">Mes projets</span>
              <span className="profile-banner__btn-arrow" />
            </span>
          </Link>
        </div>

        <p className="profile-banner__badge">Sénégal Immobilier</p>
      </div>
    </>
  );
};

export default Banner;
// import React from "react";


// // import image from './imgs/immo.jpg'
// import image from './imgs/senImmo.jpg'
// import { Link } from "react-router-dom";
// const Profile = () => {
//     return(
//         <div style={{ position: "relative", width: "100%" }}>
      
//          <img src={image} alt="banner"  style={{width:"100%",height:"75vh"}}    />
//        <button
//      style={{
//       position: "absolute",
//       top: "50%",
//       left: "20%",
//       transform: "translate(-50%, -50%)",
//       padding: "10px 80px",
//       backgroundColor: "red",
//       color: "white",
//       border: "none",
//       cursor: "pointer",
//       borderRadius:"8px"
//     }}
//   >
//     <Link to="/properties" style={{ color: "white", textDecoration: "none", fontSize: "18px" }}> Mes projects  
//     </Link>  

//   </button>
     
//         </div>
//     )
// }
// export default Profile ;
