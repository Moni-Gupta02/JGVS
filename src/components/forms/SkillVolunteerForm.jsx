import { useState } from 'react';
import { INDIAN_STATES, SKILL_CATEGORIES, SPF_PROGRAMMES } from '../../constants/forms';
import { submitApplicationForm } from '../../services/formSubmission';
import { isValidEmail, isValidPhone } from '../../utils';
import FormSubmissionSuccess from './FormSubmissionSuccess';
import './forms.css';

const INITIAL_FORM = {
  // 01. Applicant Profile
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
  occupation: '',
  qualification: '',

  // 02. Skill Category
  selectedCategories: [],
  categoryOther: '',

  // 03. Skill Details & Experience
  primarySkill: '',
  secondarySkill: '',
  yearsOfExperience: '',
  experienceType: 'Both',
  organisation: '',
  skillDescription: '',
  portfolioLink: '',

  // 04. Contribution Preference
  preferredProgram: '',
  preferredDistrict: '',
  contributionMode: 'Hybrid',
  availability: 'Project-based',
  hoursPerWeek: '4–6',
  startDate: '',
  provideTraining: 'Yes',
  fieldTravel: 'Yes',
  specificSupport: '',

  // 05. Programme Alignment
  selectedAlignments: [],
  alignmentOther: '',

  // 06. Documents
  docCv: false,
  docSkillCert: false,
  docPortfolio: false,
  docPhoto: false,
  docGovtId: false,
  docsLink: '',

  // 07. Consent
  consent: false,
  applicantPlace: '',
  registrationDate: new Date().toISOString().split('T')[0],
};

function SkillVolunteerForm() {
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
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!isValidEmail(form.email)) newErrors.email = 'Enter a valid email address';
    if (!form.state) newErrors.state = 'State is required / राज्य चुनें';
    if (!form.district.trim()) newErrors.district = 'District is required / जिला आवश्यक है';
    if (!form.consent) newErrors.consent = 'You must accept the declaration and consent terms';

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
      '01. Applicant Profile': {
        'Full Name': form.fullName,
        'Date of Birth': form.dob,
        'Mobile Number': form.mobile,
        'WhatsApp Number': form.whatsapp,
        'Email Address': form.email,
        'Gender': form.gender || 'Not specified',
        'State': form.state,
        'District': form.district,
        'Block': form.block || 'N/A',
        'Village / Town': form.villageTown || 'N/A',
        'Current Occupation': form.occupation || 'N/A',
        'Highest Qualification': form.qualification || 'N/A',
      },
      '02. Skill Category': {
        'Selected Categories': form.selectedCategories.length > 0 ? form.selectedCategories : ['General Expertise'],
        'Other Category': form.categoryOther || 'None',
      },
      '03. Skill Details & Experience': {
        'Primary Skill': form.primarySkill || 'N/A',
        'Secondary Skill': form.secondarySkill || 'N/A',
        'Years of Experience': form.yearsOfExperience || '1+',
        'Experience Type': form.experienceType,
        'Organisation': form.organisation || 'N/A',
        'Skill Description': form.skillDescription || 'N/A',
        'Certificates / Work Link': form.portfolioLink || 'N/A',
      },
      '04. Contribution Preference': {
        'Preferred SPF Programme': form.preferredProgram || 'Any Programme',
        'Preferred District': form.preferredDistrict || 'Flexible',
        'Contribution Mode': form.contributionMode,
        'Availability': form.availability,
        'Hours / Week': form.hoursPerWeek,
        'Start Date': form.startDate || 'Immediate',
        'Can Provide Training / Mentorship': form.provideTraining,
        'Can Travel for Field': form.fieldTravel,
        'Specific Support Offered': form.specificSupport || 'N/A',
      },
      '05. Programme Alignment': {
        'Aligned Programmes': form.selectedAlignments.length > 0 ? form.selectedAlignments : ['Open to all programmes'],
        'Other Alignment': form.alignmentOther || 'None',
      },
      '06. Supporting Documents': {
        'Updated CV': form.docCv ? 'Yes' : 'No',
        'Skill Certificates': form.docSkillCert ? 'Yes' : 'No',
        'Portfolio / Samples': form.docPortfolio ? 'Yes' : 'No',
        'Recent Photo': form.docPhoto ? 'Yes' : 'No',
        'Documents Cloud Link': form.docsLink || 'N/A',
      },
      '07. Declaration & Consent': {
        'Consent Agreed': form.consent ? 'Agreed & Confirmed' : 'No',
        'Place': form.applicantPlace || form.district,
        'Date': form.registrationDate,
      },
    };

    try {
      const res = await submitApplicationForm({
        formCode: 'SKL',
        formTitle: 'Skill-Based Volunteer Registration Form',
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
        formTitle="Skill-Based Volunteer Registration Form / कौशल-आधारित स्वयंसेवक पंजीकरण प्रपत्र"
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
        <span className="spf-form-header__tagline">Share Your Skills • Create Social Impact</span>
        <h1 className="spf-form-header__title">SKILL-BASED VOLUNTEER REGISTRATION FORM</h1>
        <div className="spf-form-header__hindi">कौशल-आधारित स्वयंसेवक पंजीकरण प्रपत्र</div>
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
        {/* 01. APPLICANT PROFILE */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">01</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">APPLICANT PROFILE</h2>
              <div className="spf-form-section__subtitle">आवेदक का विवरण</div>
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
                placeholder="Applicant Full Name"
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
              <label className="spf-field-label">Gender <span className="spf-field-label__hindi">/ लिंग</span></label>
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
              <label className="spf-field-label">Block <span className="spf-field-label__hindi">/ ब्लॉक</span></label>
              <input
                type="text"
                name="block"
                value={form.block}
                onChange={handleChange}
                placeholder="Block"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Village / Town <span className="spf-field-label__hindi">/ गाँव या नगर</span></label>
              <input
                type="text"
                name="villageTown"
                value={form.villageTown}
                onChange={handleChange}
                placeholder="Village / Town"
                className="spf-input"
              />
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">Current Occupation <span className="spf-field-label__hindi">/ वर्तमान व्यवसाय</span></label>
              <input
                type="text"
                name="occupation"
                value={form.occupation}
                onChange={handleChange}
                placeholder="e.g. Teacher, Doctor, Agronomist, Engineer, Lawyer"
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
                placeholder="e.g. B.Tech, MBBS, MSW, B.Ed, M.Sc"
                className="spf-input"
              />
            </div>
          </div>
        </section>

        {/* 02. SKILL CATEGORY */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">02</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">SKILL CATEGORY</h2>
              <div className="spf-form-section__subtitle">कौशल श्रेणी (जिन क्षेत्रों में आप योगदान दे सकते हैं)</div>
            </div>
          </div>

          <div className="spf-options-grid">
            {SKILL_CATEGORIES.map((cat) => (
              <label
                key={cat}
                className={`spf-checkbox-card ${
                  form.selectedCategories.includes(cat) ? 'spf-checkbox-card--active' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.selectedCategories.includes(cat)}
                  onChange={() => handleCheckboxListChange('selectedCategories', cat)}
                />
                <span className="spf-checkbox-card__text">{cat}</span>
              </label>
            ))}
          </div>

          <div className="spf-field-group" style={{ marginTop: '1rem' }}>
            <label className="spf-field-label">
              Other Skill Category <span className="spf-field-label__hindi">/ अन्य कौशल:</span>
            </label>
            <input
              type="text"
              name="categoryOther"
              value={form.categoryOther}
              onChange={handleChange}
              placeholder="Specify skill"
              className="spf-input"
            />
          </div>
        </section>

        {/* 03. SKILL DETAILS & EXPERIENCE */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">03</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">SKILL DETAILS & EXPERIENCE</h2>
              <div className="spf-form-section__subtitle">कौशल एवं अनुभव का विवरण</div>
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
                placeholder="e.g. Organic Farming Training, Legal Aid, Clinical Nursing"
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
                placeholder="e.g. Report Writing, Photography, Mentoring"
                className="spf-input"
              />
            </div>
          </div>

          <div className="spf-grid-3">
            <div className="spf-field-group">
              <label className="spf-field-label">Years of Experience <span className="spf-field-label__hindi">/ अनुभव (वर्ष)</span></label>
              <input
                type="text"
                name="yearsOfExperience"
                value={form.yearsOfExperience}
                onChange={handleChange}
                placeholder="e.g. 4 years"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Experience Type <span className="spf-field-label__hindi">/ अनुभव प्रकार</span></label>
              <div className="spf-radio-group">
                {['Professional', 'Volunteer', 'Both'].map((t) => (
                  <label key={t} className="spf-radio-label">
                    <input
                      type="radio"
                      name="experienceType"
                      value={t}
                      checked={form.experienceType === t}
                      onChange={handleChange}
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Organisation / Institution (if any) <span className="spf-field-label__hindi">/ संस्था</span></label>
              <input
                type="text"
                name="organisation"
                value={form.organisation}
                onChange={handleChange}
                placeholder="Current organisation"
                className="spf-input"
              />
            </div>
          </div>

          <div className="spf-field-group">
            <label className="spf-field-label">
              Describe your skills and relevant experience <span className="spf-field-label__hindi">/ अपने कौशल एवं अनुभव का विवरण</span>
            </label>
            <textarea
              name="skillDescription"
              value={form.skillDescription}
              onChange={handleChange}
              rows={3}
              placeholder="Provide context on your background and projects you have undertaken..."
              className="spf-textarea"
            />
          </div>

          <div className="spf-field-group">
            <label className="spf-field-label">
              Certificates / Portfolio / Work Samples link (if any) <span className="spf-field-label__hindi">/ प्रमाणपत्र या कार्य नमूना लिंक</span>
            </label>
            <input
              type="url"
              name="portfolioLink"
              value={form.portfolioLink}
              onChange={handleChange}
              placeholder="https://drive.google.com/... or portfolio URL"
              className="spf-input"
            />
          </div>
        </section>

        {/* 04. CONTRIBUTION PREFERENCE */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">04</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">CONTRIBUTION PREFERENCE</h2>
              <div className="spf-form-section__subtitle">योगदान की प्राथमिकताएँ</div>
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">Preferred SPF Programme <span className="spf-field-label__hindi">/ पसंदीदा कार्यक्रम</span></label>
              <select
                name="preferredProgram"
                value={form.preferredProgram}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="">Any Programme / कोई भी कार्यक्रम</option>
                {SPF_PROGRAMMES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Preferred District <span className="spf-field-label__hindi">/ पसंदीदा जिला</span></label>
              <input
                type="text"
                name="preferredDistrict"
                value={form.preferredDistrict}
                onChange={handleChange}
                placeholder="District or Open"
                className="spf-input"
              />
            </div>
          </div>

          <div className="spf-grid-3">
            <div className="spf-field-group">
              <label className="spf-field-label">Contribution Mode <span className="spf-field-label__hindi">/ तरीका</span></label>
              <div className="spf-radio-group">
                {['On-site', 'Remote', 'Hybrid'].map((m) => (
                  <label key={m} className="spf-radio-label">
                    <input
                      type="radio"
                      name="contributionMode"
                      value={m}
                      checked={form.contributionMode === m}
                      onChange={handleChange}
                    />
                    <span>{m}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Availability <span className="spf-field-label__hindi">/ उपलब्धता</span></label>
              <select
                name="availability"
                value={form.availability}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="Regular">Regular / नियमित</option>
                <option value="Weekends">Weekends only</option>
                <option value="Project-based">Project-based / परियोजना आधारित</option>
              </select>
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Hours per week <span className="spf-field-label__hindi">/ समय</span></label>
              <select
                name="hoursPerWeek"
                value={form.hoursPerWeek}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="1–3">1–3 hours</option>
                <option value="4–6">4–6 hours</option>
                <option value="7–10">7–10 hours</option>
                <option value="10+">10+ hours</option>
              </select>
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">Can provide training or mentorship? <span className="spf-field-label__hindi">/ प्रशिक्षण दे सकते हैं?</span></label>
              <select
                name="provideTraining"
                value={form.provideTraining}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="Yes">Yes / हाँ</option>
                <option value="No">No / नहीं</option>
              </select>
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Can travel for field activities? <span className="spf-field-label__hindi">/ फील्ड यात्रा संभव?</span></label>
              <select
                name="fieldTravel"
                value={form.fieldTravel}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="Yes">Yes / हाँ</option>
                <option value="No">No / नहीं</option>
              </select>
            </div>
          </div>

          <div className="spf-field-group">
            <label className="spf-field-label">
              Specific support you can offer <span className="spf-field-label__hindi">/ आप किस प्रकार सहयोग देंगे</span>
            </label>
            <textarea
              name="specificSupport"
              value={form.specificSupport}
              onChange={handleChange}
              rows={2}
              placeholder="e.g. Conduct farmer workshops, audit accounts, counsel youth, legal advice..."
              className="spf-textarea"
            />
          </div>
        </section>

        {/* 05. SPF PROGRAMME ALIGNMENT */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">05</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">SPF PROGRAMME ALIGNMENT</h2>
              <div className="spf-form-section__subtitle">SPF कार्यक्रम चयन</div>
            </div>
          </div>

          <div className="spf-options-grid">
            {SPF_PROGRAMMES.map((prog) => (
              <label
                key={prog}
                className={`spf-checkbox-card ${
                  form.selectedAlignments.includes(prog) ? 'spf-checkbox-card--active' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.selectedAlignments.includes(prog)}
                  onChange={() => handleCheckboxListChange('selectedAlignments', prog)}
                />
                <span className="spf-checkbox-card__text">{prog}</span>
              </label>
            ))}
          </div>
        </section>

        {/* 06. SUPPORTING DOCUMENTS */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">06</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">SUPPORTING DOCUMENTS</h2>
              <div className="spf-form-section__subtitle">सहायक दस्तावेज़</div>
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

            <label className={`spf-checkbox-card ${form.docSkillCert ? 'spf-checkbox-card--active' : ''}`}>
              <input
                type="checkbox"
                name="docSkillCert"
                checked={form.docSkillCert}
                onChange={handleChange}
              />
              <span className="spf-checkbox-card__text">Skill certificates (if available)</span>
            </label>

            <label className={`spf-checkbox-card ${form.docPortfolio ? 'spf-checkbox-card--active' : ''}`}>
              <input
                type="checkbox"
                name="docPortfolio"
                checked={form.docPortfolio}
                onChange={handleChange}
              />
              <span className="spf-checkbox-card__text">Portfolio / Work samples (if relevant)</span>
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
            <label className="spf-field-label">Document / Portfolio Cloud Link</label>
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
            🔒 <strong>Safety Notice:</strong> Please do not attach sensitive identity or financial documents unless SPF specifically requests them through a secure process.
          </div>
        </section>

        {/* 07. DECLARATION & CONSENT */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">07</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">DECLARATION & CONSENT</h2>
              <div className="spf-form-section__subtitle">घोषणा एवं सहमति</div>
            </div>
          </div>

          <div className="spf-declaration-box">
            <p>
              I confirm that the information provided is accurate to the best of my knowledge. I understand that this is a volunteer registration and not an employment application or guarantee of selection. Any volunteer assignment will be based on skill fit, programme needs, verification where appropriate, safeguarding requirements and SPF policies. I consent to SPF contacting me about this application and using the information for volunteer assessment, coordination and record-keeping. I may request correction or withdrawal of my application.
            </p>
            <p className="spf-declaration-hindi">
              मैं पुष्टि करता/करती हूँ कि दी गई जानकारी मेरी जानकारी के अनुसार सही है। यह स्वयंसेवा पंजीकरण है, नौकरी का आवेदन या चयन की गारंटी नहीं। स्वयंसेवक की भूमिका कौशल, कार्यक्रम की आवश्यकता, आवश्यक सत्यापन तथा SPF की नीतियों के अनुसार तय होगी। मैं इस आवेदन के मूल्यांकन, समन्वय एवं रिकॉर्ड हेतु SPF द्वारा संपर्क और आवश्यक जानकारी के उपयोग की सहमति देता/देती हूँ। मैं अपने आवेदन में सुधार या उसे वापस लेने का अनुरोध कर सकता/सकती हूँ।
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
              I accept the Declaration & Consent terms / मैं सहमत हूँ।
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
              <span>Received / Skill Assessment</span>
            </div>
            <div className="spf-office-field">
              <label>Review Desk</label>
              <span>SPF Professional Expert Network</span>
            </div>
            <div className="spf-office-field">
              <label>Helpline</label>
              <span>8090517004</span>
            </div>
            <div className="spf-office-field">
              <label>Email Records</label>
              <span>Stored & Logged</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="spf-form-actions">
          <div className="spf-form-footer-badge">
            <span>🛡 Verified SPF Non-Profit Form</span>
            <span>•</span>
            <span>Recorded & Sent to SPF Email</span>
          </div>

          <button
            type="submit"
            className="spf-submit-btn"
            disabled={loading}
          >
            {loading ? 'Submitting Registration...' : 'Register as Skill Volunteer →'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SkillVolunteerForm;
