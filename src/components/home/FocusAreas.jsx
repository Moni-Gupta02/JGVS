import { FOCUS_AREAS } from '../../constants';
import { SectionHeader, Card, Button } from '../ui';
import './FocusAreas.css';

function FocusAreas() {
  return (
    <section className="section section--alt focus-areas">
      <div className="container">
        <SectionHeader title="Our Focus Areas" />
        <div className="focus-areas__grid">
          {FOCUS_AREAS.map((area) => (
            <Card
              key={area.id}
              variant="focus"
              image={area.image}
              imageAlt={area.title}
              title={area.title}
              to={area.path}
            />
          ))}
        </div>
        <div className="focus-areas__cta">
          <Button to="/programs" variant="primary" size="lg">
            View All Programs
          </Button>
        </div>
      </div>
    </section>
  );
}

export default FocusAreas;
