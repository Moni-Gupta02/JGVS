import { HERO_SLIDES } from '../../constants';
import { useCarousel } from '../../hooks';
import { Button } from '../ui';
import './Hero.css';

function Hero() {
  const { currentIndex, goTo, next, prev, pause, resume } = useCarousel(
    HERO_SLIDES.length,
    6000
  );
  const slide = HERO_SLIDES[currentIndex];

  return (
    <section
      className="hero"
      onMouseEnter={pause}
      onMouseLeave={resume}
      aria-label="Hero carousel"
    >
      <div className="hero__slides">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={i}
            className={`hero__slide ${i === currentIndex ? 'hero__slide--active' : ''}`}
            style={{ backgroundImage: `url(${s.image})` }}
            aria-hidden={i !== currentIndex}
          />
        ))}
      </div>

      <div className="hero__overlay" />

      <div className="container hero__content">
        <div className="hero__text">
          <div className="hero__badges-row">
            <span className="hero__badge">{slide.badge}</span>
            <span className="hero__reg-badge">🏛️ Started 2020 • Registered in 2023 as per Section 8</span>
          </div>
          <h1 className="hero__title">
            {slide.title}{' '}
            <span className="hero__highlight">{slide.highlight}</span>
          </h1>
          <p className="hero__description">{slide.description}</p>
          <div className="hero__actions">
            <Button to="/donor/donate" variant="primary" size="md">
              Donate Now
            </Button>
            <Button to="/grants" variant="outline-light" size="md">
              Apply for Grant
            </Button>
            <Button to="/programs" variant="outline-light" size="md" icon="→" iconPosition="right">
              Explore Programs
            </Button>
            <Button to="/volunteer/register" variant="outline-light" size="md">
              Volunteer
            </Button>
          </div>
        </div>

        <div className="hero__video-widget">
          <div className="video-card">
            <div className="video-card__thumb">
              <img
                src="https://images.unsplash.com/photo-1488523785076-d742a933b820?w=300&h=200&fit=crop"
                alt="Watch our story"
                loading="lazy"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                onError={(e) => {
                  if (e.currentTarget.parentElement) {
                    e.currentTarget.parentElement.style.display = 'none';
                  }
                }}
              />
              <button type="button" className="video-card__play" aria-label="Play video">
                ▶
              </button>
            </div>
            <p className="video-card__title">Watch Our Story</p>
            <div className="video-card__thumbs">
              {[1, 2, 3].map((n) => (
                <div key={n} className="video-card__mini-thumb" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <button type="button" className="hero__arrow hero__arrow--prev" onClick={prev} aria-label="Previous slide">
        ‹
      </button>
      <button type="button" className="hero__arrow hero__arrow--next" onClick={next} aria-label="Next slide">
        ›
      </button>

      <div className="hero__dots">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`hero__dot ${i === currentIndex ? 'hero__dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
