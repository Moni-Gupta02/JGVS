import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout, PortalLayout } from '../layouts';
import { LoadingSpinner } from '../components/ui';

import HomePage from '../pages/HomePage';
import GrantPage from '../pages/GrantPage';
import { AboutPage, ContactPage } from '../pages/ContentPages';
import { ProgramsPage, ImpactPage, NotFoundPage } from '../pages/MiscPages';
import {
  DonatePage,
  TaxReceiptPage,
  DonationHistoryPage,
  DonorImpactReportsPage,
  VolunteerRegisterPage,
  VolunteerTrainingPage,
  VolunteerAssignmentsPage,
  VolunteerCertificatesPage,
  BeneficiaryProfilePage,
  BeneficiaryTrackingPage,
  BeneficiarySupportPage,
  BeneficiaryCasesPage,
  FarmerAdvisoryPage,
  FarmerTrainingPage,
  FarmerMarketPage,
  FarmerSchemesPage,
  SHGGroupsPage,
  SHGSavingsPage,
  SHGEnterprisePage,
  SHGCapacityPage,
  AdminProjectsPage,
  AdminFinancePage,
  AdminHRPage,
  AdminGISPage,
  AdminAnalyticsPage,
  AdminReportsPage,
} from '../pages/PortalPages';

const GenericPage = lazy(() =>
  import('../pages/ContentPages').then((m) => ({
    default: () => (
      <m.GenericContentPage title="Coming Soon" subtitle="This page is under development" />
    ),
  }))
);

function withSuspense(Component) {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading..." />}>
      <Component />
    </Suspense>
  );
}

function portalLayout(key) {
  return <PortalLayout portalKey={key} />;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'grants', element: <GrantPage /> },
      { path: 'programs', element: <ProgramsPage /> },
      { path: 'programs/:slug', element: withSuspense(GenericPage) },
      { path: 'projects', element: withSuspense(GenericPage) },
      { path: 'impact', element: <ImpactPage /> },
      { path: 'partners', element: withSuspense(GenericPage) },
      { path: 'partners/join', element: withSuspense(GenericPage) },
      { path: 'media', element: withSuspense(GenericPage) },
      { path: 'media/news', element: withSuspense(GenericPage) },
      { path: 'media/news/:slug', element: withSuspense(GenericPage) },
      { path: 'careers', element: withSuspense(GenericPage) },
      { path: 'resources', element: withSuspense(GenericPage) },
      { path: 'get-involved', element: withSuspense(GenericPage) },
      { path: 'get-involved/:slug', element: withSuspense(GenericPage) },
      { path: 'stories/:slug', element: withSuspense(GenericPage) },
      { path: 'privacy', element: withSuspense(GenericPage) },
      { path: 'terms', element: withSuspense(GenericPage) },
      { path: 'refund', element: withSuspense(GenericPage) },
    ],
  },
  /* Donor Portal */
  {
    path: '/donor',
    element: portalLayout('donor'),
    children: [
      { index: true, element: <DonatePage /> },
      { path: 'donate', element: <DonatePage /> },
      { path: 'tax-receipt', element: <TaxReceiptPage /> },
      { path: 'history', element: <DonationHistoryPage /> },
      { path: 'impact-reports', element: <DonorImpactReportsPage /> },
    ],
  },
  /* Volunteer Portal */
  {
    path: '/volunteer',
    element: portalLayout('volunteer'),
    children: [
      { index: true, element: <VolunteerRegisterPage /> },
      { path: 'register', element: <VolunteerRegisterPage /> },
      { path: 'training', element: <VolunteerTrainingPage /> },
      { path: 'assignments', element: <VolunteerAssignmentsPage /> },
      { path: 'certificates', element: <VolunteerCertificatesPage /> },
    ],
  },
  /* Beneficiary Portal */
  {
    path: '/beneficiary',
    element: portalLayout('beneficiary'),
    children: [
      { index: true, element: <BeneficiaryProfilePage /> },
      { path: 'profile', element: <BeneficiaryProfilePage /> },
      { path: 'tracking', element: <BeneficiaryTrackingPage /> },
      { path: 'support', element: <BeneficiarySupportPage /> },
      { path: 'cases', element: <BeneficiaryCasesPage /> },
    ],
  },
  /* Farmer Portal */
  {
    path: '/farmer',
    element: portalLayout('farmer'),
    children: [
      { index: true, element: <FarmerAdvisoryPage /> },
      { path: 'advisory', element: <FarmerAdvisoryPage /> },
      { path: 'training', element: <FarmerTrainingPage /> },
      { path: 'market', element: <FarmerMarketPage /> },
      { path: 'schemes', element: <FarmerSchemesPage /> },
    ],
  },
  /* Women SHG Portal */
  {
    path: '/shg',
    element: portalLayout('shg'),
    children: [
      { index: true, element: <SHGGroupsPage /> },
      { path: 'groups', element: <SHGGroupsPage /> },
      { path: 'savings', element: <SHGSavingsPage /> },
      { path: 'enterprise', element: <SHGEnterprisePage /> },
      { path: 'capacity', element: <SHGCapacityPage /> },
    ],
  },
  /* Admin Dashboard */
  {
    path: '/admin',
    element: portalLayout('admin'),
    children: [
      { index: true, element: <AdminProjectsPage /> },
      { path: 'projects', element: <AdminProjectsPage /> },
      { path: 'finance', element: <AdminFinancePage /> },
      { path: 'hr', element: <AdminHRPage /> },
      { path: 'gis', element: <AdminGISPage /> },
      { path: 'analytics', element: <AdminAnalyticsPage /> },
      { path: 'reports', element: <AdminReportsPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);

export default router;
