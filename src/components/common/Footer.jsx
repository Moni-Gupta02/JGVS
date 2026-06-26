import { Link } from 'react-router-dom';
import {
  APP_CONFIG,
  SOCIAL_LINKS,
  FOOTER_QUICK_LINKS,
  FOOTER_PROGRAM_LINKS,
  FOOTER_INVOLVE_LINKS,
} from '../../constants';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-icon" aria-hidden="true">🌿</span>
              <div>
                <span className="footer__logo-name">SAARK</span>
                <span className="footer__logo-sub">Philanthropy Foundation</span>
              </div>
            </Link>
            <p className="footer__about">
              Empowering rural communities through education, healthcare, sustainable agriculture,
              women empowerment, and environmental conservation across India.
            </p>
            <div className="footer__social">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="footer__social-link"
                >
                  {social.name.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          <div className="footer__column">
            <h4 className="footer__heading">Quick Links</h4>
            <ul>
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__column">
            <h4 className="footer__heading">Our Programs</h4>
            <ul>
              {FOOTER_PROGRAM_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__column">
            <h4 className="footer__heading">Get Involved</h4>
            <ul>
              {FOOTER_INVOLVE_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__column footer__contact">
            <h4 className="footer__heading">Contact Us</h4>
            <address>
              <p>
                <span aria-hidden="true">📍</span>
                {APP_CONFIG.contact.address}
              </p>
              <p>
                <span aria-hidden="true">📞</span>
                <a href={`tel:${APP_CONFIG.contact.phone}`}>{APP_CONFIG.contact.phone}</a>
              </p>
              <p>
                <span aria-hidden="true">✉️</span>
                <a href={`mailto:${APP_CONFIG.contact.email}`}>{APP_CONFIG.contact.email}</a>
              </p>
            </address>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>&copy; {currentYear} {APP_CONFIG.name}. All rights reserved.</p>
          <nav className="footer__legal" aria-label="Legal links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/refund">Refund Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
