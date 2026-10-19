import { Link } from 'react-router-dom';
import {
  IMPACT_MAP_STATS,
  NEWS_ITEMS,
  SUCCESS_STORIES,
} from '../../constants';
import { Button, SectionHeader } from '../ui';
import './ImpactNewsStories.css';

function ImpactNewsStories() {
  const featuredStory = SUCCESS_STORIES.find((s) => s.featured);
  const otherStories = SUCCESS_STORIES.filter((s) => !s.featured);

  return (
    <section className="section section--alt impact-news" id="latest">
      <div className="container">
        {/* Latest Focus: Working on Child Protection & Girls Improvement */}
        <div className="latest-focus-section">
          <SectionHeader
            title="Latest: Working on Child Protection & Girls Improvement"
            subtitle="Transforming futures by safeguarding children from harm, protecting rights, and empowering adolescent girls across India"
          />

          <div className="latest-focus__grid">
            {NEWS_ITEMS.map((item) => (
              <article key={item.id} className="focus-initiative-card">
                <div className="initiative-card__image-wrapper">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="initiative-card__image"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.style.display = 'none';
                      }
                    }}
                  />
                  <span className="initiative-card__tag">{item.tag || 'Focus Area'}</span>
                </div>
                <div className="initiative-card__body">
                  <div className="initiative-card__meta">
                    <span className="initiative-card__status">● {item.date}</span>
                  </div>
                  <h3 className="initiative-card__title">{item.title}</h3>
                  <p className="initiative-card__desc">{item.description}</p>
                  <Link to={item.path} className="initiative-card__link">
                    Explore Initiative →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Horizontal Impact & Stories Grid */}
        <div className="impact-stories__horizontal">
          {/* Impact Across India */}
          <div className="impact-card-wide">
            <div className="impact-card-wide__header">
              <h3 className="impact-card__title">Our Impact Across India</h3>
              <Button to="/impact" variant="outline-light" size="sm">
                View Impact Report →
              </Button>
            </div>
            <div className="impact-card-wide__content">
              <ul className="impact-stats-horizontal">
                {IMPACT_MAP_STATS.map((stat) => (
                  <li key={stat.label} className="impact-stat-pill">
                    <span className="impact-stat-value">{stat.value}</span>
                    <span className="impact-stat-label">{stat.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stories of Change */}
          <div className="stories-section-horizontal">
            <h3 className="column-title">Stories of Change</h3>
            <div className="stories-horizontal-row">
              {featuredStory && (
                <article className="featured-story-horizontal">
                  <img
                    src={featuredStory.image}
                    alt={featuredStory.title}
                    className="featured-story__image-h"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="featured-story__body-h">
                    <span className="story-badge">Featured Story</span>
                    <h4 className="featured-story__title">{featuredStory.title}</h4>
                    <p className="featured-story__excerpt">{featuredStory.excerpt}</p>
                    <Link to={featuredStory.path} className="featured-story__link">
                      Read Her Story →
                    </Link>
                  </div>
                </article>
              )}
              <div className="story-thumbs-horizontal">
                {otherStories.map((story) => (
                  <Link key={story.id} to={story.path} className="story-thumb-card" title={story.title}>
                    <img
                      src={story.image}
                      alt={story.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <span className="story-thumb-card__title">{story.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImpactNewsStories;
