import { useState } from 'react';
import { INDIAN_STATES, EVENT_VOLUNTEER_ROLES } from '../../constants/forms';
import { submitApplicationForm } from '../../services/formSubmission';
import { isValidEmail, isValidPhone } from '../../utils';
import FormSubmissionSuccess from './FormSubmissionSuccess';
import './forms.css';

const INITIAL_FORM = {
  // 01. Event Details
  eventName: '',
  eventDate: '',
  eventVenue: '',
  reportingTime: '',
  eventType: 'Camp',
  eventTypeOther: '',
  eventDuration: '',
  organisingUnit: 'SAARK Foundation Event Unit',
  eventCoordinator: '',

  // 02. Personal Details
  fullName: '',
  dob: '',
  mobile: '',
  whatsapp: '',
  email: '',
  gender: '',
  state: '',
  district: '',
  block: '',
  villageTown: '',
  emergencyName: '',
  emergencyNumber: '',

  // 03. Roles
  selectedRoles: [],
  otherRole: '',

  // 04. Availability & Logistics
  availability: 'Full Event',
  preferredShift: 'Morning',
  attendBriefing: 'Yes',
  travelToVenue: 'Yes',
  travelNeeded: 'No',
  foodRequirement: '',
  tshirtSize: 'M',
  accessibilitySupport: '',

  // 05. Experience & Skills
  previousVolunteering: 'No',
  numberOfEvents: '',
  relevantSkills: '',
  languagesKnown: '',
  organisation: '',
  additionalInfo: '',

  // 06. Consent
  consent: false,
  applicantPlace: '',
  registrationDate: new Date().toISOString().split('T')[0],
};

function EventVolunteerForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxListChange = (listName, item) => {
    setForm((prev) => {
      const current = prev[listName] || [];
      const updated = current.includes(item)
        ? current.filter((x) => x !== item)
        : [...current, item];
      return { ...prev, [listName]: updated };
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required / पूरा नाम आवश्यक है';
    if (!form.dob) newErrors.dob = 'Date of Birth is required / जन्म तिथि आवश्यक है';
    if (!form.mobile.trim()) newErrors.mobile = 'Mobile number is required / मोबाइल नंबर आवश्यक है';
    else if (!isValidPhone(form.mobile)) newErrors.mobile = 'Valid 10-digit number required';
    if (!form.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp number is required';
    if (!form.email.trim()) newErrors.email = 'Email is required / ईमेल आवश्यक है';
    else if (!isValidEmail(form.email)) newErrors.email = 'Enter a valid email address';
    if (!form.state) newErrors.state = 'State is required / राज्य चुनें';
    if (!form.district.trim()) newErrors.district = 'District is required / जिला आवश्यक है';
    if (!form.consent) newErrors.consent = 'You must accept the safety & consent agreement';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setLoading(true);

    const structuredData = {
      '01. Event Details': {
        'Event Name': form.eventName || 'Upcoming SPF General Event',
        'Event Date': form.eventDate || 'Flexible / Upcoming',
        'Venue': form.eventVenue || 'Designated Venue',
        'Reporting Time': form.reportingTime || 'To be communicated',
        'Event Type': form.eventType === 'Other' ? form.eventTypeOther : form.eventType,
        'Duration': form.eventDuration || 'Standard',
        'Organising Unit': form.organisingUnit,
        'Coordinator': form.eventCoordinator || 'SPF Event Team',
      },
      '02. Volunteer Personal Details': {
        'Full Name': form.fullName,
        'Date of Birth': form.dob,
        'Mobile Number': form.mobile,
        'WhatsApp Number': form.whatsapp,
        'Email Address': form.email,
        'Gender': form.gender || 'Not specified',
        'State': form.state,
        'District': form.district,
        'Block / Tehsil': form.block || 'N/A',
        'Village / Town': form.villageTown || 'N/A',
        'Emergency Contact': `${form.emergencyName || 'N/A'} (${form.emergencyNumber || 'N/A'})`,
      },
      '03. Volunteer Role': {
        'Preferred Roles': form.selectedRoles.length > 0 ? form.selectedRoles : ['Any Available Role'],
        'Other Role Details': form.otherRole || 'None',
      },
      '04. Availability & Logistics': {
        'Availability': form.availability,
        'Preferred Shift': form.preferredShift,
        'Can Attend Briefing': form.attendBriefing,
        'Can Travel to Venue': form.travelToVenue,
        'Travel Arrangement Needed': form.travelNeeded,
        'Food/Water Requirement': form.foodRequirement || 'Standard',
        'T-Shirt / ID Size': form.tshirtSize,
        'Accessibility Requirement': form.accessibilitySupport || 'None',
      },
      '05. Experience & Skills': {
        'Previous Event Volunteering': form.previousVolunteering,
        'Number of Events': form.numberOfEvents || '0',
        'Relevant Skills': form.relevantSkills || 'General Volunteering',
        'Languages Known': form.languagesKnown || 'Hindi, English',
        'Organisation': form.organisation || 'N/A',
        'Additional Info': form.additionalInfo || 'N/A',
      },
      '06. Safety, Conduct & Consent': {
        'Agreement': form.consent ? 'Agreed & Confirmed' : 'No',
        'Place': form.applicantPlace || form.district,
        'Date': form.registrationDate,
      },
    };

    try {
      const res = await submitApplicationForm({
        formCode: 'EVT',
        formTitle: 'Event Volunteer Registration Form',
        structuredData,
        apiEndpoint: '/volunteers/register',
      });
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <FormSubmissionSuccess
        applicationId={result.applicationId}
        formTitle="Event Volunteer Registration Form / कार्यक्रम स्वयंसेवक पंजीकरण प्रपत्र"
        mailtoUrl={result.mailtoUrl}
        whatsappUrl={result.whatsappUrl}
        formattedSummary={result.formattedSummary}
        applicantName={form.fullName}
        applicantEmail={form.email}
        onReset={() => {
          setForm(INITIAL_FORM);
          setResult(null);
        }}
      />
    );
  }

  return (
    <div className="spf-form-container">
      {/* Header */}
      <div className="spf-form-header">
        <span className="spf-form-header__tagline">Be Part of the Change</span>
        <h1 className="spf-form-header__title">EVENT VOLUNTEER REGISTRATION FORM</h1>
        <div className="spf-form-header__hindi">कार्यक्रम स्वयंसेवक पंजीकरण प्रपत्र</div>
        <div className="spf-form-header__meta">
          <div className="spf-form-header__meta-item">
            <span>Org:</span> <strong>SAARK Philanthropy Foundation</strong>
          </div>
          <div className="spf-form-header__meta-item">
            <span>Helpline:</span> <strong>8090517004</strong>
          </div>
          <div className="spf-form-header__meta-item">
            <span>Date:</span> <strong>{form.registrationDate}</strong>
          </div>
        </div>
      </div>

      <form className="spf-form-body" onSubmit={handleSubmit} noValidate>
        {/* 01. EVENT DETAILS */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">01</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">EVENT DETAILS</h2>
              <div className="spf-form-section__subtitle">कार्यक्रम का विवरण</div>
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Event / Programme Name <span className="spf-field-label__hindi">/ कार्यक्रम का नाम</span>
              </label>
              <input
                type="text"
                name="eventName"
                value={form.eventName}
                onChange={handleChange}
                placeholder="e.g. Free Health Camp, Tree Plantation, Child Care Rally"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Event Date <span className="spf-field-label__hindi">/ कार्यक्रम तिथि</span>
              </label>
              <input
                type="date"
                name="eventDate"
                value={form.eventDate}
                onChange={handleChange}
                className="spf-input"
              />
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Event Venue <span className="spf-field-label__hindi">/ कार्यक्रम स्थल</span>
              </label>
              <input
                type="text"
                name="eventVenue"
                value={form.eventVenue}
                onChange={handleChange}
                placeholder="Venue location / village / city"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Reporting Time <span className="spf-field-label__hindi">/ रिपोर्टिंग समय</span>
              </label>
              <input
                type="text"
                name="reportingTime"
                value={form.reportingTime}
                onChange={handleChange}
                placeholder="e.g. 8:30 AM"
                className="spf-input"
              />
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Event Type <span className="spf-field-label__hindi">/ कार्यक्रम का प्रकार</span>
              </label>
              <div className="spf-radio-group">
                {['Awareness', 'Training', 'Camp', 'Rally', 'Workshop', 'Other'].map((t) => (
                  <label key={t} className="spf-radio-label">
                    <input
                      type="radio"
                      name="eventType"
                      value={t}
                      checked={form.eventType === t}
                      onChange={handleChange}
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
              {form.eventType === 'Other' && (
                <input
                  type="text"
                  name="eventTypeOther"
                  value={form.eventTypeOther}
                  onChange={handleChange}
                  placeholder="Specify event type"
                  className="spf-input"
                  style={{ marginTop: '0.5rem' }}
                />
              )}
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Event Duration <span className="spf-field-label__hindi">/ अवधि</span>
              </label>
              <input
                type="text"
                name="eventDuration"
                value={form.eventDuration}
                onChange={handleChange}
                placeholder="e.g. 1 Day / 4 Hours"
                className="spf-input"
              />
            </div>
          </div>
        </section>

        {/* 02. PERSONAL DETAILS */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">02</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">VOLUNTEER PERSONAL DETAILS</h2>
              <div className="spf-form-section__subtitle">स्वयंसेवक का व्यक्तिगत विवरण</div>
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Full Name <span className="spf-field-label__hindi">/ पूरा नाम</span>
                <span className="spf-field-required">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Volunteer Name"
                className={`spf-input ${errors.fullName ? 'spf-input--error' : ''}`}
                required
              />
              {errors.fullName && <span className="spf-field-error">{errors.fullName}</span>}
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Date of Birth <span className="spf-field-label__hindi">/ जन्म तिथि</span>
                <span className="spf-field-required">*</span>
              </label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className={`spf-input ${errors.dob ? 'spf-input--error' : ''}`}
                required
              />
              {errors.dob && <span className="spf-field-error">{errors.dob}</span>}
            </div>
          </div>

          <div className="spf-grid-3">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Mobile Number <span className="spf-field-label__hindi">/ मोबाइल नंबर</span>
                <span className="spf-field-required">*</span>
              </label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="10-digit number"
                className={`spf-input ${errors.mobile ? 'spf-input--error' : ''}`}
                required
              />
              {errors.mobile && <span className="spf-field-error">{errors.mobile}</span>}
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                WhatsApp Number <span className="spf-field-label__hindi">/ व्हाट्सऐप नंबर</span>
                <span className="spf-field-required">*</span>
              </label>
              <input
                type="tel"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="WhatsApp contact"
                className={`spf-input ${errors.whatsapp ? 'spf-input--error' : ''}`}
                required
              />
              {errors.whatsapp && <span className="spf-field-error">{errors.whatsapp}</span>}
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Email Address <span className="spf-field-label__hindi">/ ईमेल</span>
                <span className="spf-field-required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className={`spf-input ${errors.email ? 'spf-input--error' : ''}`}
                required
              />
              {errors.email && <span className="spf-field-error">{errors.email}</span>}
            </div>
          </div>

          <div className="spf-grid-3">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Gender <span className="spf-field-label__hindi">/ लिंग</span>
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male / पुरुष</option>
                <option value="Female">Female / महिला</option>
                <option value="Other">Other / अन्य</option>
              </select>
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                State <span className="spf-field-label__hindi">/ राज्य</span>
                <span className="spf-field-required">*</span>
              </label>
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                className={`spf-select ${errors.state ? 'spf-select--error' : ''}`}
                required
              >
                <option value="">Select State</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.state && <span className="spf-field-error">{errors.state}</span>}
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                District <span className="spf-field-label__hindi">/ जिला</span>
                <span className="spf-field-required">*</span>
              </label>
              <input
                type="text"
                name="district"
                value={form.district}
                onChange={handleChange}
                placeholder="District"
                className={`spf-input ${errors.district ? 'spf-input--error' : ''}`}
                required
              />
              {errors.district && <span className="spf-field-error">{errors.district}</span>}
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Block <span className="spf-field-label__hindi">/ ब्लॉक</span>
              </label>
              <input
                type="text"
                name="block"
                value={form.block}
                onChange={handleChange}
                placeholder="Block / Tehsil"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Village / Town <span className="spf-field-label__hindi">/ गाँव या नगर</span>
              </label>
              <input
                type="text"
                name="villageTown"
                value={form.villageTown}
                onChange={handleChange}
                placeholder="Village / Town name"
                className="spf-input"
              />
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Emergency Contact Name <span className="spf-field-label__hindi">/ आपातकालीन संपर्क</span>
              </label>
              <input
                type="text"
                name="emergencyName"
                value={form.emergencyName}
                onChange={handleChange}
                placeholder="Contact Name"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Emergency Contact Number <span className="spf-field-label__hindi">/ संपर्क नंबर</span>
              </label>
              <input
                type="tel"
                name="emergencyNumber"
                value={form.emergencyNumber}
                onChange={handleChange}
                placeholder="Phone number"
                className="spf-input"
              />
            </div>
          </div>
        </section>

        {/* 03. VOLUNTEER ROLE */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">03</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">VOLUNTEER ROLE</h2>
              <div className="spf-form-section__subtitle">स्वयंसेवक की भूमिका (पसंदीदा भूमिका चुनें)</div>
            </div>
          </div>

          <div className="spf-options-grid">
            {EVENT_VOLUNTEER_ROLES.map((role) => (
              <label
                key={role}
                className={`spf-checkbox-card ${
                  form.selectedRoles.includes(role) ? 'spf-checkbox-card--active' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.selectedRoles.includes(role)}
                  onChange={() => handleCheckboxListChange('selectedRoles', role)}
                />
                <span className="spf-checkbox-card__text">{role}</span>
              </label>
            ))}
          </div>

          <div className="spf-field-group" style={{ marginTop: '1rem' }}>
            <label className="spf-field-label">
              Other Preferred Role <span className="spf-field-label__hindi">/ अन्य भूमिका:</span>
            </label>
            <input
              type="text"
              name="otherRole"
              value={form.otherRole}
              onChange={handleChange}
              placeholder="Specify role"
              className="spf-input"
            />
          </div>
        </section>

        {/* 04. AVAILABILITY & LOGISTICS */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">04</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">AVAILABILITY & LOGISTICS</h2>
              <div className="spf-form-section__subtitle">उपलब्धता एवं व्यवस्था</div>
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Availability <span className="spf-field-label__hindi">/ उपलब्धता</span>
              </label>
              <div className="spf-radio-group">
                {['Full Event', 'Half Day', 'Selected Shift'].map((a) => (
                  <label key={a} className="spf-radio-label">
                    <input
                      type="radio"
                      name="availability"
                      value={a}
                      checked={form.availability === a}
                      onChange={handleChange}
                    />
                    <span>{a}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Preferred Shift <span className="spf-field-label__hindi">/ पसंदीदा शिफ्ट</span>
              </label>
              <div className="spf-radio-group">
                {['Morning', 'Afternoon', 'Evening'].map((s) => (
                  <label key={s} className="spf-radio-label">
                    <input
                      type="radio"
                      name="preferredShift"
                      value={s}
                      checked={form.preferredShift === s}
                      onChange={handleChange}
                    />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="spf-grid-3">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Can attend briefing? <span className="spf-field-label__hindi">/ ब्रीफिंग में आएँगे?</span>
              </label>
              <select
                name="attendBriefing"
                value={form.attendBriefing}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="Yes">Yes / हाँ</option>
                <option value="No">No / नहीं</option>
              </select>
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Can travel to venue? <span className="spf-field-label__hindi">/ स्थल तक आ सकते हैं?</span>
              </label>
              <select
                name="travelToVenue"
                value={form.travelToVenue}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="Yes">Yes / हाँ</option>
                <option value="No">No / नहीं</option>
              </select>
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Travel arrangement needed? <span className="spf-field-label__hindi">/ सहायता चाहिए?</span>
              </label>
              <select
                name="travelNeeded"
                value={form.travelNeeded}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="No">No / नहीं</option>
                <option value="Yes">Yes / हाँ</option>
              </select>
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">
                T-shirt / ID Size <span className="spf-field-label__hindi">/ टी-शर्ट आकार</span>
              </label>
              <select
                name="tshirtSize"
                value={form.tshirtSize}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="S">S (Small)</option>
                <option value="M">M (Medium)</option>
                <option value="L">L (Large)</option>
                <option value="XL">XL (Extra Large)</option>
                <option value="XXL">XXL</option>
              </select>
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Food / Water Requirement (optional) <span className="spf-field-label__hindi">/ भोजन संबंधी</span>
              </label>
              <input
                type="text"
                name="foodRequirement"
                value={form.foodRequirement}
                onChange={handleChange}
                placeholder="e.g. Vegetarian / None"
                className="spf-input"
              />
            </div>
          </div>

          <div className="spf-field-group">
            <label className="spf-field-label">
              Any accessibility or support requirement (optional) <span className="spf-field-label__hindi">/ विशेष सहायता</span>
            </label>
            <input
              type="text"
              name="accessibilitySupport"
              value={form.accessibilitySupport}
              onChange={handleChange}
              placeholder="e.g. Ramp access, seating preference"
              className="spf-input"
            />
          </div>
        </section>

        {/* 05. EXPERIENCE & SKILLS */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">05</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">EXPERIENCE & SKILLS</h2>
              <div className="spf-form-section__subtitle">अनुभव एवं कौशल</div>
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Previous event volunteering? <span className="spf-field-label__hindi">/ पूर्व अनुभव?</span>
              </label>
              <select
                name="previousVolunteering"
                value={form.previousVolunteering}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="No">No / नहीं</option>
                <option value="Yes">Yes / हाँ</option>
              </select>
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Number of events <span className="spf-field-label__hindi">/ कार्यक्रमों की संख्या</span>
              </label>
              <input
                type="number"
                name="numberOfEvents"
                value={form.numberOfEvents}
                onChange={handleChange}
                placeholder="e.g. 2"
                className="spf-input"
              />
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Relevant skills <span className="spf-field-label__hindi">/ संबंधित कौशल</span>
              </label>
              <input
                type="text"
                name="relevantSkills"
                value={form.relevantSkills}
                onChange={handleChange}
                placeholder="e.g. Crowd control, first aid, photography"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Languages known <span className="spf-field-label__hindi">/ भाषाएँ</span>
              </label>
              <input
                type="text"
                name="languagesKnown"
                value={form.languagesKnown}
                onChange={handleChange}
                placeholder="e.g. Hindi, English"
                className="spf-input"
              />
            </div>
          </div>

          <div className="spf-field-group">
            <label className="spf-field-label">
              Organisation / Institution (if any) <span className="spf-field-label__hindi">/ संस्था</span>
            </label>
            <input
              type="text"
              name="organisation"
              value={form.organisation}
              onChange={handleChange}
              placeholder="College / Company / NGO"
              className="spf-input"
            />
          </div>

          <div className="spf-field-group">
            <label className="spf-field-label">
              Additional information <span className="spf-field-label__hindi">/ अन्य जानकारी</span>
            </label>
            <textarea
              name="additionalInfo"
              value={form.additionalInfo}
              onChange={handleChange}
              rows={2}
              placeholder="Any comments or availability details"
              className="spf-textarea"
            />
          </div>
        </section>

        {/* 06. SAFETY, CONDUCT & CONSENT */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">06</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">SAFETY, CONDUCT & CONSENT</h2>
              <div className="spf-form-section__subtitle">सुरक्षा, आचरण एवं सहमति</div>
            </div>
          </div>

          <div className="spf-declaration-box">
            <p>
              I agree to follow the event instructions, volunteer code of conduct, safety and safeguarding guidelines, and directions of the authorised event coordinator. I will treat participants respectfully, protect confidential information, avoid discrimination or harassment, and report safety concerns promptly. I understand that registration does not guarantee selection or reimbursement. I consent to SPF contacting me for event coordination and using the information provided for this event. Photography/video consent, if required, should be obtained separately and voluntarily.
            </p>
            <p className="spf-declaration-hindi">
              मैं कार्यक्रम के निर्देशों, स्वयंसेवक आचार संहिता, सुरक्षा एवं संरक्षण संबंधी दिशानिर्देशों तथा अधिकृत समन्वयक के निर्देशों का पालन करने के लिए सहमत हूँ। मैं सभी प्रतिभागियों के साथ सम्मानजनक व्यवहार करूँगा/करूँगी, गोपनीय जानकारी सुरक्षित रखूँगा/रखूँगी तथा किसी सुरक्षा संबंधी चिंता की तुरंत सूचना दूँगा/दूँगी। पंजीकरण से चयन या खर्च की प्रतिपूर्ति की गारंटी नहीं मिलती। मैं इस कार्यक्रम के समन्वय हेतु SPF द्वारा संपर्क किए जाने और दी गई जानकारी के उपयोग की सहमति देता/देती हूँ।
            </p>
          </div>

          <label className="spf-consent-check">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              required
            />
            <span>
              I accept the Volunteer Code of Conduct & Safety Guidelines / मैं सहमत हूँ।
            </span>
          </label>
          {errors.consent && <span className="spf-field-error" style={{ marginBottom: '1rem' }}>{errors.consent}</span>}

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">Place / स्थान</label>
              <input
                type="text"
                name="applicantPlace"
                value={form.applicantPlace}
                onChange={handleChange}
                placeholder="City / District"
                className="spf-input"
              />
            </div>
            <div className="spf-field-group">
              <label className="spf-field-label">Date / दिनांक</label>
              <input
                type="date"
                name="registrationDate"
                value={form.registrationDate}
                onChange={handleChange}
                className="spf-input"
              />
            </div>
          </div>
        </section>

        {/* FOR SPF EVENT TEAM ONLY */}
        <div className="spf-office-box">
          <div className="spf-office-box__title">
            📋 FOR SPF EVENT TEAM ONLY / केवल SPF कार्यक्रम टीम हेतु
          </div>
          <div className="spf-office-grid">
            <div className="spf-office-field">
              <label>Status</label>
              <span>Registered / Under Review</span>
            </div>
            <div className="spf-office-field">
              <label>Event Team Desk</label>
              <span>Field & Mobilisation Unit</span>
            </div>
            <div className="spf-office-field">
              <label>Helpline</label>
              <span>8090517004</span>
            </div>
            <div className="spf-office-field">
              <label>ID Card</label>
              <span>To be issued on-site</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="spf-form-actions">
          <div className="spf-form-footer-badge">
            <span>🛡 Verified Non-Profit Event Form</span>
            <span>•</span>
            <span>Recorded & Sent to SPF Email</span>
          </div>

          <button
            type="submit"
            className="spf-submit-btn"
            disabled={loading}
          >
            {loading ? 'Submitting Registration...' : 'Register as Event Volunteer →'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EventVolunteerForm;
