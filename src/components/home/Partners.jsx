import { PARTNERS } from '../../constants';
import { SectionHeader } from '../ui';
import './Partners.css';

function Partners() {
  return (
    <section className="section partners">
      <div className="container">
        <SectionHeader title="Our Partners & Alliances" icon="" />
        <div className="partners__track">
          <div className="partners__scroll">
            {[...PARTNERS, ...PARTNERS].map((partner, i) => (
              <div key={`${partner.name}-${i}`} className="partner-logo">
                <span>{partner.logo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Partners;
