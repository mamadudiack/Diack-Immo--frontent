import React from "react";

const HomeWork = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .hw-root {
          background: #faf8f5;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }

        /* ── HERO TEXT SECTION ── */
        .hw-hero {
          position: relative;
          text-align: center;
          padding: 90px 12% 70px;
        }

        /* background watermark number */
        .hw-hero::before {
          content: 'SenegIndia';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(5rem, 14vw, 12rem);
          font-weight: 600;
          color: rgba(139, 26, 26, 0.04);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          letter-spacing: 0.05em;
        }

        .hw-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .hw-eyebrow-line {
          width: 28px;
          height: 1px;
          background: #c9a96e;
        }

        .hw-eyebrow-text {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #c9a96e;
        }

        .hw-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4.5vw, 3.4rem);
          font-weight: 600;
          color: #1a1208;
          line-height: 1.2;
          margin: 0 auto 10px;
          max-width: 800px;
        }

        .hw-title-alt {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.4rem, 3vw, 2.1rem);
          font-weight: 300;
          font-style: italic;
          color: #8b1a1a;
          margin: 0 auto 32px;
          max-width: 720px;
          line-height: 1.4;
        }

        .hw-subtitle {
          font-size: 1rem;
          font-weight: 300;
          color: #6b5e50;
          line-height: 1.8;
          max-width: 580px;
          margin: 0 auto 8px;
        }

        /* ── STATS BAND ── */
        .hw-stats {
          position: relative;
          display: flex;
          justify-content: center;
          gap: 0;
          margin: 56px 8% 0;
          border: 1px solid rgba(201, 169, 110, 0.25);
          background: #fff;
        }

        .hw-stat {
          flex: 1;
          text-align: center;
          padding: 40px 24px;
          position: relative;
        }

        .hw-stat + .hw-stat::before {
          content: '';
          position: absolute;
          left: 0;
          top: 20%;
          height: 60%;
          width: 1px;
          background: rgba(201, 169, 110, 0.3);
        }

        .hw-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-weight: 600;
          color: #8b1a1a;
          line-height: 1;
          display: block;
        }

        .hw-stat-unit {
          font-size: 0.85rem;
          color: #c9a96e;
          font-weight: 500;
          letter-spacing: 0.1em;
        }

        .hw-stat-label {
          display: block;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #9a8f80;
          margin-top: 10px;
        }

        /* ── LUXURY APT SECTION ── */
        .hw-luxury {
          position: relative;
          margin: 72px 8% 80px;
          display: flex;
          align-items: center;
          gap: 60px;
        }

        /* large decorative number */
        .hw-luxury-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(7rem, 18vw, 15rem);
          font-weight: 600;
          color: rgba(139, 26, 26, 0.06);
          line-height: 1;
          flex-shrink: 0;
          user-select: none;
          pointer-events: none;
        }

        .hw-luxury-content {
          flex: 1;
          border-left: 2px solid #c9a96e;
          padding-left: 40px;
        }

        .hw-luxury-eyebrow {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #c9a96e;
          margin-bottom: 16px;
          display: block;
        }

        .hw-luxury-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 600;
          color: #1a1208;
          line-height: 1.2;
          margin: 0 0 20px;
        }

        .hw-luxury-title em {
          font-style: italic;
          color: #8b1a1a;
        }

        .hw-luxury-text {
          font-size: 0.95rem;
          font-weight: 300;
          line-height: 1.85;
          color: #5a4f42;
          margin: 0 0 32px;
          max-width: 520px;
        }

        /* tags */
        .hw-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .hw-tag {
          padding: 7px 18px;
          border: 1px solid rgba(201, 169, 110, 0.5);
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #8b6f3e;
          font-weight: 500;
          background: rgba(201, 169, 110, 0.06);
        }

        @media (max-width: 768px) {
          .hw-hero { padding: 60px 6% 50px; }
          .hw-stats { flex-direction: column; margin: 40px 6% 0; }
          .hw-stat + .hw-stat::before { top: 0; left: 10%; width: 80%; height: 1px; }
          .hw-luxury { flex-direction: column; gap: 0; margin: 48px 6% 60px; }
          .hw-luxury-num { display: none; }
          .hw-luxury-content { border-left: none; border-top: 2px solid #c9a96e; padding-left: 0; padding-top: 32px; }
        }
      `}</style>

      <div className="hw-root">

        {/* ── HERO ── */}
        <section className="hw-hero">
          <div className="hw-eyebrow">
            <span className="hw-eyebrow-line" />
            <span className="hw-eyebrow-text">Immobilier au Sénégal</span>
            <span className="hw-eyebrow-line" />
          </div>

          <h1 className="hw-title">
            Votre nouveau chez-vous<br />de Dakar à Thiès
          </h1>

          <p className="hw-title-alt">
            De Yoff à Diamniadio, du Point-E à Bambilor,<br />
            nous couvrons tous vos besoins.
          </p>

          <p className="hw-subtitle">
            Trouvez la maison parfaite dans le lieu qui vous convient —
            explorez toutes les propriétés disponibles et découvrez celle
            qui correspond à votre vision.
          </p>
        </section>

        {/* ── STATS ── */}
        <div className="hw-stats">
          <div className="hw-stat">
            <span className="hw-stat-num">2020</span>
            <span className="hw-stat-label">Depuis</span>
          </div>
          <div className="hw-stat">
            <span className="hw-stat-num">100 000<span className="hw-stat-unit">m²</span></span>
            <span className="hw-stat-label">Surface bâtie</span>
          </div>
          <div className="hw-stat">
            <span className="hw-stat-num">1 000<span className="hw-stat-unit">+</span></span>
            <span className="hw-stat-label">Clients satisfaits</span>
          </div>
        </div>

        {/* ── LUXURY SECTION ── */}
        <section className="hw-luxury">
          <span className="hw-luxury-num" aria-hidden="true">01</span>

          <div className="hw-luxury-content">
            <span className="hw-luxury-eyebrow">Notre offre phare</span>
            <h2 className="hw-luxury-title">
              Appartements<br />de <em>luxe</em>
            </h2>
            <p className="hw-luxury-text">
              Vue sur mer ou au cœur du centre d'affaires du Point-E, nos appartements
              de luxe vous offrent le meilleur de Dakar. Des espaces pensés pour l'excellence,
              dans des emplacements d'exception.
            </p>
            <div className="hw-tags">
              <span className="hw-tag">Vue sur mer</span>
              <span className="hw-tag">Point-E</span>
              <span className="hw-tag">Titre Foncier</span>
              <span className="hw-tag">Normes ISO</span>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default HomeWork;

