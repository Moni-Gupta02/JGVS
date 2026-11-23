import { useState } from 'react';
import { APP_CONFIG } from '../../constants';

function FormSubmissionSuccess({
  applicationId,
  formTitle,
  mailtoUrl,
  whatsappUrl,
  formattedSummary,
  applicantName,
  applicantEmail,
  onReset,
}) {
  const [copied, setCopied] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="spf-form-container">
      <div className="spf-success-card">
        <div className="spf-success-icon">✓</div>
        <h2 className="spf-success-title">Application Submitted Successfully!</h2>
        <p style={{ color: 'var(--color-primary-light)', fontWeight: 600, fontSize: '1.05rem', margin: '0.25rem 0' }}>
          आवेदन सफलतापूर्वक दर्ज कर लिया गया है
        </p>
        <div>
          <span className="spf-success-app-id">
            Application No: <strong>{applicationId}</strong>
          </span>
        </div>

        <p className="spf-success-desc">
          Thank you, <strong>{applicantName}</strong>. Your response has been securely recorded and stored.
          A copy has been prepared for dispatch to <strong>{APP_CONFIG.contact.email}</strong>.
          You can confirm your submission via Email or WhatsApp below.
        </p>

        <div className="spf-success-buttons">
          <a
            href={mailtoUrl}
            className="spf-btn-email"
            target="_blank"
            rel="noopener noreferrer"
          >
            ✉ Send via Email ({APP_CONFIG.contact.email})
          </a>

          <a
            href={whatsappUrl}
            className="spf-btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 Confirm on WhatsApp (+91 8090517004)
          </a>

          <button type="button" onClick={handleCopy} className="spf-btn-outline">
            {copied ? '✓ Copied to Clipboard!' : '📋 Copy Summary'}
          </button>

          <button type="button" onClick={handlePrint} className="spf-btn-outline">
            🖨 Print / Save PDF
          </button>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <button
            type="button"
            onClick={() => setShowSummary(!showSummary)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-primary)',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            {showSummary ? '▲ Hide Full Application Summary' : '▼ View Full Application Summary'}
          </button>

          {showSummary && (
            <div className="spf-success-summary-preview">
              {formattedSummary}
            </div>
          )}
        </div>

        <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--color-border-light)', paddingTop: '1.5rem' }}>
          <button
            type="button"
            onClick={onReset}
            className="spf-btn-outline"
            style={{ fontSize: '0.9rem' }}
          >
            Submit Another Application
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormSubmissionSuccess;
