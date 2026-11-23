import { useState } from 'react';
import { INDIAN_STATES, SPF_PROGRAMMES, INTERNSHIP_AREAS_OF_INTEREST } from '../../constants/forms';
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
  gender: '',
  currentAddress: '',
  state: '',
  district: '',
  emergencyName: '',
  emergencyNumber: '',

  // 02. Academic Details
  college: '',
  course: '',
  degree: '',
  specialisation: '',
  currentYearSemester: '',
  expectedGradYear: '',
  studentId: '',
  collegeCityState: '',
  facultyCoordinatorName: '',
  facultyCoordinatorContact: '',

  // 03. Internship Preference
  preferredDomain: '',
  preferredProgram: '',
  preferredRole: '',
  preferredLocation: '',
  mode: 'Hybrid',
  duration: '8 weeks',
  durationOther: '',
  startDate: '',
  endDate: '',
  hoursPerWeek: '20',
  availability: 'Flexible',

  // 04. Area of Interest
  areasOfInterest: [],
  areaOther: '',

  // 05. Skills & Experience
  technicalSkills: '',
  languagesKnown: '',
  softwareTools: '',
  previousExperience: '',
  workSampleLink: '',
  whyInternWithSPF: '',
  learningObjectives: '',

  // 06. Documents
  docCv: false,
  docCollegeId: false,
  docBonafide: false,
  docMarksheet: false,
  docPortfolio: false,
  documentsLink: '',

  // 07. Declaration
  consent: false,
  applicantPlace: '',
  applicationDate: new Date().toISOString().split('T')[0],
};

function InternshipForm() {
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
      const currentList = prev[listName] || [];
      const updated = currentList.includes(item)
        ? currentList.filter((x) => x !== item)
        : [...currentList, item];
      return { ...prev, [listName]: updated };
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required / पूरा नाम आवश्यक है';
    if (!form.dob) newErrors.dob = 'Date of Birth is required / जन्म तिथि आवश्यक है';
    if (!form.mobile.trim()) newErrors.mobile = 'Mobile Number is required / मोबाइल नंबर आवश्यक है';
    else if (!isValidPhone(form.mobile)) newErrors.mobile = 'Enter a valid 10-digit mobile number';
    if (!form.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp Number is required / व्हाट्सऐप नंबर आवश्यक है';
    if (!form.email.trim()) newErrors.email = 'Email Address is required / ईमेल आवश्यक है';
    else if (!isValidEmail(form.email)) newErrors.email = 'Enter a valid email address';
    if (!form.currentAddress.trim()) newErrors.currentAddress = 'Address is required / पता आवश्यक है';
    if (!form.state) newErrors.state = 'State is required / राज्य चुनें';
    if (!form.district.trim()) newErrors.district = 'District is required / जिला आवश्यक है';

    if (!form.college.trim()) newErrors.college = 'College/University name is required';
    if (!form.course.trim()) newErrors.course = 'Course/Programme is required';

    if (!form.consent) newErrors.consent = 'You must accept the declaration and consent / सहमति आवश्यक है';

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
      '01. Personal Details': {
        'Full Name': form.fullName,
        'Date of Birth': form.dob,
        'Mobile Number': form.mobile,
        'WhatsApp Number': form.whatsapp,
        'Email Address': form.email,
        'Gender': form.gender || 'Not specified',
        'Current Address': form.currentAddress,
        'State': form.state,
        'District': form.district,
        'Emergency Contact': `${form.emergencyName || 'N/A'} (${form.emergencyNumber || 'N/A'})`,
      },
      '02. Academic Details': {
        'College / University': form.college,
        'Course / Programme': form.course,
        'Degree / Qualification': form.degree || 'N/A',
        'Specialisation': form.specialisation || 'N/A',
        'Current Year / Semester': form.currentYearSemester || 'N/A',
        'Expected Graduation Year': form.expectedGradYear || 'N/A',
        'Student ID': form.studentId || 'N/A',
        'College City & State': form.collegeCityState || 'N/A',
        'Placement Coordinator': `${form.facultyCoordinatorName || 'N/A'} - ${form.facultyCoordinatorContact || 'N/A'}`,
      },
      '03. Internship Preference': {
        'Preferred Domain': form.preferredDomain || 'General',
        'Preferred SPF Programme': form.preferredProgram || 'Any',
        'Preferred Role': form.preferredRole || 'Any',
        'Preferred Location': form.preferredLocation || 'Any',
        'Mode': form.mode,
        'Duration': form.duration === 'Other' ? form.durationOther : form.duration,
        'Dates': `From ${form.startDate || 'Immediate'} to ${form.endDate || 'Flexible'}`,
        'Hours / Week': form.hoursPerWeek,
        'Availability': form.availability,
      },
      '04. Area of Interest': {
        'Selected Areas': form.areasOfInterest.length > 0 ? form.areasOfInterest : ['Not specified'],
        'Other Area': form.areaOther || 'None',
      },
      '05. Skills & Experience': {
        'Technical Skills': form.technicalSkills || 'N/A',
        'Languages Known': form.languagesKnown || 'N/A',
        'Software / Tools': form.softwareTools || 'N/A',
        'Previous Experience': form.previousExperience || 'N/A',
        'Work Samples / Portfolio': form.workSampleLink || 'N/A',
        'Why SPF': form.whyInternWithSPF || 'N/A',
        'Learning Objectives': form.learningObjectives || 'N/A',
      },
      '06. Documents': {
        'Updated CV Attached/Confirmed': form.docCv ? 'Yes' : 'No',
        'College ID': form.docCollegeId ? 'Yes' : 'No',
        'Bonafide Letter': form.docBonafide ? 'Yes' : 'No',
        'Marksheet': form.docMarksheet ? 'Yes' : 'No',
        'Portfolio': form.docPortfolio ? 'Yes' : 'No',
        'Document / Portfolio Link': form.documentsLink || 'N/A',
      },
      '07. Declaration': {
        'Consent Agreed': form.consent ? 'Agreed & Confirmed' : 'No',
        'Place': form.applicantPlace || form.district,
        'Date': form.applicationDate,
      },
    };

    try {
      const res = await submitApplicationForm({
        formCode: 'INT',
        formTitle: 'Internship Application Form',
        structuredData,
        apiEndpoint: '/internships/apply',
      });
      setResult(res);
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <FormSubmissionSuccess
        applicationId={result.applicationId}
        formTitle="Internship Application Form / इंटर्नशिप आवेदन प्रपत्र"
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
      {/* Form Header */}
      <div className="spf-form-header">
        <span className="spf-form-header__tagline">Learn • Contribute • Create Impact</span>
        <h1 className="spf-form-header__title">INTERNSHIP APPLICATION FORM</h1>
        <div className="spf-form-header__hindi">इंटर्नशिप आवेदन प्रपत्र</div>
        <div className="spf-form-header__meta">
          <div className="spf-form-header__meta-item">
            <span>Org:</span> <strong>SAARK Philanthropy Foundation</strong>
          </div>
          <div className="spf-form-header__meta-item">
            <span>Helpline:</span> <strong>8090517004</strong>
          </div>
          <div className="spf-form-header__meta-item">
            <span>Email:</span> <strong>info@saarkfoundation.org</strong>
          </div>
          <div className="spf-form-header__meta-item">
            <span>Date:</span> <strong>{form.applicationDate}</strong>
          </div>
        </div>
      </div>

      <form className="spf-form-body" onSubmit={handleSubmit} noValidate>
        {/* 01. PERSONAL DETAILS */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">01</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">APPLICANT PERSONAL DETAILS</h2>
              <div className="spf-form-section__subtitle">आवेदक का व्यक्तिगत विवरण</div>
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
                placeholder="e.g. Rahul Sharma"
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

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Gender (optional) <span className="spf-field-label__hindi">/ लिंग (वैकल्पिक)</span>
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
                <option value="Prefer not to say">Prefer not to say</option>
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
          </div>

          <div className="spf-grid-2">
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
                placeholder="District name"
                className={`spf-input ${errors.district ? 'spf-input--error' : ''}`}
                required
              />
              {errors.district && <span className="spf-field-error">{errors.district}</span>}
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Current Address <span className="spf-field-label__hindi">/ वर्तमान पता</span>
                <span className="spf-field-required">*</span>
              </label>
              <input
                type="text"
                name="currentAddress"
                value={form.currentAddress}
                onChange={handleChange}
                placeholder="Full address, house/street, pin code"
                className={`spf-input ${errors.currentAddress ? 'spf-input--error' : ''}`}
                required
              />
              {errors.currentAddress && <span className="spf-field-error">{errors.currentAddress}</span>}
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
                placeholder="Parent/Guardian/Contact name"
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

        {/* 02. ACADEMIC DETAILS */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">02</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">ACADEMIC DETAILS</h2>
              <div className="spf-form-section__subtitle">शैक्षणिक विवरण</div>
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">
                College / University <span className="spf-field-label__hindi">/ कॉलेज या विश्वविद्यालय</span>
                <span className="spf-field-required">*</span>
              </label>
              <input
                type="text"
                name="college"
                value={form.college}
                onChange={handleChange}
                placeholder="Institution name"
                className={`spf-input ${errors.college ? 'spf-input--error' : ''}`}
                required
              />
              {errors.college && <span className="spf-field-error">{errors.college}</span>}
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Course / Programme <span className="spf-field-label__hindi">/ पाठ्यक्रम</span>
                <span className="spf-field-required">*</span>
              </label>
              <input
                type="text"
                name="course"
                value={form.course}
                onChange={handleChange}
                placeholder="e.g. B.Tech, MSW, BBA, B.Sc"
                className={`spf-input ${errors.course ? 'spf-input--error' : ''}`}
                required
              />
              {errors.course && <span className="spf-field-error">{errors.course}</span>}
            </div>
          </div>

          <div className="spf-grid-3">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Degree / Qualification <span className="spf-field-label__hindi">/ डिग्री</span>
              </label>
              <input
                type="text"
                name="degree"
                value={form.degree}
                onChange={handleChange}
                placeholder="Graduation / Post Graduation"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Specialisation <span className="spf-field-label__hindi">/ विषय विशेषज्ञता</span>
              </label>
              <input
                type="text"
                name="specialisation"
                value={form.specialisation}
                onChange={handleChange}
                placeholder="e.g. Social Work, Agriculture, CS"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Current Year / Semester <span className="spf-field-label__hindi">/ वर्तमान वर्ष</span>
              </label>
              <input
                type="text"
                name="currentYearSemester"
                value={form.currentYearSemester}
                onChange={handleChange}
                placeholder="e.g. 3rd Year / 5th Sem"
                className="spf-input"
              />
            </div>
          </div>

          <div className="spf-grid-3">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Expected Graduation Year <span className="spf-field-label__hindi">/ उत्तीर्ण वर्ष</span>
              </label>
              <input
                type="text"
                name="expectedGradYear"
                value={form.expectedGradYear}
                onChange={handleChange}
                placeholder="e.g. 2027"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Student ID / Enrollment (optional) <span className="spf-field-label__hindi">/ छात्र आईडी</span>
              </label>
              <input
                type="text"
                name="studentId"
                value={form.studentId}
                onChange={handleChange}
                placeholder="Roll / Enrollment No."
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                College City & State <span className="spf-field-label__hindi">/ शहर एवं राज्य</span>
              </label>
              <input
                type="text"
                name="collegeCityState"
                value={form.collegeCityState}
                onChange={handleChange}
                placeholder="e.g. Varanasi, UP"
                className="spf-input"
              />
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Faculty / Placement Coordinator Name <span className="spf-field-label__hindi">(if applicable)</span>
              </label>
              <input
                type="text"
                name="facultyCoordinatorName"
                value={form.facultyCoordinatorName}
                onChange={handleChange}
                placeholder="Coordinator Name"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Faculty / Coordinator Email or Phone
              </label>
              <input
                type="text"
                name="facultyCoordinatorContact"
                value={form.facultyCoordinatorContact}
                onChange={handleChange}
                placeholder="Email or Phone number"
                className="spf-input"
              />
            </div>
          </div>
        </section>

        {/* 03. INTERNSHIP PREFERENCE */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">03</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">INTERNSHIP PREFERENCE</h2>
              <div className="spf-form-section__subtitle">इंटर्नशिप प्राथमिकताएँ</div>
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Preferred Internship Domain <span className="spf-field-label__hindi">/ पसंदीदा क्षेत्र</span>
              </label>
              <input
                type="text"
                name="preferredDomain"
                value={form.preferredDomain}
                onChange={handleChange}
                placeholder="e.g. Rural Livelihoods, Education, IT"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Preferred SPF Programme <span className="spf-field-label__hindi">/ SPF कार्यक्रम</span>
              </label>
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
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Preferred Role <span className="spf-field-label__hindi">/ पसंदीदा भूमिका</span>
              </label>
              <input
                type="text"
                name="preferredRole"
                value={form.preferredRole}
                onChange={handleChange}
                placeholder="e.g. Field Researcher, Content Creator, Web Dev"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Preferred Location <span className="spf-field-label__hindi">/ पसंदीदा स्थान</span>
              </label>
              <input
                type="text"
                name="preferredLocation"
                value={form.preferredLocation}
                onChange={handleChange}
                placeholder="e.g. District / Remote / Head Office"
                className="spf-input"
              />
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Mode <span className="spf-field-label__hindi">/ कार्य प्रणाली</span>
              </label>
              <div className="spf-radio-group">
                {['On-site', 'Remote', 'Hybrid'].map((m) => (
                  <label key={m} className="spf-radio-label">
                    <input
                      type="radio"
                      name="mode"
                      value={m}
                      checked={form.mode === m}
                      onChange={handleChange}
                    />
                    <span>{m}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Duration <span className="spf-field-label__hindi">/ अवधि</span>
              </label>
              <div className="spf-radio-group">
                {['4 weeks', '6 weeks', '8 weeks', '3 months', 'Other'].map((d) => (
                  <label key={d} className="spf-radio-label">
                    <input
                      type="radio"
                      name="duration"
                      value={d}
                      checked={form.duration === d}
                      onChange={handleChange}
                    />
                    <span>{d}</span>
                  </label>
                ))}
              </div>
              {form.duration === 'Other' && (
                <input
                  type="text"
                  name="durationOther"
                  value={form.durationOther}
                  onChange={handleChange}
                  placeholder="Specify duration"
                  className="spf-input"
                  style={{ marginTop: '0.5rem' }}
                />
              )}
            </div>
          </div>

          <div className="spf-grid-3">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Preferred Start Date <span className="spf-field-label__hindi">/ प्रारंभ तिथि</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Preferred End Date <span className="spf-field-label__hindi">/ समाप्ति तिथि</span>
              </label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Availability <span className="spf-field-label__hindi">/ उपलब्धता</span>
              </label>
              <select
                name="availability"
                value={form.availability}
                onChange={handleChange}
                className="spf-select"
              >
                <option value="Flexible">Flexible / लचीला</option>
                <option value="Weekdays">Weekdays only</option>
                <option value="Weekends">Weekends only</option>
              </select>
            </div>
          </div>
        </section>

        {/* 04. AREA OF INTEREST */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">04</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">AREA OF INTEREST</h2>
              <div className="spf-form-section__subtitle">रुचि के क्षेत्र (एक या अधिक चुनें)</div>
            </div>
          </div>

          <div className="spf-options-grid">
            {INTERNSHIP_AREAS_OF_INTEREST.map((area) => (
              <label
                key={area}
                className={`spf-checkbox-card ${
                  form.areasOfInterest.includes(area) ? 'spf-checkbox-card--active' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.areasOfInterest.includes(area)}
                  onChange={() => handleCheckboxListChange('areasOfInterest', area)}
                />
                <span className="spf-checkbox-card__text">{area}</span>
              </label>
            ))}
          </div>

          <div className="spf-field-group" style={{ marginTop: '1rem' }}>
            <label className="spf-field-label">
              Other Area of Interest <span className="spf-field-label__hindi">/ अन्य:</span>
            </label>
            <input
              type="text"
              name="areaOther"
              value={form.areaOther}
              onChange={handleChange}
              placeholder="Specify any other field of interest"
              className="spf-input"
            />
          </div>
        </section>

        {/* 05. SKILLS, EXPERIENCE & LEARNING OBJECTIVES */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">05</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">SKILLS, EXPERIENCE & LEARNING OBJECTIVES</h2>
              <div className="spf-form-section__subtitle">कौशल, अनुभव एवं सीखने के उद्देश्य</div>
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Technical Skills <span className="spf-field-label__hindi">/ तकनीकी कौशल</span>
              </label>
              <input
                type="text"
                name="technicalSkills"
                value={form.technicalSkills}
                onChange={handleChange}
                placeholder="e.g. Python, Data Analysis, Content Writing"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Languages Known <span className="spf-field-label__hindi">/ ज्ञात भाषाएँ</span>
              </label>
              <input
                type="text"
                name="languagesKnown"
                value={form.languagesKnown}
                onChange={handleChange}
                placeholder="e.g. Hindi, English, Bhojpuri"
                className="spf-input"
              />
            </div>
          </div>

          <div className="spf-grid-2">
            <div className="spf-field-group">
              <label className="spf-field-label">
                Software / Tools Known <span className="spf-field-label__hindi">/ सॉफ्टवेयर एवं टूल</span>
              </label>
              <input
                type="text"
                name="softwareTools"
                value={form.softwareTools}
                onChange={handleChange}
                placeholder="e.g. MS Excel, Canva, Figma, GIS, SPSS"
                className="spf-input"
              />
            </div>

            <div className="spf-field-group">
              <label className="spf-field-label">
                Previous Internship / Experience (if any) <span className="spf-field-label__hindi">/ पूर्व अनुभव</span>
              </label>
              <input
                type="text"
                name="previousExperience"
                value={form.previousExperience}
                onChange={handleChange}
                placeholder="Organization or project details"
                className="spf-input"
              />
            </div>
          </div>

          <div className="spf-field-group">
            <label className="spf-field-label">
              Projects / Research / Work Samples link <span className="spf-field-label__hindi">/ कार्य नमूना लिंक</span>
            </label>
            <input
              type="url"
              name="workSampleLink"
              value={form.workSampleLink}
              onChange={handleChange}
              placeholder="Google Drive, GitHub, LinkedIn, or Portfolio link"
              className="spf-input"
            />
          </div>

          <div className="spf-field-group">
            <label className="spf-field-label">
              Why do you want to intern with SPF? <span className="spf-field-label__hindi">/ SPF के साथ इंटर्नशिप क्यों करना चाहते हैं?</span>
            </label>
            <textarea
              name="whyInternWithSPF"
              value={form.whyInternWithSPF}
              onChange={handleChange}
              rows={3}
              placeholder="Tell us about your motivation..."
              className="spf-textarea"
            />
          </div>

          <div className="spf-field-group">
            <label className="spf-field-label">
              What do you wish to learn or contribute? <span className="spf-field-label__hindi">/ आप क्या सीखना या योगदान देना चाहते हैं?</span>
            </label>
            <textarea
              name="learningObjectives"
              value={form.learningObjectives}
              onChange={handleChange}
              rows={3}
              placeholder="Your learning goals and contribution..."
              className="spf-textarea"
            />
          </div>
        </section>

        {/* 06. DOCUMENT CHECKLIST */}
        <section className="spf-form-section">
          <div className="spf-form-section__header">
            <span className="spf-form-section__number">06</span>
            <div className="spf-form-section__titles">
              <h2 className="spf-form-section__title">DOCUMENT CHECKLIST</h2>
              <div className="spf-form-section__subtitle">दस्तावेज़ सूची</div>
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
              <span className="spf-checkbox-card__text">
                <strong>Updated CV / Resume (required)</strong>
              </span>
            </label>

            <label className={`spf-checkbox-card ${form.docCollegeId ? 'spf-checkbox-card--active' : ''}`}>
              <input
                type="checkbox"
                name="docCollegeId"
                checked={form.docCollegeId}
                onChange={handleChange}
              />
              <span className="spf-checkbox-card__text">College ID (if available)</span>
            </label>

            <label className={`spf-checkbox-card ${form.docBonafide ? 'spf-checkbox-card--active' : ''}`}>
              <input
                type="checkbox"
                name="docBonafide"
                checked={form.docBonafide}
                onChange={handleChange}
              />
              <span className="spf-checkbox-card__text">Bonafide / Internship Letter (if required)</span>
            </label>

            <label className={`spf-checkbox-card ${form.docMarksheet ? 'spf-checkbox-card--active' : ''}`}>
              <input
                type="checkbox"
                name="docMarksheet"
                checked={form.docMarksheet}
                onChange={handleChange}
              />
              <span className="spf-checkbox-card__text">Academic marksheet / certificate</span>
            </label>

            <label className={`spf-checkbox-card ${form.docPortfolio ? 'spf-checkbox-card--active' : ''}`}>
              <input
                type="checkbox"
                name="docPortfolio"
                checked={form.docPortfolio}
                onChange={handleChange}
              />
              <span className="spf-checkbox-card__text">Portfolio / writing sample</span>
            </label>
          </div>

          <div className="spf-field-group" style={{ marginTop: '1rem' }}>
            <label className="spf-field-label">
              CV / Documents Cloud Folder or Portfolio Link
            </label>
            <input
              type="url"
              name="documentsLink"
              value={form.documentsLink}
              onChange={handleChange}
              placeholder="Paste Google Drive / Dropbox link with CV"
              className="spf-input"
            />
          </div>

          <div className="spf-notice-box spf-notice-box--warning">
            🔒 <strong>Safety Notice:</strong> Submit only documents relevant to the application. Do NOT send passwords, OTPs, bank details, or unnecessary sensitive identity documents.
            <div style={{ marginTop: '0.25rem', fontSize: '0.8rem' }}>
              केवल आवेदन से संबंधित दस्तावेज़ साझा करें। पासवर्ड, ओटीपी या बैंक विवरण कभी न भेजें।
            </div>
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
              I certify that the information in this application is accurate to the best of my knowledge. I understand that applying does not guarantee selection, placement, stipend or employment. Internship dates, duties, supervision, learning objectives, any stipend or expense reimbursement, and certificate conditions will be communicated separately in writing if selected. I agree to follow SPF’s code of conduct, safeguarding, confidentiality, data protection and workplace safety requirements. I consent to SPF contacting me about this application and using the information for selection and internship coordination. I may request correction or withdrawal of my application.
            </p>
            <p className="spf-declaration-hindi">
              मैं प्रमाणित करता/करती हूँ कि इस आवेदन में दी गई जानकारी मेरी जानकारी के अनुसार सही है। आवेदन करने से चयन, इंटर्नशिप, स्टाइपेंड या नौकरी की गारंटी नहीं मिलती। चयन होने पर इंटर्नशिप की तिथि, कार्य, मार्गदर्शन, सीखने के उद्देश्य, स्टाइपेंड/खर्च प्रतिपूर्ति तथा प्रमाणपत्र की शर्तें अलग से लिखित रूप में बताई जाएँगी। मैं SPF की आचार संहिता, सुरक्षा, गोपनीयता, डेटा संरक्षण एवं कार्यस्थल सुरक्षा नियमों का पालन करूँगा/करूँगी। मैं आवेदन प्रक्रिया एवं इंटर्नशिप समन्वय हेतु SPF द्वारा संपर्क और जानकारी के उपयोग की सहमति देता/देती हूँ।
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
                placeholder="City / District"
                className="spf-input"
              />
            </div>
            <div className="spf-field-group">
              <label className="spf-field-label">Date / दिनांक</label>
              <input
                type="date"
                name="applicationDate"
                value={form.applicationDate}
                onChange={handleChange}
                className="spf-input"
              />
            </div>
          </div>
        </section>

        {/* FOR SPF OFFICE USE ONLY REFERENCE */}
        <div className="spf-office-box">
          <div className="spf-office-box__title">
            📋 FOR SPF OFFICE USE ONLY / केवल SPF कार्यालय हेतु
          </div>
          <div className="spf-office-grid">
            <div className="spf-office-field">
              <label>Status</label>
              <span>Received / Pending Review</span>
            </div>
            <div className="spf-office-field">
              <label>Coordinator Desk</label>
              <span>SPF Internship & Academic Cell</span>
            </div>
            <div className="spf-office-field">
              <label>Verification</label>
              <span>Via Official Email & Call</span>
            </div>
            <div className="spf-office-field">
              <label>Helpline</label>
              <span>8090517004</span>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="spf-form-actions">
          <div className="spf-form-footer-badge">
            <span>🛡 Verified SPF Non-Profit Form</span>
            <span>•</span>
            <span>Response recorded & emailed</span>
          </div>

          <button
            type="submit"
            className="spf-submit-btn"
            disabled={loading}
          >
            {loading ? 'Recording Application...' : 'Submit Internship Application →'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default InternshipForm;
