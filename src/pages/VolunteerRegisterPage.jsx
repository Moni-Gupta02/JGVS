import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  FieldVolunteerForm,
  SkillVolunteerForm,
  EventVolunteerForm,
  VirtualVolunteerForm,
} from '../components/forms';
import '../components/forms/forms.css';

const TABS = [
  {
    id: 'field',
    title: 'Field Volunteer',
    hindi: 'क्षेत्रीय स्वयंसेवक',
    icon: '🌾',
    desc: 'Work directly with rural communities on-site',
  },
  {
    id: 'skill',
    title: 'Skill-Based Volunteer',
    hindi: 'कौशल-आधारित स्वयंसेवक',
    icon: '💡',
    desc: 'Contribute professional expertise and mentorship',
  },
  {
    id: 'event',
    title: 'Event Volunteer',
    hindi: 'कार्यक्रम स्वयंसेवक',
    icon: '🎪',
    desc: 'Support camps, workshops, rallies & logistics',
  },
  {
    id: 'virtual',
    title: 'Virtual Volunteer',
    hindi: 'वर्चुअल स्वयंसेवक',
    icon: '💻',
    desc: 'Support from anywhere remotely with digital skills',
  },
];

function VolunteerRegisterPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramType = searchParams.get('type') || searchParams.get('tab');
  
  const initialTab = TABS.some((t) => t.id === paramType) ? paramType : 'field';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (paramType && TABS.some((t) => t.id === paramType)) {
      setActiveTab(paramType);
    }
  }, [paramType]);

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ type: tabId });
  };

  return (
    <div className="volunteer-portal-page" style={{ padding: '2rem 1rem' }}>
      <div className="volunteer-tabs-container">
        <div className="volunteer-tabs-header">
          <h2>Volunteer Registration / स्वयंसेवक पंजीकरण</h2>
          <p>
            Choose your preferred volunteer stream below to fill out the official SPF registration form.
            All responses are recorded and dispatched directly to foundation coordinators.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="volunteer-tabs-nav" role="tablist">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelectTab(tab.id)}
                className={`volunteer-tab-btn ${isActive ? 'volunteer-tab-btn--active' : ''}`}
              >
                <span className="volunteer-tab-btn__icon">{tab.icon}</span>
                <span className="volunteer-tab-btn__title">{tab.title}</span>
                <span className="volunteer-tab-btn__hindi">{tab.hindi}</span>
              </button>
            );
          })}
        </div>

        {/* Active Form */}
        <div className="volunteer-form-wrapper">
          {activeTab === 'field' && <FieldVolunteerForm />}
          {activeTab === 'skill' && <SkillVolunteerForm />}
          {activeTab === 'event' && <EventVolunteerForm />}
          {activeTab === 'virtual' && <VirtualVolunteerForm />}
        </div>

        {/* Internship Switcher Banner */}
        <div className="internship-switch-banner">
          <div className="internship-switch-banner__content">
            <h4>🎓 Looking for Academic or Professional Internship?</h4>
            <p>
              SPF offers structured 4–12 week internships with supervision, certificates, and project exposure for college students & graduates.
            </p>
          </div>
          <Link to="/get-involved/internship" className="internship-switch-banner__btn">
            Apply for Internship Form →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VolunteerRegisterPage;
