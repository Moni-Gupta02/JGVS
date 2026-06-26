import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  APP_CONFIG,
  TOP_BAR_LINKS,
  NAV_LINKS,
  SOCIAL_LINKS,
} from '../../constants';
import { useScrollPosition, useMobileMenu } from '../../hooks';
import { Button } from '../ui';
import './Header.css';

function SocialIcon({ name }) {
  const icons = {
    facebook: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.063 2.063 0 01-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  };
  return icons[name] || null;
}

function NavDropdown({ item, onClose }) {
  const [open, setOpen] = useState(false);

  return (
    <li
      className="nav-item nav-item--dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="nav-link nav-link--dropdown"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {item.label}
        <svg className="nav-chevron" viewBox="0 0 12 12" width="10" height="10">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>
      {open && (
        <ul className="dropdown-menu">
          {item.children.map((child) => (
            <li key={child.path}>
              <Link to={child.path} className="dropdown-link" onClick={onClose}>
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function Header() {
  const scrolled = useScrollPosition(50);
  const { isOpen, toggle, close } = useMobileMenu();

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="top-bar">
        <div className="container top-bar__inner">
          <p className="top-bar__tagline">{APP_CONFIG.tagline}</p>
          <div className="top-bar__right">
            <nav className="top-bar__links" aria-label="Utility navigation">
              {TOP_BAR_LINKS.map((link, i) => (
                <span key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                  {i < TOP_BAR_LINKS.length - 1 && <span className="top-bar__sep">|</span>}
                </span>
              ))}
            </nav>
            <div className="top-bar__lang">
              <span aria-hidden="true">🌐</span> English
            </div>
            <div className="top-bar__social">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="main-nav">
        <div className="container main-nav__inner">
          <Link to="/" className="logo" onClick={close}>
            <span className="logo__icon" aria-hidden="true">🌿</span>
            <div className="logo__text">
              <span className="logo__name">SAARK</span>
              <span className="logo__sub">Philanthropy Foundation</span>
            </div>
          </Link>

          <nav className={`nav ${isOpen ? 'nav--open' : ''}`} aria-label="Main navigation">
            <ul className="nav__list">
              {NAV_LINKS.map((item) =>
                item.children ? (
                  <NavDropdown key={item.label} item={item} onClose={close} />
                ) : (
                  <li key={item.label} className="nav-item">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `nav-link ${isActive && item.path === '/' ? 'nav-link--active' : ''}`
                      }
                      end={item.path === '/'}
                      onClick={close}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
            <div className="nav__mobile-cta">
              <Button to="/donor/donate" variant="secondary" fullWidth icon="❤️">
                Donate Now
              </Button>
            </div>
          </nav>

          <Button to="/donor/donate" variant="secondary" size="sm" className="header-cta" icon="❤️">
            Donate Now
          </Button>

          <button
            type="button"
            className={`hamburger ${isOpen ? 'hamburger--open' : ''}`}
            onClick={toggle}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
