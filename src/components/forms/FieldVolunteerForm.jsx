import { useState } from 'react';
import { INDIAN_STATES, FIELD_VOLUNTEER_PROGRAMMES } from '../../constants/forms';
import { submitApplicationForm } from '../../services/formSubmission';
import { isValidEmail, isValidPhone } from '../../utils';
import FormSubmissionSuccess from './FormSubmissionSuccess';
import './forms.css';

const INITIAL_FORM = {
  // 01. Personal Info
  fullName: '',
  guardianName: '',
  dob: '',
  gender: '',
  mobile: '',
  whatsapp: '',
  email: '',
  preferredLanguage: 'Hindi',
  languageOther: '',

  // 02. Address & Location
  state: '',
  district: '',
  block: '',
  gramPanchayat: '',
  villageTown: '',
  pinCode: '',
  completeAddress: '',

  // 03. Education & Experience
  highestQualification: '',
  occupation: '',
  institution: '',
  yearsOfExperience: '',
  ngoExperience: '',
  skillsExpertise: '',

  // 04. Volunteer Preferences
  selectedProgrammes: [],
  otherProgramme: '',
  preferredWorkingArea: '',
  preferredRole: '',
  availability: 'Part-time',
  preferredHours: '10 hrs/week',
  travelWithinDistrict: 'Yes',
  startDate: '',

  // 05. Documents
  docPhoto: false,
  docGovtId: false,
  docResume: false,
  docCertificates: false,
  docCloudLink: '',

  // 06. Declaration & Consent
  consent: false,
  applicantPlace: '',
  registrationDate: new Date().toISOString().split('T')[0],
};

function FieldVolunteerForm() {
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
    if (!form.guardianName.trim()) newErrors.guardianName = "Father's / Mother's name is required / अभिभावक का नाम";
    if (!form.dob) newErrors.dob = 'Date of birth is required';
    if (!form.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    else if (!isValidPhone(form.mobile)) newErrors.mobile = 'Valid 10-digit number required';
    if (!form.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp number is required';
    if (!form.email.trim()) newErrors.email = 'Email address is required';
    else if (!isValidEmail(form.email)) newErrors.email = 'Enter a valid email address';

    if (!form.state) newErrors.state = 'State is required / राज्य चुनें';
    if (!form.district.trim()) newErrors.district = 'District is required / जिला आवश्यक है';
    if (!form.block.trim()) newErrors.block = 'Block is required / ब्लॉक आवश्यक है';
    if (!form.villageTown.trim()) newErrors.villageTown = 'Village/Town is required / गाँव या नगर आवश्यक है';

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
      '01. Personal Information': {
        'Full Name': form.fullName,
        "Father's / Mother's Name": form.guardianName,
        'Date of Birth': form.dob,
        'Gender': form.gender || 'Not specified',
        'Mobile Number': form.mobile,
        'WhatsApp Number': form.whatsapp,
        'Email Address': form.email,
        'Preferred Language': form.preferredLanguage === 'Other' ? form.languageOther : form.preferredLanguage,
      },
      '02. Address & Location': {
        'State': form.state,
        'District': form.district,
        'Block': form.block,
        'Gram Panchayat': form.gramPanchayat || 'N/A',
        'Village / Town': form.villageTown,
        'PIN Code': form.pinCode || 'N/A',
        'Complete Address': form.completeAddress || `${form.villageTown}, ${form.block}, ${form.district}, ${form.state}`,
      },
      '03. Education & Experience': {
        'Highest Qualification': form.highestQualification || 'N/A',
        'Occupation': form.occupation || 'N/A',
        'Institution': form.institution || 'N/A',
        'Years of Experience': form.yearsOfExperience || 'N/A',
        'NGO / Social Work Experience': form.ngoExperience || 'N/A',
        'Skills & Expertise': form.skillsExpertise || 'N/A',
      },
      '04. Volunteer Preferences': {
        'Preferred Programmes': form.selectedProgrammes.length > 0 ? form.selectedProgrammes : ['Any Community Program'],
        'Other Programme': form.otherProgramme || 'None',
        'Preferred Working Area': form.preferredWorkingArea || `${form.block}, ${form.district}`,
        'Preferred Role': form.preferredRole || 'Field Volunteer / Mobiliser',
        'Availability': form.availability,
        'Preferred Hours': form.preferredHours,
        'Can Travel Within District': form.travelWithinDistrict,
        'Preferred Start Date': form.startDate || 'Immediate',
      },
      '05. Documents': {
        'Recent Photo Attached': form.docPhoto ? 'Yes' : 'No',
        'Govt ID Proof': form.docGovtId ? 'Yes' : 'No',
        'Resume / CV': form.docResume ? 'Yes' : 'No',
        'Relevant Certificates': form.docCertificates ? 'Yes' : 'No',
        'Document Cloud Link': form.docCloudLink || 'N/A',
      },
      '06. Declaration & Consent': {
        'Consent Agreed': form.consent ? 'Agreed & Confirmed' : 'No',
        'Place': form.applicantPlace || form.district,
        'Date': form.registrationDate,
      },
    };

    try {
      const res = await submitApplicationForm({
        formCode: 'FLD',
        formTitle: 'Field Volunteer Registration Form',
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
        formTitle="Field Volunteer Registration Form / क्षेत्रीय स्वयंसेवक पंजीकरण प्रपत्र"
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
        <span className="spf-form-header__tagline">Volunteer with Purpose • Serve with Dignity</span>
        <h1 className="spf-form-header__title">FIELD VOLUNTEER REGISTRATION FORM</h1>
        <div className="spf-form-header__hindi">क्षेत्रीय स्वयंसेवक पंजीकरण प्रपत्र</div>
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
        {/* 01. PERSONAL INFORMATION */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">01</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">PERSONAL INFORMATION</h2>
              <div className="spf-form-section__subtitle">व्यक्तिगत जानकारी</div>
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
                Father’s / Mother’s Name <span className="spf-field-label__hindi">/ अभिभावक का नाम</span>
                <span className="spf-field-required">*</span>
              </label>
              <input
                type="text"
                name="guardianName"
                value={form.guardianName}
                onChange={handleChange}
                placeholder="Parent's Name"
                className={`spf-input ${errors.guardianName ? 'spf-input--error' : ''}`}
                required
              />
              {errors.guardianName && <span className="spf-field-error">{errors.guardianName}</span>}
            </div>
          </div>

          <div className="spf-grid-3">
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
              <label className="spf-field-label">Preferred Language <span className="spf-field-label__hindi">/ पसंदीदा भाषा</span></label>
              <select
                name="preferredLanguage"
                value={form.preferredLanguage}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="Hindi">Hindi / हिन्दी</option>
                <option value="English">English / अंग्रेज़ी</option>
                <option value="Other">Other / अन्य</option>
              </select>
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
        </section>

        {/* 02. ADDRESS & LOCATION */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">02</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">ADDRESS & LOCATION</h2>
              <div className="spf-form-section__subtitle">पता एवं कार्यक्षेत्र</div>
            </div>
          </div>

          <div className="spf-grid-2">
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

          <div className="spf-grid-3">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Block <span className="spf-field-label__hindi">/ ब्लॉक</span>
                <span className="spf-field-required">*</span>
              </label>
              <input
                type="text"
                name="block"
                value={form.block}
                onChange={handleChange}
                placeholder="Block / Tehsil"
                className={`spf-input ${errors.block ? 'spf-input--error' : ''}`}
                required
              />
              {errors.block && <span className="spf-field-error">{errors.block}</span>}
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Gram Panchayat <span className="spf-field-label__hindi">/ ग्राम पंचायत</span></label>
              <input
                type="text"
                name="gramPanchayat"
                value={form.gramPanchayat}
                onChange={handleChange}
                placeholder="Gram Panchayat"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Village / Town <span className="spf-field-label__hindi">/ गाँव या नगर</span>
                <span className="spf-field-required">*</span>
              </label>
              <input
                type="text"
                name="villageTown"
                value={form.villageTown}
                onChange={handleChange}
                placeholder="Village / Town"
                className={`spf-input ${errors.villageTown ? 'spf-input--error' : ''}`}
                required
              />
              {errors.villageTown && <span className="spf-field-error">{errors.villageTown}</span>}
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">PIN Code <span className="spf-field-label__hindi">/ पिन कोड</span></label>
              <input
                type="text"
                name="pinCode"
                value={form.pinCode}
                onChange={handleChange}
                placeholder="6-digit PIN"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Complete Address <span className="spf-field-label__hindi">/ पूरा पता</span></label>
              <input
                type="text"
                name="completeAddress"
                value={form.completeAddress}
                onChange={handleChange}
                placeholder="House / Street details"
                className="spf-input"
              />
            </div>
          </div>
        </section>

        {/* 03. EDUCATION & EXPERIENCE */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">03</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">EDUCATION & EXPERIENCE</h2>
              <div className="spf-form-section__subtitle">शिक्षा एवं अनुभव</div>
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">Highest Qualification <span className="spf-field-label__hindi">/ उच्चतम शैक्षिक योग्यता</span></label>
              <input
                type="text"
                name="highestQualification"
                value={form.highestQualification}
                onChange={handleChange}
                placeholder="10th / 12th / Graduate / Post-Graduate"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Occupation <span className="spf-field-label__hindi">/ व्यवसाय</span></label>
              <input
                type="text"
                name="occupation"
                value={form.occupation}
                onChange={handleChange}
                placeholder="Farmer / Student / Social Worker / Business"
                className="spf-input"
              />
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">Institution <span className="spf-field-label__hindi">/ संस्थान</span></label>
              <input
                type="text"
                name="institution"
                value={form.institution}
                onChange={handleChange}
                placeholder="School / College / Organization"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Years of Experience <span className="spf-field-label__hindi">/ अनुभव (वर्ष)</span></label>
              <input
                type="text"
                name="yearsOfExperience"
                value={form.yearsOfExperience}
                onChange={handleChange}
                placeholder="e.g. 2 years"
                className="spf-input"
              />
            </div>
          </div>

          <div className="spf-field-group">
            <label className="spf-field-label">
              NGO / Social Work Experience <span className="spf-field-label__hindi">/ सामाजिक कार्य अनुभव</span>
            </label>
            <textarea
              name="ngoExperience"
              value={form.ngoExperience}
              onChange={handleChange}
              rows={2}
              placeholder="Describe any past community or volunteer work in rural areas..."
              className="spf-textarea"
            />
          </div>

          <div className="spf-field-group">
            <label className="spf-field-label">
              Skills & Expertise <span className="spf-field-label__hindi">/ कौशल एवं विशेषज्ञता</span>
            </label>
            <textarea
              name="skillsExpertise"
              value={form.skillsExpertise}
              onChange={handleChange}
              rows={2}
              placeholder="e.g. Community mobilization, teaching, healthcare support, agriculture..."
              className="spf-textarea"
            />
          </div>
        </section>

        {/* 04. VOLUNTEER PREFERENCES */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">04</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">VOLUNTEER PREFERENCES</h2>
              <div className="spf-form-section__subtitle">स्वयंसेवा संबंधी प्राथमिकताएँ (एक या अधिक कार्यक्रम चुनें)</div>
            </div>
          </div>

          <div className="spf-options-grid">
            {FIELD_VOLUNTEER_PROGRAMMES.map((prog) => (
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

          <div className="spf-grid-2" style={{ marginTop: '1.25rem' }}>
            <div className="spf-field-group">
              <label className="spf-field-label">Preferred Working Area <span className="spf-field-label__hindi">/ पसंदीदा कार्यक्षेत्र</span></label>
              <input
                type="text"
                name="preferredWorkingArea"
                value={form.preferredWorkingArea}
                onChange={handleChange}
                placeholder="Village / Block name"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Preferred Role <span className="spf-field-label__hindi">/ पसंदीदा भूमिका</span></label>
              <input
                type="text"
                name="preferredRole"
                value={form.preferredRole}
                onChange={handleChange}
                placeholder="Field Guide / Community Mobiliser"
                className="spf-input"
              />
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
                <option value="Part-time">Part-time / अंशकालिक</option>
                <option value="Full-time">Full-time / पूर्णकालिक</option>
                <option value="Weekend">Weekend / सप्ताहांत</option>
              </select>
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Preferred Hours <span className="spf-field-label__hindi">/ पसंदीदा समय</span></label>
              <input
                type="text"
                name="preferredHours"
                value={form.preferredHours}
                onChange={handleChange}
                placeholder="e.g. 10 hrs / week"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">Can travel in district? <span className="spf-field-label__hindi">/ यात्रा संभव?</span></label>
              <select
                name="travelWithinDistrict"
                value={form.travelWithinDistrict}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="Yes">Yes / हाँ</option>
                <option value="No">No / नहीं</option>
              </select>
            </div>
          </div>
        </section>

        {/* 05. DOCUMENTS */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">05</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">DOCUMENTS</h2>
              <div className="spf-form-section__subtitle">दस्तावेज़</div>
            </div>
          </div>

          <div className="spf-options-grid">
            <label className={`spf-checkbox-card ${form.docPhoto ? 'spf-checkbox-card--active' : ''}`}>
              <input
                type="checkbox"
                name="docPhoto"
                checked={form.docPhoto}
                onChange={handleChange}
              />
              <span className="spf-checkbox-card__text">Recent Passport-size Photograph (available)</span>
            </label>

            <label className={`spf-checkbox-card ${form.docGovtId ? 'spf-checkbox-card--active' : ''}`}>
              <input
                type="checkbox"
                name="docGovtId"
                checked={form.docGovtId}
                onChange={handleChange}
              />
              <span className="spf-checkbox-card__text">Government-issued ID proof (optional)</span>
            </label>

            <label className={`spf-checkbox-card ${form.docResume ? 'spf-checkbox-card--active' : ''}`}>
              <input
                type="checkbox"
                name="docResume"
                checked={form.docResume}
                onChange={handleChange}
              />
              <span className="spf-checkbox-card__text">Resume / CV (optional)</span>
            </label>

            <label className={`spf-checkbox-card ${form.docCertificates ? 'spf-checkbox-card--active' : ''}`}>
              <input
                type="checkbox"
                name="docCertificates"
                checked={form.docCertificates}
                onChange={handleChange}
              />
              <span className="spf-checkbox-card__text">Relevant certificates (optional)</span>
            </label>
          </div>

          <div className="spf-field-group" style={{ marginTop: '1rem' }}>
            <label className="spf-field-label">Document Cloud Folder or Photo Link (optional)</label>
            <input
              type="url"
              name="docCloudLink"
              value={form.docCloudLink}
              onChange={handleChange}
              placeholder="Google Drive link or portfolio"
              className="spf-input"
            />
          </div>
        </section>

        {/* 06. DECLARATION & CONSENT */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">06</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">DECLARATION & CONSENT</h2>
              <div className="spf-form-section__subtitle">घोषणा एवं सहमति</div>
            </div>
          </div>

          <div className="spf-declaration-box">
            <p>
              I declare that the information provided in this form is true and complete to the best of my knowledge. I understand that submission of this form does not guarantee selection or employment. Volunteer engagement will be subject to SPF’s verification, programme requirements, safeguarding standards and applicable policies. I consent to SPF contacting me regarding this application and using the information provided for volunteer registration, verification and programme coordination. SPF should collect only information necessary for these purposes.
            </p>
            <p className="spf-declaration-hindi">
              मैं घोषणा करता/करती हूँ कि इस प्रपत्र में दी गई जानकारी मेरी जानकारी के अनुसार सही एवं पूर्ण है। मैं समझता/समझती हूँ कि आवेदन जमा करने मात्र से चयन या रोजगार की गारंटी नहीं होती। स्वयंसेवा SPF की जाँच, कार्यक्रम की आवश्यकताओं, सुरक्षा मानकों एवं लागू नीतियों के अधीन होगी। मैं इस आवेदन एवं स्वयंसेवा समन्वय के संबंध में SPF द्वारा मुझसे संपर्क किए जाने तथा आवश्यक जानकारी के उपयोग हेतु सहमति देता/देती हूँ।
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
              I accept the Declaration & Consent terms / मैं उपरोक्त घोषणा एवं शर्तों से सहमत हूँ।
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
                placeholder="District / Town"
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
              <span>Received / Under Review</span>
            </div>
            <div className="spf-office-field">
              <label>Field Unit</label>
              <span>Rural Grassroots Coordination</span>
            </div>
            <div className="spf-office-field">
              <label>Verification Desk</label>
              <span>Via Phone & Local Panchayat</span>
            </div>
            <div className="spf-office-field">
              <label>Helpline</label>
              <span>8090517004</span>
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
            {loading ? 'Submitting Registration...' : 'Register as Field Volunteer →'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FieldVolunteerForm;
