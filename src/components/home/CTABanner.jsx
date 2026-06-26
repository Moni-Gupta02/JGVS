import { Button } from '../ui';
import './CTABanner.css';

function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="cta-banner__bg" />
      <div className="container cta-banner__content">
        <h2 className="cta-banner__title">Be a Part of the Change</h2>
        <p className="cta-banner__text">
          Your support helps us create sustainable impact in education, healthcare,
          agriculture, and environmental conservation across rural India.
        </p>
        <div className="cta-banner__actions">
          <Button to="/donor/donate" variant="primary" size="md">
            Donate Now
          </Button>
          <Button to="/grants" variant="outline-light" size="md">
            Apply for Grant
          </Button>
          <Button to="/volunteer/register" variant="outline-light" size="md">
            Become a Volunteer
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CTABanner;
