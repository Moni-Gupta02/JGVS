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
          <h3 className="about-section-title">Our Journey</h3>
          <div className="timeline">
            {ABOUT_SECTIONS.journey.map((item) => (
              <div key={item.year} className="timeline__item">
                <span className="timeline__year">{item.year}</span>
                <p className="timeline__event">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSAARK;
