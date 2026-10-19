import { ABOUT_SECTIONS } from '../../constants';
import { SectionHeader } from '../ui';
import './AboutSAARK.css';

function AboutSAARK() {
  return (
    <section className="section about-saark" id="about">
      <div className="container">
        <SectionHeader
          title="About SAARK"
          subtitle="Transforming lives through sustainable community development"
        />

        {/* Section 8 Registration Spotlight Banner */}
        <div className="about-saark__reg-banner">
          <div className="reg-banner__icon" aria-hidden="true">🏛️</div>
          <div className="reg-banner__content">
            <span className="reg-banner__badge">Official Registration Spotlight</span>
            <h3 className="reg-banner__title">
              Company Started in 2020 &bull; Registered in 2023 as per Section 8
            </h3>
            <p className="reg-banner__desc">
              SAARK Philanthropy Foundation began operations in <strong>2020</strong> and was officially incorporated and registered in <strong>2023</strong> under Section 8 of the Companies Act, 2013 (Non-Profit). We are committed to high-impact grassroots work in <strong>Child Protection</strong>, <strong>Girls Improvement &amp; Empowerment</strong>, healthcare, and sustainable rural livelihood.
            </p>
          </div>
        </div>

        <div className="about-saark__grid">
          <div className="about-card">
            <h3 className="about-card__title">Our Vision</h3>
            <p>{ABOUT_SECTIONS.vision}</p>
          </div>
          <div className="about-card">
            <h3 className="about-card__title">Our Mission</h3>
            <p>{ABOUT_SECTIONS.mission}</p>
          </div>
        </div>

        <div className="about-saark__values">
          <h3 className="about-section-title">Core Values</h3>
          <div className="values-grid">
            {ABOUT_SECTIONS.values.map((value) => (
              <div key={value.title} className="value-item">
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-saark__journey">
          <h3 className="about-section-title">Our Journey &amp; Key Milestones</h3>
          <div className="timeline-horizontal">
            {ABOUT_SECTIONS.journey.map((item) => (
              <div
                key={item.year}
                className={`timeline-step ${
                  item.year === '2020' || item.year === '2023' ? 'timeline-step--highlight' : ''
                }`}
              >
                <div className="timeline-step__marker">
                  <span className="timeline-step__dot" />
                  <span className="timeline-step__year">{item.year}</span>
                </div>
                <div className="timeline-step__card">
                  {item.year === '2020' && (
                    <span className="timeline-step__tag">Company Started</span>
                  )}
                  {item.year === '2023' && (
                    <span className="timeline-step__tag timeline-step__tag--reg">
                      Registered as per Section 8
                    </span>
                  )}
                  <p className="timeline-step__event">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSAARK;
