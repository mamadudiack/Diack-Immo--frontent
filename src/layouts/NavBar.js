import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import logo from "../layouts/imgs/logo.jpg";

/* ─── Icônes SVG inline (supprime react-icons) ─── */
const IconUser = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconLogout = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconGrid = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);
const IconHistory = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);
const IconShield = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconChevron = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="rgba(200,169,106,0.7)" strokeWidth="2"
    style={{ transition: "transform 0.25s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
  >
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const getInitials = (name = "") =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

/* ══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
const NavBar = () => {
  const [user, setUser]         = useState(null);
  const [open, setOpen]         = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef             = useRef(null);
  const navRef                  = useRef(null);
  const navigate                = useNavigate();

  useEffect(() => {
    const token    = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      try { setUser(JSON.parse(userData)); }
      catch { localStorage.removeItem("token"); localStorage.removeItem("user"); }
    }
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setOpen(false);
      if (
        navRef.current &&
        !navRef.current.contains(e.target) &&
        !e.target.closest('.nb__menu-toggle')
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setOpen(false);
    navigate("/login");
  };

  const isAdmin = user?.role === "admin";

  return (
    <header className={`nb${scrolled ? " nb--scrolled" : ""}`}>

      {/* ── LOGO ── */}
      <Link to="/" className="nb__logo">
        <div className="nb__logo-img">
          <img src={logo} alt="SEN IMMO" />
        </div>
        <div className="nb__brand">
          <span className="nb__brand-main">SEN IMMO</span>
          <span className="nb__brand-sub">Immobilier · Dakar</span>
        </div>
      </Link>

      {/* ── NAVIGATION ── */}
      <button
        type="button"
        className={`nb__menu-toggle${menuOpen ? " nb__menu-toggle--open" : ""}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-expanded={menuOpen}
        aria-label="Ouvrir le menu"
      >
        <span className="nb__menu-icon" />
      </button>

      <nav ref={navRef} className={`nb__nav${menuOpen ? " nb__nav--open" : ""}`}>
        <ul>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/properties" onClick={() => setMenuOpen(false)}>Mes projets</Link></li>
          {isAdmin ? (
            <li><Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link></li>
          ) : (
            <>
              <li><Link to="/profile/transactionsHistory" onClick={() => setMenuOpen(false)}>Historique</Link></li>
              <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            </>
          )}
        </ul>
      </nav>

      {/* ── PROFIL / LOGIN ── */}
      <div className="nb__right">
        {user ? (
          <div className="nb__profile" ref={dropdownRef}>

            {/* Trigger cliquable */}
            <button
              className={`nb__trigger${open ? " nb__trigger--open" : ""}`}
              onClick={() => setOpen((v) => !v)}
            >
              <div className={`nb__avatar${isAdmin ? " nb__avatar--admin" : ""}`}>
                {getInitials(user.fullname)}
              </div>
              <div className="nb__trigger-info">
                <span className="nb__trigger-name">{user.fullname}</span>
                {isAdmin && <span className="nb__trigger-badge">Admin</span>}
              </div>
              <IconChevron open={open} />
            </button>

            {/* Dropdown */}
            <div className={`nb__dropdown${open ? " nb__dropdown--open" : ""}`}>

              {/* En-tête carte */}
              <div className="nb__dd-header">
                <div className={`nb__dd-avatar${isAdmin ? " nb__dd-avatar--admin" : ""}`}>
                  {getInitials(user.fullname)}
                </div>
                <div>
                  <p className="nb__dd-name">{user.fullname}</p>
                  <p className="nb__dd-role">{isAdmin ? "Administrateur" : "client"}</p>
                </div>
              </div>

              {/* Items */}
              <div className="nb__dd-menu">
                <Link to="/profile" className="nb__dd-item" onClick={() => setOpen(false)}>
                  <IconUser /> <span>Mon profil</span>
                </Link>
                <Link to="/properties" className="nb__dd-item" onClick={() => setOpen(false)}>
                  <IconGrid /> <span>Mes projets</span>
                </Link>

                {isAdmin ? (
                  <Link to="/admin" className="nb__dd-item nb__dd-item--admin" onClick={() => setOpen(false)}>
                    <IconShield /> <span>Dashboard Admin</span>
                  </Link>
                ) : (
                  <Link to="/profile/transactionsHistory" className="nb__dd-item" onClick={() => setOpen(false)}>
                    <IconHistory /> <span>Historique</span>
                  </Link>
                )}

                <div className="nb__dd-sep" />

                <button className="nb__dd-logout" onClick={handleLogout}>
                  <IconLogout /> <span>Déconnexion</span>
                </button>
              </div>

            </div>
          </div>
        ) : (
          <Link to="/login" className="nb__btn-login">
            <IconUser size={14} />
            Connexion
          </Link>
        )}
      </div>

    </header>
  );
};

export default NavBar;
