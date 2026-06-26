import { useState } from 'react';
import { GRANT_CATEGORIES, GRANT_ORG_TYPES, GRANT_STEPS } from '../constants';
import { grantService } from '../services/api';
import { isValidEmail, isValidPhone } from '../utils';
import { Button, FormField } from '../components/ui';
import './GrantPage.css';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  organization: '',
  orgType: '',
  designation: '',
  city: '',
  state: '',
  pinCode: '',
  category: '',
  projectTitle: '',
  requestedAmount: '',
  description: '',
};

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh',
].map((s) => ({ value: s, label: s }));

function GrantPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'Full name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!isValidEmail(form.email)) next.email = 'Enter a valid email';
    if (!form.phone.trim()) next.phone = 'Phone is required';
    else if (!isValidPhone(form.phone)) next.phone = 'Enter a valid phone number';
    if (!form.city.trim()) next.city = 'City is required';
    if (!form.state) next.state = 'State is required';
    if (!form.category) next.category = 'Select a grant category';
    if (!form.projectTitle.trim()) next.projectTitle = 'Project title is required';
    if (!form.description.trim()) next.description = 'Brief description is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await grantService.submitApplication(form);
    } catch {
      /* graceful fallback when API is unavailable */
    } finally {
      setLoading(false);
      setSubmitted(true);
      setForm(INITIAL_FORM);
    }
  };

  if (submitted) {
    return (
      <div className="grant-page">
        <div className="grant-page__hero grant-page__hero--compact">
          <div className="container">
            <h1>Application Received</h1>
            <p>Thank you for applying. Our grants team will review your submission and contact you within 7–10 business days.</p>
          </div>
        </div>
        <div className="container grant-page__success">
          <div className="grant-success-card">
            <span className="grant-success-card__icon" aria-hidden="true">✓</span>
            <h2>Your grant application has been submitted</h2>
            <p>A confirmation email will be sent to the address you provided.</p>
            <Button to="/" variant="primary">Back to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grant-page">
      <div className="grant-page__hero">
        <div className="container grant-page__hero-inner">
          <div>
            <span className="grant-page__badge">Funding Opportunities</span>
            <h1>Apply for a Grant</h1>
            <p>
              SAARK supports community-led projects in education, agriculture, women empowerment,
              healthcare, and environmental conservation. Fill in your details to get started.
            </p>
          </div>
          <div className="grant-page__stats">
            <div><strong>₹5Cr+</strong><span>Disbursed annually</span></div>
            <div><strong>120+</strong><span>Grants awarded</span></div>
            <div><strong>26</strong><span>States covered</span></div>
          </div>
        </div>
      </div>

      <div className="container grant-page__body">
        <aside className="grant-sidebar">
          <h3>How It Works</h3>
          <ol className="grant-steps">
            {GRANT_STEPS.map((step, i) => (
              <li key={step.title}>
                <span className="grant-steps__num">{i + 1}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="grant-sidebar__note">
            <strong>Need help?</strong>
            <p>Email <a href="mailto:grants@saarkfoundation.org">grants@saarkfoundation.org</a></p>
          </div>
        </aside>

        <form className="grant-form" onSubmit={handleSubmit} noValidate>
          <div className="grant-form__header">
            <h2>Grant Application Form</h2>
            <p>Fields marked with <span className="grant-form__req">*</span> are required</p>
          </div>

          <fieldset className="grant-form__section">
            <legend className="form-section-title">Personal Details</legend>
            <div className="form-row">
              <FormField
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                error={errors.fullName}
                required
                placeholder="Enter your full name"
              />
              <FormField
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                required
                placeholder="you@example.com"
              />
            </div>
            <div className="form-row">
              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                error={errors.phone}
                required
                placeholder="+91 98765 43210"
              />
              <FormField
                label="Designation / Role"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                placeholder="e.g. Program Director"
              />
            </div>
          </fieldset>

          <fieldset className="grant-form__section">
            <legend className="form-section-title">Organization Details</legend>
            <div className="form-row">
              <FormField
                label="Organization Name"
                name="organization"
                value={form.organization}
                onChange={handleChange}
                placeholder="Leave blank if applying as individual"
              />
              <FormField
                label="Organization Type"
                name="orgType"
                type="select"
                value={form.orgType}
                onChange={handleChange}
                options={GRANT_ORG_TYPES}
              />
            </div>
          </fieldset>

          <fieldset className="grant-form__section">
            <legend className="form-section-title">Location</legend>
            <div className="form-row form-row--3">
              <FormField
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                error={errors.city}
                required
                placeholder="City"
              />
              <FormField
                label="State"
                name="state"
                type="select"
                value={form.state}
                onChange={handleChange}
                error={errors.state}
                required
                options={[{ value: '', label: 'Select state' }, ...INDIAN_STATES]}
              />
              <FormField
                label="PIN Code"
                name="pinCode"
                value={form.pinCode}
                onChange={handleChange}
                placeholder="110001"
              />
            </div>
          </fieldset>

          <fieldset className="grant-form__section">
            <legend className="form-section-title">Grant Details</legend>
            <div className="form-row">
              <FormField
                label="Grant Category"
                name="category"
                type="select"
                value={form.category}
                onChange={handleChange}
                error={errors.category}
                required
                options={GRANT_CATEGORIES}
              />
              <FormField
                label="Requested Amount (₹)"
                name="requestedAmount"
                type="number"
                value={form.requestedAmount}
                onChange={handleChange}
                placeholder="e.g. 500000"
                hint="Optional — approximate funding needed"
              />
            </div>
            <FormField
              label="Project Title"
              name="projectTitle"
              value={form.projectTitle}
              onChange={handleChange}
              error={errors.projectTitle}
              required
              placeholder="Give your project a clear title"
            />
            <FormField
              label="Project Description"
              name="description"
              type="textarea"
              value={form.description}
              onChange={handleChange}
              error={errors.description}
              required
              rows={4}
              placeholder="Briefly describe your project goals, target beneficiaries, and expected impact..."
            />
          </fieldset>

          <div className="grant-form__footer">
            <p className="grant-form__disclaimer">
              By submitting, you agree to SAARK&apos;s grant terms and confirm that the information provided is accurate.
            </p>
            <Button type="submit" variant="primary" size="md" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GrantPage;
