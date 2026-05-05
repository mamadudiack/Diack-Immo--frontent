import { useState, useEffect } from "react";
import maison from './imgs/maison.jpg';
import couloir from './imgs/couloir.jpg';
import salon from './imgs/salon.png';
import logo from "../layouts/imgs/logo.jpg";

const Apropos = () => {
  const images = [maison, couloir, salon];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .ap-section {
          display: flex;
          align-items: stretch;
          min-height: 80vh;
          background: #faf8f5;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }

        /* ── LEFT: image panel ── */
        .ap-image-panel {
          position: relative;
          width: 52%;
          flex-shrink: 0;
          overflow: hidden;
        }

        .ap-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          opacity: ${fade ? 1 : 0};
          transform: ${fade ? 'scale(1)' : 'scale(1.03)'};
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        /* dark gradient on image right edge → merges into content */
        .ap-image-panel::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(20, 15, 10, 0.10) 60%,
            rgba(250, 248, 245, 0.90) 100%
          );
          pointer-events: none;
        }

        /* dot indicators */
        .ap-dots {
          position: absolute;
          bottom: 28px;
          left: 28px;
          display: flex;
          gap: 8px;
          z-index: 2;
        }

        .ap-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.45);
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
          border: none;
          padding: 0;
        }

        .ap-dot.active {
          background: #c9a96e;
          transform: scale(1.4);
        }

        /* image counter */
        .ap-counter {
          position: absolute;
          bottom: 28px;
          right: 40px;
          font-size: 11px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.7);
          font-family: 'DM Sans', sans-serif;
          z-index: 2;
        }

        /* ── RIGHT: content panel ── */
        .ap-content {
          flex: 1;
          padding: 60px 52px 60px 44px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }

        .ap-logo {
          width: 110px;
          object-fit: contain;
          margin-bottom: 36px;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.10));
        }

        /* gold rule before eyebrow */
        .ap-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .ap-eyebrow-line {
          width: 32px;
          height: 1px;
          background: #c9a96e;
          flex-shrink: 0;
        }

        .ap-eyebrow-text {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #c9a96e;
        }

        .ap-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 700;
          line-height: 1.2;
          color: #1a1208;
          margin: 0 0 28px 0;
        }

        .ap-title em {
          font-style: italic;
          color: #8b1a1a;
        }

        .ap-divider {
          width: 48px;
          height: 2px;
          background: linear-gradient(to right, #c9a96e, transparent);
          margin-bottom: 28px;
          border: none;
        }

        .ap-text {
          font-size: 0.92rem;
          font-weight: 400;
          line-height: 1.8;
          color: #4a4035;
          margin: 0 0 18px 0;
        }

        .ap-text:last-of-type {
          margin-bottom: 36px;
        }

        /* stats row */
        .ap-stats {
          display: flex;
          gap: 32px;
          padding-top: 28px;
          border-top: 1px solid rgba(201, 169, 110, 0.25);
        }

        .ap-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #8b1a1a;
          line-height: 1;
        }

        .ap-stat-label {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #9a8f80;
          margin-top: 4px;
          font-weight: 500;
        }

        .ap-stat-divider {
          width: 1px;
          background: rgba(201, 169, 110, 0.3);
          align-self: stretch;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .ap-section { flex-direction: column; }
          .ap-image-panel { width: 100%; height: 45vh; }
          .ap-image-panel::after { background: linear-gradient(to bottom, transparent 60%, rgba(250,248,245,0.95) 100%); }
          .ap-content { padding: 40px 24px; }
        }
      `}</style>

      <section className="ap-section">

        {/* LEFT — sliding image */}
        <div className="ap-image-panel">
          <img src={images[index]} alt="SenegIndia" className="ap-image" />

          <div className="ap-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`ap-dot${i === index ? ' active' : ''}`}
                onClick={() => { setFade(false); setTimeout(() => { setIndex(i); setFade(true); }, 600); }}
              />
            ))}
          </div>

          <span className="ap-counter">0{index + 1} / 0{images.length}</span>
        </div>

        {/* RIGHT — content */}
        <div className="ap-content">
          <img src={logo} alt="SeneImmo logo" className="ap-logo"  />

          <div className="ap-eyebrow">
            <span className="ap-eyebrow-line" />
            <span className="ap-eyebrow-text">À propos de nous</span>
          </div>

          <h2 className="ap-title">
            Construire le <em>futur</em><br />ensemble
          </h2>

          <hr className="ap-divider" />

          <p className="ap-text">
            SeneImmo S.A est une entreprise sénégalaise spécialisée dans le secteur de la
            construction immobilière depuis 2018. Nous réalisons des projets ambitieux tels que
            <strong> BAVAROIS CITY</strong> à Yoff Virage, <strong>RD CITY</strong> à Diamniadio et{" "}
            <strong>SN CITY</strong> à Ndiakhirate, offrant des villas, appartements, bureaux
            et terrains viabilisés Titre Foncier.
          </p>

          <p className="ap-text">
            Grâce à notre expertise et notre certification <strong>ISO</strong>, nous garantissons
            des constructions respectant les normes internationales. Notre mission est de moderniser
            et urbaniser le Sénégal, notre vision de devenir un leader incontournable en Afrique,
            facilitant l'accès au logement pour tous.
          </p>

          {/* Stats */}
          <div className="ap-stats">
            <div>
              <div className="ap-stat-num">15+</div>
              <div className="ap-stat-label">Années d'expérience</div>
            </div>
            <div className="ap-stat-divider" />
            <div>
              <div className="ap-stat-num">3</div>
              <div className="ap-stat-label">Grands projets</div>
            </div>
            <div className="ap-stat-divider" />
            <div>
              <div className="ap-stat-num">ISO</div>
              <div className="ap-stat-label">Certifié</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Apropos;


