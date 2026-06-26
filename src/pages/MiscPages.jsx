import { FOCUS_AREAS } from '../constants';
import { GenericContentPage } from './ContentPages';
import './PageTemplate.css';

function ProgramsPage() {
  return (
    <GenericContentPage
      title="Our Programs"
      subtitle="Comprehensive development programs across 10 focus areas"
    >
      <div className="feature-grid" style={{ padding: '2rem 0' }}>
        {FOCUS_AREAS.map((area) => (
          <div key={area.id} className="feature-card">
            <h3>{area.title}</h3>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem', listStyle: 'disc' }}>
              {area.programs.map((p) => (
                <li key={p} style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </GenericContentPage>
  );
}

function ImpactPage() {
  return (
    <GenericContentPage title="Our Impact" subtitle="Measuring change across communities in India">
      <div className="dashboard-stats" style={{ padding: '2rem 0' }}>
        {[
          { value: '50,000+', label: 'Beneficiaries' },
          { value: '500+', label: 'Villages Covered' },
          { value: '5,000+', label: 'Women Empowered' },
          { value: '1,000+', label: 'Farmers Trained' },
          { value: '50+', label: 'Water Bodies Conserved' },
          { value: '95%', label: 'Funds Utilized' },
        ].map((stat) => (
          <div key={stat.label} className="dashboard-stat">
            <div className="dashboard-stat__value">{stat.value}</div>
            <div className="dashboard-stat__label">{stat.label}</div>
          </div>
        ))}
      </div>
    </GenericContentPage>
  );
}

function NotFoundPage() {
  return (
    <section className="content-section">
      <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1 style={{ fontSize: '4rem', color: 'var(--color-primary)' }}>404</h1>
        <h2>Page Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', margin: '1rem 0 2rem' }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <a href="/" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
          Return to Home
        </a>
      </div>
    </section>
  );
}

export { ProgramsPage, ImpactPage, NotFoundPage };
