import "./Footer.css";

/* ─── Icônes SVG inline ─── */
const IconFacebook = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IconLinkedin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const IconInstagram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);
const IconTwitter = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M2 3h6.5l13 18H15L2 3z"/>
    <path d="M15 3h4L9 21H5l10-18z" fill="none"/>
  </svg>
);
const IconMail = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconPhone = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.59a16 16 0 0 0 5.5 5.5l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
  </svg>
);
const IconPin = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="ft">

      {/* ── FILET DORÉ ── */}
      <div className="ft__topline" />

      {/* ── CORPS ── */}
      <div className="ft__body">

        {/* Colonne 1 — Marque */}
        <div className="ft__col ft__col--brand">
          <div className="ft__logo-wrap">
            <span className="ft__logo-initials">SI</span>
            <div>
              <p className="ft__logo-name">SEN IMMO</p>
              <p className="ft__logo-sub">Immobilier · Dakar</p>
            </div>
          </div>
          <p className="ft__tagline">
            Trouvez les meilleures maisons à louer ou à vendre.
            Nous vous accompagnons dans votre projet immobilier.
          </p>
          <div className="ft__socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="ft__social" aria-label="Facebook">
              <IconFacebook />
            </a>
            <a href="https://www.linkedin.com/in/mamadou-diack-73abaa316/" target="_blank" rel="noreferrer" className="ft__social" aria-label="LinkedIn">
              <IconLinkedin />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="ft__social" aria-label="Instagram">
              <IconInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="ft__social" aria-label="Twitter / X">
              <IconTwitter />
            </a>
          </div>
        </div>

        {/* Colonne 2 — Navigation */}
        <div className="ft__col">
          <h4 className="ft__col-title">Navigation</h4>
          <ul className="ft__links">
            <li><a href="/">Accueil</a></li>
            <li><a href="/properties">Nos biens</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Colonne 3 — Contact */}
        <div className="ft__col">
          <h4 className="ft__col-title">Contact</h4>
          <ul className="ft__contact-list">
            <li>
              <span className="ft__contact-icon"><IconMail /></span>
              <span>contact@senimmo.sn</span>
            </li>
            <li>
              <span className="ft__contact-icon"><IconPhone /></span>
              <span>+221 77 000 00 00</span>
            </li>
            <li>
              <span className="ft__contact-icon"><IconPin /></span>
              <span>Dakar, Sénégal</span>
            </li>
          </ul>
        </div>

      </div>

      {/* ── BARRE BAS ── */}
      <div className="ft__bar">
        <span>© 2026 SEN IMMO — Tous droits réservés</span>
        <span className="ft__bar-sep">·</span>
        <span>Dakar, Sénégal</span>
      </div>

    </footer>
  );
};

export default Footer;

// import { FaFacebook, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
// import "./Footer.css";
// const Footer = () => {
//   return (
//     <footer >

//       <div style={{backgroundColor:"black",color:"white",textAlign:"center",padding:"50px"}}>

//         <div>
       
//           <p style={{fontFamily:"ui-monospace",fontSize:"1.2rem"}}>
//             Trouvez les meilleures maisons à louer ou à vendre.
//             Nous vous accompagnons dans votre projet immobilier.
//           </p>
//         </div >
//            <div style={{display:"flex", fontSize:"1.8rem", gap:"8px",justifyContent:"center"}}>
//              <a href="https://facebook.com" target="_blank" rel="noreferrer"  style={{color:"brown"}}>
//               <FaFacebook />
//             </a>

//             <a href="https://linkedin.com" target="_blank" rel="noreferrer"    style={{color:"brown"}}>
//               <FaLinkedin />
//             </a>

//             <a href="https://instagram.com" target="_blank" rel="noreferrer"  style={{color:"brown"}}>
//               <FaInstagram />
//             </a>

//             <a href="https://twitter.com" target="_blank" rel="noreferrer"  style={{color:"brown"}}>
//               <FaTwitter />
//             </a>
//            </div>
       

//         <div>
//           <h3>Contact</h3>
//           <p  style={{fontFamily:"sans-serif"}} >Email : contact@email.com</p>
//           <p style={{fontFamily:"serif"}} >Téléphone : +221 77 000 00 00</p>
//           <p style={{fontFamily:"fantasy", fontSize:"1.2rem"}}>Dakar, Sénégal</p>
//         </div>

//       </div>

//       <div style={{backgroundColor:"red",padding:"5px ",textAlign:"center",color:"white"}}>
//         <p>© 2026 SEN IMMO - Tous droits réservés</p>
//       </div>

//     </footer>
//   );
// };

// export default Footer;