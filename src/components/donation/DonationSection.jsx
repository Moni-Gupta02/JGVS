import { useState } from 'react';
import { BANK_DETAILS, UPI_APPS } from '../../constants';
import './DonationSection.css';

export function DonationSection({ showHero = false, compact = false }) {
  const [copiedField, setCopiedField] = useState(null);
  const [showProofModal, setShowProofModal] = useState(false);
  const [activeTab, setActiveTab] = useState('both'); // 'both', 'upi', 'bank'

  // Standard UPI intent URI without pre-set amount (donor enters amount in their UPI app)
  const upiPayUri = `upi://pay?ver=01&mode=01&purpose=00&mc=0000&qrMedium=02&pa=${BANK_DETAILS.upiId}&pn=${encodeURIComponent(
    BANK_DETAILS.upiPayeeName
  )}`;

  const handleCopy = (text, fieldName) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField((prev) => (prev === fieldName ? null : prev));
    }, 2200);
  };

  const copyAllDetails = () => {
    const text = `SAARK PHILANTHROPY FOUNDATION
Bank: ${BANK_DETAILS.bankName}
Account Number: ${BANK_DETAILS.accountNumber}
Account Type: ${BANK_DETAILS.accountType}
IFSC Code: ${BANK_DETAILS.ifscCode}
Branch: ${BANK_DETAILS.branchName} (Code: ${BANK_DETAILS.branchCode})
MICR Code: ${BANK_DETAILS.micrCode}
UPI ID: ${BANK_DETAILS.upiId}
Branch Address: ${BANK_DETAILS.branchAddress}`;
    handleCopy(text, 'all');
  };

  const whatsappUrl = `https://wa.me/918090517004?text=${encodeURIComponent(
    'Hello SAARK Philanthropy Foundation, I have made a donation towards your programs. Please find attached the payment screenshot. Kindly provide my 80G tax receipt.'
  )}`;

  const emailSubject = encodeURIComponent('Donation Confirmation & 80G Receipt Request');
  const emailBody = encodeURIComponent(
    `Dear SAARK Philanthropy Foundation Team,\n\nI have contributed a donation towards your community programs.\n\nTransaction / UTR Reference:\nDate of Transfer:\nDonor Full Name:\nPAN Number (for 80G):\nMobile Number:\n\nPlease find attached the transfer receipt screenshot.\n\nThank you!`
  );
  const mailtoUrl = `mailto:info@saarkfoundation.org?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div className={`donation-section ${compact ? 'donation-section--compact' : ''}`}>
      {showHero && (
        <div className="donation-hero">
          <span className="donation-badge">
            <ShieldCheckIcon /> Verified Section 8 Non-Profit
          </span>
          <h1 className="donation-hero__title">Support Our Grassroots Mission</h1>
          <p className="donation-hero__subtitle">
            Every rupee you contribute directly fuels child education, women self-help empowerment,
            and sustainable rural farming initiatives across India.
          </p>
          <div className="donation-hero__trust">
            <span className="trust-pill">
              <CheckCircleIcon /> 100% Direct Transfer
            </span>
            <span className="trust-pill">
              <CheckCircleIcon /> 0% Platform Commission
            </span>
            <span className="trust-pill">
              <CheckCircleIcon /> 80G Tax Exemption Eligible
            </span>
            <span className="trust-pill">
              <CheckCircleIcon /> HDFC Institutional Account
            </span>
          </div>
        </div>
      )}

      {/* Tabs Switcher for Mobile / Desktop */}
      <div className="donation-method-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'both'}
          className={`method-tab ${activeTab === 'both' ? 'method-tab--active' : ''}`}
          onClick={() => setActiveTab('both')}
        >
          All Methods (QR & Bank)
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'upi'}
          className={`method-tab ${activeTab === 'upi' ? 'method-tab--active' : ''}`}
          onClick={() => setActiveTab('upi')}
        >
          <QRIcon /> UPI QR Scanner
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'bank'}
          className={`method-tab ${activeTab === 'bank' ? 'method-tab--active' : ''}`}
          onClick={() => setActiveTab('bank')}
        >
          <BankIcon /> Bank Account Details
        </button>
      </div>

      {/* Main Payment Details Grid */}
      <div className={`donation-methods-grid active-${activeTab}`}>
        {/* Card 1: UPI Scanner */}
        {(activeTab === 'both' || activeTab === 'upi') && (
          <div className="payment-card upi-scanner-card">
            <div className="payment-card__header">
              <div className="payment-card__icon-wrap">
                <QRIcon />
              </div>
              <div>
                <span className="payment-card__badge">Instant & Zero Fee</span>
                <h3 className="payment-card__title">Scan & Pay via UPI</h3>
              </div>
            </div>

            <div className="scanner-frame-wrapper">
              <div className="scanner-frame">
                <div className="scanner-corner corner-tl" />
                <div className="scanner-corner corner-tr" />
                <div className="scanner-corner corner-bl" />
                <div className="scanner-corner corner-br" />

                <div className="scanner-header-tag">
                  <span>SAARK PHILANTHROPY FOUNDATION</span>
                </div>

                <div className="scanner-img-container">
                  <img
                    src={BANK_DETAILS.qrImage}
                    alt="SAARK Philanthropy Foundation Official UPI QR Code"
                    className="scanner-img"
                    loading="eager"
                  />
                </div>

                <div className="scanner-footer-tag">
                  <span className="hdfc-tag">
                    <span className="hdfc-logo-box" /> HDFC Bank UPI
                  </span>
                </div>
              </div>
            </div>

            {/* UPI ID Pill with Copy */}
            <div className="upi-id-box">
              <span className="upi-id-label">Official UPI ID (VPA):</span>
              <div className="upi-id-value-row">
                <code className="upi-id-code">{BANK_DETAILS.upiId}</code>
                <button
                  type="button"
                  className={`copy-btn ${copiedField === 'upi' ? 'copy-btn--copied' : ''}`}
                  onClick={() => handleCopy(BANK_DETAILS.upiId, 'upi')}
                  title="Copy UPI ID"
                >
                  {copiedField === 'upi' ? (
                    <>
                      <CheckIcon /> Copied!
                    </>
                  ) : (
                    <>
                      <CopyIcon /> Copy UPI ID
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Pay Directly Button for Mobile */}
            <div className="upi-direct-action">
              <a href={upiPayUri} className="btn-upi-pay">
                <span>📱 Pay via UPI App</span>
              </a>
              <small className="upi-direct-note">
                (Tap to automatically open Google Pay, PhonePe, Paytm, or BHIM on your phone)
              </small>
            </div>

            {/* Supported UPI Apps */}
            <div className="supported-apps">
              <span className="supported-apps__title">Accepted on all UPI Apps:</span>
              <div className="supported-apps__chips">
                {UPI_APPS.map((app) => (
                  <span key={app.name} className="app-chip">
                    {app.name}
                  </span>
                ))}
              </div>
            </div>

            {/* 3 Steps Guide */}
            <div className="how-to-scan">
              <div className="scan-step">
                <span className="scan-step__num">1</span>
                <span>Open any UPI app (GPay, PhonePe, Paytm, BHIM)</span>
              </div>
              <div className="scan-step">
                <span className="scan-step__num">2</span>
                <span>Scan the QR code or paste <strong>{BANK_DETAILS.upiId}</strong></span>
              </div>
              <div className="scan-step">
                <span className="scan-step__num">3</span>
                <span>Verify payee: <strong>SAARK PHILANTHROPY FOUNDATION</strong> & complete payment</span>
              </div>
            </div>
          </div>
        )}

        {/* Card 2: Bank Account Details */}
        {(activeTab === 'both' || activeTab === 'bank') && (
          <div className="payment-card bank-details-card">
            <div className="payment-card__header">
              <div className="payment-card__icon-wrap bank-icon-wrap">
                <BankIcon />
              </div>
              <div>
                <span className="payment-card__badge bank-badge">Direct Bank Transfer</span>
                <h3 className="payment-card__title">Bank Account Details</h3>
              </div>
            </div>

            <div className="bank-institution-header">
              <div className="bank-logo-badge">
                <div className="hdfc-logo-square">
                  <span className="inner-blue" />
                </div>
                <div>
                  <strong>{BANK_DETAILS.bankName}</strong>
                  <span className="branch-meta">
                    {BANK_DETAILS.branchName} • Branch Code: {BANK_DETAILS.branchCode}
                  </span>
                </div>
              </div>
              <span className="account-nature-pill">{BANK_DETAILS.accountType}</span>
            </div>

            <div className="account-details-list">
              {/* Account Name */}
              <div className="account-detail-item">
                <div className="account-detail-item__meta">
                  <span className="detail-label">Beneficiary / Account Name</span>
                  <strong className="detail-value">{BANK_DETAILS.accountName}</strong>
                </div>
                <button
                  type="button"
                  className={`copy-icon-btn ${copiedField === 'name' ? 'copy-icon-btn--copied' : ''}`}
                  onClick={() => handleCopy(BANK_DETAILS.accountName, 'name')}
                  title="Copy Account Name"
                >
                  {copiedField === 'name' ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>

              {/* Account Number */}
              <div className="account-detail-item highlight-item">
                <div className="account-detail-item__meta">
                  <span className="detail-label">Account Number</span>
                  <strong className="detail-value monospace large-text">
                    {BANK_DETAILS.accountNumber}
                  </strong>
                </div>
                <button
                  type="button"
                  className={`copy-btn copy-btn--primary ${copiedField === 'acc' ? 'copy-btn--copied' : ''}`}
                  onClick={() => handleCopy(BANK_DETAILS.accountNumber, 'acc')}
                >
                  {copiedField === 'acc' ? (
                    <>
                      <CheckIcon /> Copied
                    </>
                  ) : (
                    <>
                      <CopyIcon /> Copy A/C
                    </>
                  )}
                </button>
              </div>

              {/* IFSC Code */}
              <div className="account-detail-item highlight-item">
                <div className="account-detail-item__meta">
                  <span className="detail-label">IFSC Code (RTGS / NEFT / IMPS)</span>
                  <strong className="detail-value monospace large-text">
                    {BANK_DETAILS.ifscCode}
                  </strong>
                </div>
                <button
                  type="button"
                  className={`copy-btn copy-btn--primary ${copiedField === 'ifsc' ? 'copy-btn--copied' : ''}`}
                  onClick={() => handleCopy(BANK_DETAILS.ifscCode, 'ifsc')}
                >
                  {copiedField === 'ifsc' ? (
                    <>
                      <CheckIcon /> Copied
                    </>
                  ) : (
                    <>
                      <CopyIcon /> Copy IFSC
                    </>
                  )}
                </button>
              </div>

              {/* Account Type & Product Code */}
              {/* <div className="account-detail-grid-row">
                <div className="sub-detail-col">
                  <span className="detail-label">Account Type</span>
                  <span className="sub-detail-value">{BANK_DETAILS.accountType}</span>
                </div>
                <div className="sub-detail-col">
                  <span className="detail-label">Product Code</span>
                  <span className="sub-detail-value">{BANK_DETAILS.productCode}</span>
                </div>
                <div className="sub-detail-col">
                  <span className="detail-label">MICR Code</span>
                  <span className="sub-detail-value monospace">{BANK_DETAILS.micrCode}</span>
                </div>
              </div> */}

              {/* Branch Address */}
              {/* <div className="account-detail-item address-item">
                <div className="account-detail-item__meta">
                  <span className="detail-label">Branch Address</span>
                  <span className="detail-address-text">{BANK_DETAILS.branchAddress}</span>
                </div>
              </div> */}

              {/* Registered Foundation Address */}
              {/* <div className="account-detail-item address-item">
                <div className="account-detail-item__meta">
                  <span className="detail-label">Registered Office Address</span>
                  <span className="detail-address-text">{BANK_DETAILS.registeredAddress}</span>
                </div>
              </div> */}
            </div>

            {/* Actions: Copy All Details & View Passbook */}
            <div className="bank-actions-row">
              <button
                type="button"
                className={`btn-copy-all ${copiedField === 'all' ? 'btn-copy-all--copied' : ''}`}
                onClick={copyAllDetails}
              >
                {copiedField === 'all' ? (
                  <>
                    <CheckIcon /> Full Details Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <CopyIcon /> Copy All Bank Details
                  </>
                )}
              </button>

              {/* <button
                type="button"
                className="btn-view-passbook"
                onClick={() => setShowProofModal(true)}
              >
                <EyeIcon /> View Bank Passbook Proof
              </button> */}
            </div>
          </div>
        )}
      </div>

      {/* Tax Exemption & Receipt Confirmation Card */}
      <div className="tax-receipt-card card">
        <div className="tax-receipt-grid">
          <div className="tax-receipt-info">
            <div className="tax-receipt-header">
              <ReceiptIcon />
              <div>
                <h3>Need an 80G Tax Exemption Receipt?</h3>
                <p>
                  As a registered non-profit organization, contributions to SAARK Philanthropy
                  Foundation qualify for tax benefits under Section 80G of the Indian Income Tax Act.
                </p>
              </div>
            </div>
            <div className="receipt-steps">
              <div className="receipt-step">
                <strong>Step 1:</strong> Complete your payment via UPI QR scanner or Bank transfer.
              </div>
              <div className="receipt-step">
                <strong>Step 2:</strong> Note your Transaction Reference Number / UTR or take a screenshot.
              </div>
              <div className="receipt-step">
                <strong>Step 3:</strong> Share the screenshot along with your PAN card & contact details via WhatsApp or Email. We will issue your official 80G receipt within 24–48 hours.
              </div>
            </div>
          </div>

          <div className="tax-receipt-actions">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn action-btn--whatsapp"
            >
              <WhatsAppIcon /> Share via WhatsApp (+91 8090517004)
            </a>
            <a href={mailtoUrl} className="action-btn action-btn--email">
              <EmailIcon /> Email Donation Confirmation
            </a>
            <div className="receipt-direct-contact">
              <span>Helpline: +91 8090517004 • info@saarkfoundation.org</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Transparency Section */}
      <div className="trust-features-row">
        <div className="trust-feature">
          <div className="trust-feature__icon">
            <LockIcon />
          </div>
          <h4>100% Direct & Secure</h4>
          <p>Your contribution goes straight to our official HDFC institutional foundation bank account.</p>
        </div>
        <div className="trust-feature">
          <div className="trust-feature__icon">
            <PercentIcon />
          </div>
          <h4>Zero Deductions</h4>
          <p>Direct UPI and NEFT transfers have no intermediary aggregator cuts, maximizing your impact.</p>
        </div>
        <div className="trust-feature">
          <div className="trust-feature__icon">
            <DocumentIcon />
          </div>
          <h4>Audited & Compliant</h4>
          <p>Registered under Section 8 of the Companies Act with audited reports & open accountability.</p>
        </div>
      </div>

      {/* Modal Lightbox for Bank Passbook Verification */}
      {showProofModal && (
        <div className="proof-modal-backdrop" onClick={() => setShowProofModal(false)}>
          <div className="proof-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="proof-modal-header">
              <div className="proof-modal-title">
                <BankIcon />
                <div>
                  <h4>Verified Bank Account Passbook</h4>
                  <span>HDFC Bank Ltd • Jakhania Gobind Branch</span>
                </div>
              </div>
              <button
                type="button"
                className="proof-modal-close"
                onClick={() => setShowProofModal(false)}
                aria-label="Close modal"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="proof-modal-body">
              <img
                src={BANK_DETAILS.passbookImage}
                alt="Official HDFC Bank Passbook Proof for SAARK Philanthropy Foundation"
                className="proof-modal-img"
              />
            </div>
            <div className="proof-modal-footer">
              <span>Verified Account No: <strong>{BANK_DETAILS.accountNumber}</strong> | IFSC: <strong>{BANK_DETAILS.ifscCode}</strong></span>
              <button
                type="button"
                className="btn-modal-done"
                onClick={() => setShowProofModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Lightweight Inline Icons for high performance & standalone reliability
function QRIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
      <rect x="7" y="7" width="1" height="1"></rect>
      <rect x="18" y="7" width="1" height="1"></rect>
      <rect x="7" y="18" width="1" height="1"></rect>
    </svg>
  );
}

function BankIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="21" x2="21" y2="21"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
      <polyline points="5 10 12 3 19 10"></polyline>
      <line x1="4" y1="10" x2="4" y2="21"></line>
      <line x1="9" y1="10" x2="9" y2="21"></line>
      <line x1="15" y1="10" x2="15" y2="21"></line>
      <line x1="20" y1="10" x2="20" y2="21"></line>
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <polyline points="9 12 11 14 15 10"></polyline>
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

function ReceiptIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16l3-1.5 3 1.5 3-1.5 3 1.5 3-1.5 3 1.5V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );
}

function PercentIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="5" x2="5" y2="19"></line>
      <circle cx="6.5" cy="6.5" r="2.5"></circle>
      <circle cx="17.5" cy="17.5" r="2.5"></circle>
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );
}

export default DonationSection;
