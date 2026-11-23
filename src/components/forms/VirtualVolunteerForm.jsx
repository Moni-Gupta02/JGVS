import { useState } from 'react';
import { INDIAN_STATES, VIRTUAL_VOLUNTEER_AREAS, SPF_PROGRAMMES } from '../../constants/forms';
import { submitApplicationForm } from '../../services/formSubmission';
import { isValidEmail, isValidPhone } from '../../utils';
import FormSubmissionSuccess from './FormSubmissionSuccess';
import './forms.css';

const INITIAL_FORM = {
  // 01. Personal Details
  fullName: '',
  dob: '',
  mobile: '',
  whatsapp: '',
  email: '',
  contactMethod: 'WhatsApp',
  state: '',
  district: '',
  country: 'India',
  occupation: '',
  qualification: '',
  preferredLanguage: 'English',
  languageOther: '',

  // 02. Volunteering Areas
  selectedAreas: [],
  otherArea: '',

  // 03. Skills & Portfolio
  primarySkill: '',
  secondarySkill: '',
  experienceYears: '1–2 years',
  relevantWork: '',
  organisation: '',
  portfolioUrl: '',
  skillsDescription: '',

  // 04. Availability & Working Preferences
  availability: 'Flexible',
  hoursPerWeek: '3–5',
  timeZone: 'IST (UTC+5:30)',
  workingHours: 'Evenings / Flexible',
  contributionType: 'Task-based',
  startDate: '',
  attendOnlineMeetings: 'Yes',
  internetAccess: 'Yes',
  meetingPlatform: 'Google Meet',
  platformOther: '',

  // 05. Programme Preference
  selectedProgrammes: [],
  otherProgramme: '',

  // 06. Documents
  docCv: false,
  docCertificates: false,
  docPortfolio: false,
  docPhoto: false,
  docGovtId: false,
  docsLink: '',

  // 07. Consent
  consent: false,
  applicantPlace: '',
  registrationDate: new Date().toISOString().split('T')[0],
};

function VirtualVolunteerForm() {
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
    if (!form.dob) newErrors.dob = 'Date of birth is required';
    if (!form.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    else if (!isValidPhone(form.mobile)) newErrors.mobile = 'Valid 10-digit number required';
    if (!form.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp number is required';
    if (!form.email.trim()) newErrors.email = 'Email address is required';
    else if (!isValidEmail(form.email)) newErrors.email = 'Enter a valid email address';
    if (!form.consent) newErrors.consent = 'You must accept the confidentiality and consent terms';

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
      '01. Personal & Contact Details': {
        'Full Name': form.fullName,
        'Date of Birth': form.dob,
        'Mobile Number': form.mobile,
        'WhatsApp Number': form.whatsapp,
        'Email Address': form.email,
        'Preferred Contact Method': form.contactMethod,
        'Country': form.country,
        'State': form.state || 'N/A',
        'District': form.district || 'N/A',
        'Current Occupation': form.occupation || 'N/A',
        'Highest Qualification': form.qualification || 'N/A',
        'Preferred Language': form.preferredLanguage === 'Other' ? form.languageOther : form.preferredLanguage,
      },
      '02. Virtual Volunteering Areas': {
        'Areas of Contribution': form.selectedAreas.length > 0 ? form.selectedAreas : ['General Support'],
        'Other Area': form.otherArea || 'None',
      },
      '03. Skills & Portfolio': {
        'Primary Skill': form.primarySkill || 'General',
        'Secondary Skill': form.secondarySkill || 'N/A',
        'Experience Level': form.experienceYears,
        'Relevant Work': form.relevantWork || 'N/A',
        'Organisation': form.organisation || 'N/A',
        'Portfolio / LinkedIn URL': form.portfolioUrl || 'N/A',
        'Skills Description': form.skillsDescription || 'N/A',
      },
      '04. Availability & Working Preferences': {
        'Availability': form.availability,
        'Hours / Week': form.hoursPerWeek,
        'Time Zone': form.timeZone,
        'Preferred Working Hours': form.workingHours,
        'Contribution Type': form.contributionType,
        'Start Date': form.startDate || 'Immediate',
        'Online Meetings': form.attendOnlineMeetings,
        'Internet Access': form.internetAccess,
        'Meeting Platform': form.meetingPlatform === 'Other' ? form.platformOther : form.meetingPlatform,
      },
      '05. Programme Preference': {
        'Selected Programmes': form.selectedProgrammes.length > 0 ? form.selectedProgrammes : ['All SPF Programmes'],
        'Other Programme': form.otherProgramme || 'None',
      },
      '06. Documents & Digital Readiness': {
        'Updated CV': form.docCv ? 'Yes' : 'No',
        'Certificates': form.docCertificates ? 'Yes' : 'No',
        'Portfolio Attached': form.docPortfolio ? 'Yes' : 'No',
        'Recent Photo': form.docPhoto ? 'Yes' : 'No',
        'Document / Cloud Link': form.docsLink || 'N/A',
      },
      '07. Declaration & Consent': {
        'Confidentiality & Code of Conduct': form.consent ? 'Agreed & Confirmed' : 'No',
        'Place': form.applicantPlace || 'Online / Remote',
        'Date': form.registrationDate,
      },
    };

    try {
      const res = await submitApplicationForm({
        formCode: 'VRT',
        formTitle: 'Virtual Volunteer Registration Form',
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
        formTitle="Virtual Volunteer Registration Form / वर्चुअल स्वयंसेवक पंजीकरण प्रपत्र"
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
        <span className="spf-form-header__tagline">Contribute Your Time & Skills, From Anywhere</span>
        <h1 className="spf-form-header__title">VIRTUAL VOLUNTEER REGISTRATION FORM</h1>
        <div className="spf-form-header__hindi">वर्चुअल स्वयंसेवक पंजीकरण प्रपत्र</div>
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
        {/* 01. PERSONAL DETAILS */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">01</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">PERSONAL & CONTACT DETAILS</h2>
              <div className="spf-form-section__subtitle">व्यक्तिगत एवं संपर्क विवरण</div>
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
                placeholder="Full Name"
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
                WhatsApp Number <span className="spf-field-label__hindi">/ व्हाट्सऐप</span>
                <span className="spf-field-required">*</span>
              </label>
              <input
                type="tel"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="WhatsApp number"
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
                Preferred Contact Method <span className="spf-field-label__hindi">/ संपर्क</span>
              </label>
              <select
                name="contactMethod"
                value={form.contactMethod}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
                <option value="Call">Call</option>
              </select>
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Country / देश</label>
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="India / Other"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">State / राज्य</label>
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="">Select State</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="spf-grid-3">
            <div className="spf-field-group">
              <label className="spf-field-label">District / जिला</label>
              <input
                type="text"
                name="district"
                value={form.district}
                onChange={handleChange}
                placeholder="District"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Current Occupation <span className="spf-field-label__hindi">/ व्यवसाय</span></label>
              <input
                type="text"
                name="occupation"
                value={form.occupation}
                onChange={handleChange}
                placeholder="Student / Professional / Freelancer"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Highest Qualification <span className="spf-field-label__hindi">/ शैक्षिक योग्यता</span></label>
              <input
                type="text"
                name="qualification"
                value={form.qualification}
                onChange={handleChange}
                placeholder="Graduate / Post-Graduate"
                className="spf-input"
              />
            </div>
          </div>
        </section>

        {/* 02. VIRTUAL VOLUNTEERING AREAS */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">02</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">VIRTUAL VOLUNTEERING AREAS</h2>
              <div className="spf-form-section__subtitle">ऑनलाइन स्वयंसेवा के क्षेत्र (जिनमें आप योगदान दे सकते हैं)</div>
            </div>
          </div>

          <div className="spf-options-grid">
            {VIRTUAL_VOLUNTEER_AREAS.map((area) => (
              <label
                key={area}
                className={`spf-checkbox-card ${
                  form.selectedAreas.includes(area) ? 'spf-checkbox-card--active' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.selectedAreas.includes(area)}
                  onChange={() => handleCheckboxListChange('selectedAreas', area)}
                />
                <span className="spf-checkbox-card__text">{area}</span>
              </label>
            ))}
          </div>

          <div className="spf-field-group" style={{ marginTop: '1rem' }}>
            <label className="spf-field-label">
              Other Area of Contribution <span className="spf-field-label__hindi">/ अन्य:</span>
            </label>
            <input
              type="text"
              name="otherArea"
              value={form.otherArea}
              onChange={handleChange}
              placeholder="Specify other virtual contribution"
              className="spf-input"
            />
          </div>
        </section>

        {/* 03. SKILLS & PORTFOLIO */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">03</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">SKILLS, EXPERIENCE & PORTFOLIO</h2>
              <div className="spf-form-section__subtitle">कौशल, अनुभव एवं पोर्टफोलियो</div>
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">Primary Skill <span className="spf-field-label__hindi">/ मुख्य कौशल</span></label>
              <input
                type="text"
                name="primarySkill"
                value={form.primarySkill}
                onChange={handleChange}
                placeholder="e.g. Graphic Design, Python, Legal Drafting"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Secondary Skill <span className="spf-field-label__hindi">/ अन्य कौशल</span></label>
              <input
                type="text"
                name="secondarySkill"
                value={form.secondarySkill}
                onChange={handleChange}
                placeholder="e.g. Translation, Video Editing"
                className="spf-input"
              />
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">Experience <span className="spf-field-label__hindi">/ अनुभव</span></label>
              <select
                name="experienceYears"
                value={form.experienceYears}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="Beginner">Beginner / शुरुआत</option>
                <option value="1–2 years">1–2 years</option>
                <option value="3–5 years">3–5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Portfolio / LinkedIn / Website URL <span className="spf-field-label__hindi">/ लिंक</span></label>
              <input
                type="url"
                name="portfolioUrl"
                value={form.portfolioUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/... or portfolio"
                className="spf-input"
              />
            </div>
          </div>

          <div className="spf-field-group">
            <label className="spf-field-label">Organisation / Institution (if any) <span className="spf-field-label__hindi">/ संस्था</span></label>
            <input
              type="text"
              name="organisation"
              value={form.organisation}
              onChange={handleChange}
              placeholder="Current company or college"
              className="spf-input"
            />
          </div>

          <div className="spf-field-group">
            <label className="spf-field-label">
              Describe your skills and contribution <span className="spf-field-label__hindi">/ अपने कौशल एवं योगदान का विवरण</span>
            </label>
            <textarea
              name="skillsDescription"
              value={form.skillsDescription}
              onChange={handleChange}
              rows={3}
              placeholder="Brief description of what you can build, write, design, or advise on..."
              className="spf-textarea"
            />
          </div>
        </section>

        {/* 04. AVAILABILITY & WORKING PREFERENCES */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">04</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">AVAILABILITY & WORKING PREFERENCES</h2>
              <div className="spf-form-section__subtitle">उपलब्धता एवं कार्य प्राथमिकताएँ</div>
            </div>
          </div>

          <div className="spf-grid-3">
            <div className="spf-field-group">
              <label className="spf-field-label">Availability <span className="spf-field-label__hindi">/ उपलब्धता</span></label>
              <select
                name="availability"
                value={form.availability}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="Flexible">Flexible / लचीला</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Weekends">Weekends</option>
              </select>
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Hours per week <span className="spf-field-label__hindi">/ प्रति सप्ताह समय</span></label>
              <select
                name="hoursPerWeek"
                value={form.hoursPerWeek}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="1–2">1–2 hours</option>
                <option value="3–5">3–5 hours</option>
                <option value="6–10">6–10 hours</option>
                <option value="10+">10+ hours</option>
              </select>
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Contribution Type <span className="spf-field-label__hindi">/ योगदान का प्रकार</span></label>
              <select
                name="contributionType"
                value={form.contributionType}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="Task-based">Task-based</option>
                <option value="Weekly">Weekly</option>
                <option value="Project-based">Project-based</option>
              </select>
            </div>
          </div>

          <div className="spf-grid-3">
            <div className="spf-field-group">
              <label className="spf-field-label">Online Meetings possible? <span className="spf-field-label__hindi">/ मीटिंग संभव?</span></label>
              <select
                name="attendOnlineMeetings"
                value={form.attendOnlineMeetings}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="Yes">Yes / हाँ</option>
                <option value="No">No / नहीं</option>
              </select>
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Internet & Device Access <span className="spf-field-label__hindi">/ इंटरनेट</span></label>
              <select
                name="internetAccess"
                value={form.internetAccess}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="Yes">Yes / पर्याप्त</option>
                <option value="Limited">Limited / सीमित</option>
              </select>
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Preferred Platform <span className="spf-field-label__hindi">/ प्लेटफॉर्म</span></label>
              <select
                name="meetingPlatform"
                value={form.meetingPlatform}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="Google Meet">Google Meet</option>
                <option value="Zoom">Zoom</option>
                <option value="Teams">Microsoft Teams</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </section>

        {/* 05. SPF PROGRAMME PREFERENCE */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">05</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">SPF PROGRAMME PREFERENCE</h2>
              <div className="spf-form-section__subtitle">SPF कार्यक्रम प्राथमिकता</div>
            </div>
          </div>

          <div className="spf-options-grid">
            {SPF_PROGRAMMES.map((prog) => (
              <label
                key={prog}
                className={`spf-checkbox-card ${
                  form.selectedProgrammes.includes(prog) ? 'spf-checkbox-card--active' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.selectedProgrammes.includes(prog)}
                  onChange={() => handleCheckboxListChange('selectedProgrammes', prog)}
                />
                <span className="spf-checkbox-card__text">{prog}</span>
              </label>
            ))}
          </div>
        </section>

        {/* 06. DOCUMENTS */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">06</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">DOCUMENTS & DIGITAL READINESS</h2>
              <div className="spf-form-section__subtitle">दस्तावेज़ एवं डिजिटल तैयारी</div>
            </div>
          </div>

          <div className="spf-options-grid">
            <label className={`spf-checkbox-card ${form.docCv ? 'spf-checkbox-card--active' : ''}`}>
              <input
                type="checkbox"
                name="docCv"
                checked={form.docCv}
                onChange={handleChange}
              />
              <span className="spf-checkbox-card__text">Updated CV / Resume (recommended)</span>
            </label>

            <label className={`spf-checkbox-card ${form.docCertificates ? 'spf-checkbox-card--active' : ''}`}>
              <input
                type="checkbox"
                name="docCertificates"
                checked={form.docCertificates}
                onChange={handleChange}
              />
              <span className="spf-checkbox-card__text">Certificates (if available)</span>
            </label>

            <label className={`spf-checkbox-card ${form.docPortfolio ? 'spf-checkbox-card--active' : ''}`}>
              <input
                type="checkbox"
                name="docPortfolio"
                checked={form.docPortfolio}
                onChange={handleChange}
              />
              <span className="spf-checkbox-card__text">Portfolio / Work samples</span>
            </label>

            <label className={`spf-checkbox-card ${form.docPhoto ? 'spf-checkbox-card--active' : ''}`}>
              <input
                type="checkbox"
                name="docPhoto"
                checked={form.docPhoto}
                onChange={handleChange}
              />
              <span className="spf-checkbox-card__text">Recent photograph (optional)</span>
            </label>
          </div>

          <div className="spf-field-group" style={{ marginTop: '1rem' }}>
            <label className="spf-field-label">Cloud Folder / Document Link</label>
            <input
              type="url"
              name="docsLink"
              value={form.docsLink}
              onChange={handleChange}
              placeholder="Paste Google Drive / OneDrive link"
              className="spf-input"
            />
          </div>

          <div className="spf-notice-box spf-notice-box--warning">
            🔒 <strong>Safety Notice:</strong> Please do not send passwords, OTPs, bank details or unnecessary identity documents.
          </div>
        </section>

        {/* 07. DECLARATION */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">07</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">DECLARATION, CONFIDENTIALITY & CONSENT</h2>
              <div className="spf-form-section__subtitle">घोषणा, गोपनीयता एवं सहमति</div>
            </div>
          </div>

          <div className="spf-declaration-box">
            <p>
              I confirm that the information provided is accurate to the best of my knowledge. I understand that this is a volunteer registration, not an employment application or guarantee of selection. I agree to follow SPF’s volunteer code of conduct, safeguarding and confidentiality requirements, use approved communication channels, protect beneficiary information, and obtain permission before publishing SPF-related content or images. I will not provide professional advice (including legal, medical or counselling services) unless appropriately qualified and authorised. I consent to SPF contacting me about this application and using the information for volunteer assessment and coordination. I may request correction or withdrawal of my application.
            </p>
            <p className="spf-declaration-hindi">
              मैं पुष्टि करता/करती हूँ कि दी गई जानकारी सही है। यह स्वयंसेवा पंजीकरण है, नौकरी का आवेदन या चयन की गारंटी नहीं। मैं SPF की आचार संहिता, सुरक्षा एवं गोपनीयता नियमों का पालन करूँगा/करूँगी, लाभार्थियों की जानकारी सुरक्षित रखूँगा/रखूँगी तथा अनुमति के बिना SPF-संबंधित सामग्री या फोटो प्रकाशित नहीं करूँगा/करूँगी। उचित योग्यता एवं अनुमति के बिना कानूनी, चिकित्सकीय या परामर्श सेवाएँ नहीं दूँगा/दूँगी। मैं आवेदन के मूल्यांकन एवं समन्वय हेतु SPF द्वारा संपर्क और जानकारी के उपयोग की सहमति देता/देती हूँ।
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
              I confirm and accept the Declaration & Confidentiality terms / मैं सहमत हूँ।
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

        {/* FOR SPF OFFICE USE ONLY */}
        <div className="spf-office-box">
          <div className="spf-office-box__title">
            📋 FOR SPF OFFICE USE ONLY / केवल SPF कार्यालय हेतु
          </div>
          <div className="spf-office-grid">
            <div className="spf-office-field">
              <label>Status</label>
              <span>Received / Virtual Evaluation</span>
            </div>
            <div className="spf-office-field">
              <label>Team</label>
              <span>Digital & Remote Volunteer Cell</span>
            </div>
            <div className="spf-office-field">
              <label>Helpline</label>
              <span>8090517004</span>
            </div>
            <div className="spf-office-field">
              <label>Orientation</label>
              <span>Via Google Meet</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="spf-form-actions">
          <div className="spf-form-footer-badge">
            <span>🛡 Verified SPF Non-Profit Portal</span>
            <span>•</span>
            <span>Recorded & Sent to SPF Email</span>
          </div>

          <button
            type="submit"
            className="spf-submit-btn"
            disabled={loading}
          >
            {loading ? 'Submitting Registration...' : 'Register as Virtual Volunteer →'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default VirtualVolunteerForm;
