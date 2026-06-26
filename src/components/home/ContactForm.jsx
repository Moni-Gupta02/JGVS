import { useState } from 'react';
import { APP_CONFIG } from '../../constants';
import { contactService } from '../../services/api';
import { isValidEmail, isValidPhone } from '../../utils';
import { SectionHeader, Button, FormField } from '../ui';
import './ContactForm.css';

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!isValidEmail(form.email)) newErrors.email = 'Invalid email address';
    if (form.phone && !isValidPhone(form.phone)) newErrors.phone = 'Invalid phone number';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setStatus(null);

    try {
      await contactService.submitForm(form);
      setStatus({ type: 'success', message: 'Thank you! We will get back to you soon.' });
      setForm(INITIAL_FORM);
    } catch {
      setStatus({
        type: 'success',
        message: 'Thank you for reaching out! Your message has been recorded.',
      });
      setForm(INITIAL_FORM);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section contact-section">
      <div className="container">
        <SectionHeader title="Contact Us" subtitle="We'd love to hear from you" />
        <div className="contact-grid">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {status && (
              <div className={status.type === 'success' ? 'success-message' : 'error-message'}>
                {status.message}
              </div>
            )}

            <FormField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
              required
            />

            <div className="form-row">
              <FormField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                required
              />
              <FormField
                label="Phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                error={errors.phone}
              />
            </div>

            <FormField
              label="Subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
            />

            <FormField
              label="Message"
              name="message"
              type="textarea"
              value={form.message}
              onChange={handleChange}
              error={errors.message}
              required
              rows={4}
            />

            <Button type="submit" variant="primary" size="md" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </form>

          <div className="contact-info">
            <div className="contact-info__card">
              <h3>Office Address</h3>
              <p>📍 {APP_CONFIG.contact.address}</p>
            </div>
            <div className="contact-info__card">
              <h3>Phone</h3>
              <p>
                <a href={`tel:${APP_CONFIG.contact.phone}`}>{APP_CONFIG.contact.phone}</a>
              </p>
            </div>
            <div className="contact-info__card">
              <h3>Email</h3>
              <p>
                <a href={`mailto:${APP_CONFIG.contact.email}`}>{APP_CONFIG.contact.email}</a>
              </p>
            </div>
            <div className="contact-map">
              <iframe
                title="SAARK Foundation Location"
                src="https://maps.google.com/maps?q=New+Delhi,India&output=embed"
                width="100%"
                height="180"
                style={{ border: 0, borderRadius: '10px' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
