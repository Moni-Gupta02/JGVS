import PageTemplate from './PageTemplate';
import './PageTemplate.css';
import { BANK_DETAILS } from '../constants';

export { default as DonatePage } from './DonatePage';
export { default as VolunteerRegisterPage } from './VolunteerRegisterPage';
export { default as InternshipPage } from './InternshipPage';

function createPortalPage(title, subtitle, features = []) {
  return function PortalPage() {
    return (
      <PageTemplate title={title} subtitle={subtitle}>
        {features.length > 0 ? (
          <div className="feature-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card">
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="placeholder-content">
            <p>This section is under development. Check back soon for updates.</p>
          </div>
        )}
      </PageTemplate>
    );
  };
}

/* Donor Portal */
export function TaxReceiptPage() {
  const whatsappUrl = `https://wa.me/918090517004?text=${encodeURIComponent(
    'Hello SAARK Philanthropy Foundation, I have made a donation and would like to request an 80G Tax Exemption Receipt. Please let me know the details required.'
  )}`;
  const mailtoUrl = `mailto:info@saarkfoundation.org?subject=${encodeURIComponent(
    '80G Tax Exemption Receipt Request'
  )}`;

  return (
    <PageTemplate
      title="80G Tax Exemption Receipt"
      subtitle="Claim your income tax deduction receipt for donations made to SAARK Philanthropy Foundation"
    >
      <div className="tax-receipt-portal-box">
        <div className="tax-info-callout">
          <h3>How to Receive Your 80G Certificate</h3>
          <p>
            Under Section 80G of the Income Tax Act, 1961, all eligible donations to SAARK Philanthropy
            Foundation qualify for 50% tax deductions.
          </p>
        </div>

        <div className="receipt-process-steps">
          <div className="receipt-step-card">
            <span className="step-badge">1</span>
            <h4>Make Transfer</h4>
            <p>
              Transfer via UPI (<strong>{BANK_DETAILS.upiId}</strong>) or NEFT/IMPS to Account No.{' '}
              <strong>{BANK_DETAILS.accountNumber}</strong> (IFSC: <strong>{BANK_DETAILS.ifscCode}</strong>).
            </p>
          </div>

          <div className="receipt-step-card">
            <span className="step-badge">2</span>
            <h4>Submit Details</h4>
            <p>
              Share your payment screenshot, UTR / transaction number, PAN number, donor name, and
              address.
            </p>
          </div>

          <div className="receipt-step-card">
            <span className="step-badge">3</span>
            <h4>Receive Receipt</h4>
            <p>
              Our finance team will verify the entry and issue your digitally signed Form 10BE / 80G tax
              receipt within 24–48 hours.
            </p>
          </div>
        </div>

        <div className="tax-receipt-contact-row">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="portal-receipt-btn portal-receipt-btn--wa"
          >
            Request Receipt on WhatsApp (+91 8090517004)
          </a>
          <a href={mailtoUrl} className="portal-receipt-btn portal-receipt-btn--mail">
            Email Receipt Request (info@saarkfoundation.org)
          </a>
        </div>
      </div>
    </PageTemplate>
  );
}

export const DonationHistoryPage = createPortalPage('Donation History', 'View your past contributions');
export const DonorImpactReportsPage = createPortalPage('Impact Reports', 'See how your donations are making a difference');

/* Volunteer Portal */
export const VolunteerTrainingPage = createPortalPage('Training', 'Access training modules and resources');
export const VolunteerAssignmentsPage = createPortalPage('Assignments', 'View and manage your volunteer assignments');
export const VolunteerCertificatesPage = createPortalPage('Certificates', 'Download your volunteer certificates');

/* Beneficiary Portal */
export const BeneficiaryProfilePage = createPortalPage('Family Profile', 'Manage your family information and enrollment');
export const BeneficiaryTrackingPage = createPortalPage('Program Tracking', 'Track your participation in SAARK programs');
export const BeneficiarySupportPage = createPortalPage('Support Requests', 'Submit and track support requests');
export const BeneficiaryCasesPage = createPortalPage('Case Management', 'View case status and updates');

/* Farmer Portal */
export const FarmerAdvisoryPage = createPortalPage('Crop Advisory', 'Get expert advice on crops and seasons', [
  { title: 'Seasonal Crops', description: 'Recommendations based on current season and region.' },
  { title: 'Pest Management', description: 'Natural and organic pest control solutions.' },
  { title: 'Soil Health', description: 'Soil testing results and improvement plans.' },
  { title: 'Weather Alerts', description: 'Timely weather updates for farming decisions.' },
]);

export const FarmerTrainingPage = createPortalPage('Training Videos', 'Watch farming tutorials and best practices');
export const FarmerMarketPage = createPortalPage('Market Linkages', 'Connect with buyers and markets');
export const FarmerSchemesPage = createPortalPage('Government Schemes', 'Explore eligible government programs');

/* Women SHG Portal */
export const SHGGroupsPage = createPortalPage('Group Management', 'Manage your self-help group');
export const SHGSavingsPage = createPortalPage('Savings Records', 'Track group savings and loans');
export const SHGEnterprisePage = createPortalPage('Enterprise Tracking', 'Monitor business ventures and income');
export const SHGCapacityPage = createPortalPage('Capacity Building', 'Access training and skill development');

/* Admin Dashboard */
export const AdminProjectsPage = createPortalPage('Project Monitoring', 'Track project progress and milestones', [
  { title: 'Active Projects', description: '24 projects currently running' },
  { title: 'Completed', description: '156 projects successfully completed' },
  { title: 'Pending Approval', description: '8 projects awaiting review' },
  { title: 'Budget Status', description: '92% of annual budget allocated' },
]);

export const AdminFinancePage = createPortalPage('Financial Management', 'Manage budgets, expenses, and audits');
export const AdminHRPage = createPortalPage('HR Management', 'Staff records, payroll, and performance');
export const AdminGISPage = createPortalPage('GIS Mapping', 'Geographic visualization of project locations');
export const AdminAnalyticsPage = createPortalPage('Impact Analytics', 'Data-driven insights on program outcomes');
export const AdminReportsPage = createPortalPage('Report Generation', 'Generate and export program reports');
