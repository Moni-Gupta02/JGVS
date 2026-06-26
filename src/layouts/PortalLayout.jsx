import { Link, Outlet, useLocation } from 'react-router-dom';
import { PORTAL_LINKS } from '../constants';
import './PortalLayout.css';

function PortalLayout({ portalKey }) {
  const location = useLocation();
  const portal = PORTAL_LINKS.find((p) => p.path === `/${portalKey}`);

  if (!portal) {
    return (
      <div className="portal-layout">
        <div className="container portal-error">
          <h1>Portal Not Found</h1>
          <Link to="/">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="portal-layout">
      <aside className="portal-sidebar">
        <div className="portal-sidebar__header">
          <Link to="/" className="portal-sidebar__home">← Back to Website</Link>
          <h2 className="portal-sidebar__title">{portal.title}</h2>
        </div>
        <nav className="portal-sidebar__nav" aria-label={`${portal.title} navigation`}>
          {portal.items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`portal-sidebar__link ${
                location.pathname === item.path ? 'portal-sidebar__link--active' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="portal-main">
        <Outlet />
      </div>
    </div>
  );
}

export default PortalLayout;
