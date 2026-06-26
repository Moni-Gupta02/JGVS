import { Link } from 'react-router-dom';
import {
  IMPACT_MAP_STATS,
  NEWS_ITEMS,
  SUCCESS_STORIES,
} from '../../constants';
import { Button, Card } from '../ui';
import './ImpactNewsStories.css';

function ImpactNewsStories() {
  const featuredStory = SUCCESS_STORIES.find((s) => s.featured);
  const otherStories = SUCCESS_STORIES.filter((s) => !s.featured);

  return (
    <section className="section section--alt impact-news">
      <div className="container">
        <div className="impact-news__grid">
          {/* Impact Map */}
          <div className="impact-card">
            <h3 className="impact-card__title">Our Impact Across India</h3>
            <div className="impact-card__content">
              <div className="impact-card__map" aria-hidden="true">
                <div className="india-map">
                  <span className="map-pin map-pin--1">📍</span>
                  <span className="map-pin map-pin--2">📍</span>
                  <span className="map-pin map-pin--3">📍</span>
                  <span className="map-pin map-pin--4">📍</span>
                  <span className="map-pin map-pin--5">📍</span>
                </div>
              </div>
              <ul className="impact-card__stats">
                {IMPACT_MAP_STATS.map((stat) => (
                  <li key={stat.label}>
                    <span className="impact-stat-value">{stat.value}</span>
                    <span className="impact-stat-label">{stat.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button to="/impact" variant="outline-light" size="sm" className="impact-card__btn">
              View Impact Report
            </Button>
          </div>

          {/* News */}
          <div className="news-column">
            <h3 className="column-title">Latest News & Events</h3>
            {NEWS_ITEMS.map((item) => (
              <Card
                key={item.id}
                variant="news"
                image={item.image}
                imageAlt={item.title}
                title={item.title}
                to={item.path}
                footer={
                  <div className="news-meta">
                    <time dateTime={item.date}>{item.date}</time>
                    <Link to={item.path} className="news-link">Read More →</Link>
                  </div>
                }
              />
            ))}
            <Button to="/media/news" variant="primary" size="sm" fullWidth>
              View All News
            </Button>
          </div>

          {/* Stories */}
          <div className="stories-column">
            <h3 className="column-title">Stories of Change</h3>
            {featuredStory && (
              <article className="featured-story">
                <img
                  src={featuredStory.image}
                  alt={featuredStory.title}
                  className="featured-story__image"
                  loading="lazy"
                />
                <h4 className="featured-story__title">{featuredStory.title}</h4>
                <p className="featured-story__excerpt">{featuredStory.excerpt}</p>
                <Link to={featuredStory.path} className="featured-story__link">
                  Read Her Story →
                </Link>
              </article>
            )}
            <div className="story-thumbs">
              {otherStories.map((story) => (
                <Link key={story.id} to={story.path} className="story-thumb">
                  <img src={story.image} alt={story.title} loading="lazy" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImpactNewsStories;
