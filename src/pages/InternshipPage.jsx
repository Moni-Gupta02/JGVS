import { Link } from 'react-router-dom';
import { InternshipForm } from '../components/forms';
import '../components/forms/forms.css';

function InternshipPage() {
  return (
    <div className="internship-page" style={{ background: 'var(--color-bg)', minHeight: '100vh', padding: '2.5rem 1rem' }}>
      <div className="container" style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            <Link to="/" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 0.5rem' }}>/</span>
            <Link to="/get-involved" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Get Involved</Link>
            <span style={{ margin: '0 0.5rem' }}>/</span>
            <span>Internship Application</span>
          </div>

          <Link
            to="/volunteer/register"
            style={{
              fontSize: '0.875rem',
              color: 'var(--color-primary)',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            ← Looking for Volunteer Roles?
          </Link>
        </div>

        {/* The Form */}
        <InternshipForm />
      </div>
    </div>
  );
}

export default InternshipPage;
