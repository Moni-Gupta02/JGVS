import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FLAGSHIP_PROGRAMS } from '../../constants';
import { SectionHeader } from '../ui';
import './FlagshipPrograms.css';

function FlagshipPrograms() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="section flagship-programs">
      <div className="container">
        <SectionHeader title="Our Flagship Programs" />
        <div className="flagship-programs__wrapper">
          <button
            type="button"
            className="flagship-programs__nav flagship-programs__nav--prev"
            onClick={() => scroll('left')}
            aria-label="Previous programs"
          >
            ‹
          </button>

          <div className="flagship-programs__track" ref={scrollRef}>
            {FLAGSHIP_PROGRAMS.map((program) => (
              <article key={program.id} className="program-card">
                <div className="program-card__image">
                  <img
                    src={program.image}
                    alt={program.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      if (e.currentTarget.parentElement) {
                        e.currentTarget.style.display = 'none';
                      }
                    }}
                  />
                  <span className="program-card__icon" aria-hidden="true">
                    {program.icon}
                  </span>
                </div>
                <div className="program-card__body">
                  <h3 className="program-card__title">{program.title}</h3>
                  <p className="program-card__desc">{program.description}</p>
                  <Link to={program.path} className="program-card__link">
                    Learn More →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="flagship-programs__nav flagship-programs__nav--next"
            onClick={() => scroll('right')}
            aria-label="Next programs"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

export default FlagshipPrograms;
