import PageTemplate from './PageTemplate';
import './PageTemplate.css';

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
export const DonatePage = createPortalPage('Online Donation', 'Support our mission with a secure donation', [
  { title: 'One-Time Donation', description: 'Make a single contribution to support our programs.' },
  { title: 'Monthly Giving', description: 'Become a sustaining donor with recurring monthly gifts.' },
  { title: 'Corporate Giving', description: 'Partner with us through CSR initiatives and corporate donations.' },
  { title: 'In-Kind Donations', description: 'Contribute materials, equipment, or services.' },
]);

export const TaxReceiptPage = createPortalPage('Tax Receipt', 'Download your 80G tax exemption receipts');
export const DonationHistoryPage = createPortalPage('Donation History', 'View your past contributions');
export const DonorImpactReportsPage = createPortalPage('Impact Reports', 'See how your donations are making a difference');

/* Volunteer Portal */
export const VolunteerRegisterPage = createPortalPage('Volunteer Registration', 'Join our team of changemakers', [
  { title: 'Field Volunteer', description: 'Work directly with communities in rural areas.' },
  { title: 'Skills-Based', description: 'Contribute your professional expertise remotely or on-site.' },
  { title: 'Event Volunteer', description: 'Help organize and run foundation events and camps.' },
  { title: 'Virtual Volunteer', description: 'Support our mission from anywhere in the world.' },
]);

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
