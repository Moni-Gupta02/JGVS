import { APP_CONFIG } from '../constants';
import { apiFetch } from './api';

const STORAGE_KEY = 'spf_form_submissions';

/**
 * Generate unique application ID like SPF-INT-2026-4892
 */
export function generateApplicationId(prefix = 'APP') {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `SPF-${prefix}-${year}-${randomNum}`;
}

/**
 * Format form data into clean text for Email / WhatsApp / Clipboard
 */
export function formatFormSummary(formTitle, applicationId, data) {
  const lines = [
    `==================================================`,
    `SAARK PHILANTHROPY FOUNDATION (SPF)`,
    `${formTitle.toUpperCase()}`,
    `==================================================`,
    `Application / Registration No: ${applicationId}`,
    `Submission Date & Time: ${new Date().toLocaleString('en-IN')}`,
    `Official Email: ${APP_CONFIG.contact.email}`,
    `Helpline / WhatsApp: +91 8090517004`,
    `Website: www.saarkfoundation.org`,
    `--------------------------------------------------\n`,
  ];

  Object.entries(data).forEach(([sectionTitle, fields]) => {
    if (typeof fields === 'object' && fields !== null && !Array.isArray(fields)) {
      lines.push(`[ ${sectionTitle} ]`);
      Object.entries(fields).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          const displayVal = Array.isArray(val) ? val.join(', ') : val.toString();
          lines.push(`  • ${key}: ${displayVal}`);
        }
      });
      lines.push('');
    } else if (fields !== undefined && fields !== null && fields !== '') {
      const displayVal = Array.isArray(fields) ? fields.join(', ') : fields.toString();
      lines.push(`• ${sectionTitle}: ${displayVal}`);
    }
  });

  lines.push('--------------------------------------------------');
  lines.push('Applicant Declaration & Consent: Agreed and confirmed.');
  lines.push('Submitted via SAARK Philanthropy Foundation Digital Platform.');
  lines.push('==================================================');

  return lines.join('\n');
}

/**
 * Save submission to localStorage
 */
export function saveSubmissionLocally(submission) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.unshift(submission);
    // keep last 50 submissions
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    console.warn('Could not save form submission to localStorage:', err);
  }
}

/**
 * Retrieve submissions from localStorage
 */
export function getSavedSubmissions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

/**
 * Process form submission:
 * 1. Generate Application ID
 * 2. Format email body & URLs (mailto & WhatsApp)
 * 3. Store in localStorage
 * 4. Attempt API call
 */
export async function submitApplicationForm({
  formCode,
  formTitle,
  structuredData,
  apiEndpoint = null,
}) {
  const applicationId = generateApplicationId(formCode);
  const formattedSummary = formatFormSummary(formTitle, applicationId, structuredData);

  const emailSubject = encodeURIComponent(
    `[${formTitle}] ${applicationId} - ${structuredData['01. Personal Details']?.['Full Name'] || 'Applicant Submission'}`
  );
  const emailBody = encodeURIComponent(formattedSummary);
  const mailtoUrl = `mailto:${APP_CONFIG.contact.email}?subject=${emailSubject}&body=${emailBody}`;

  const whatsappMessage = encodeURIComponent(
    `Hello SAARK Philanthropy Foundation,\n\nI have submitted my *${formTitle}*.\n*Application No:* ${applicationId}\n*Name:* ${
      structuredData['01. Personal Details']?.['Full Name'] || ''
    }\n*Phone:* ${structuredData['01. Personal Details']?.['Mobile Number'] || ''}\n\nPlease find my details registered. Kindly confirm receipt.`
  );
  const whatsappUrl = `https://wa.me/918090517004?text=${whatsappMessage}`;

  const submissionRecord = {
    id: applicationId,
    formCode,
    formTitle,
    submittedAt: new Date().toISOString(),
    data: structuredData,
    mailtoUrl,
    whatsappUrl,
    summary: formattedSummary,
  };

  // 1. Save locally
  saveSubmissionLocally(submissionRecord);

  // 2. Attempt API call if endpoint provided
  let apiSuccess = false;
  if (apiEndpoint) {
    try {
      await apiFetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(submissionRecord),
      });
      apiSuccess = true;
    } catch (err) {
      console.info('Backend API unavailable, form saved locally & prepared for email dispatch:', err.message);
    }
  }

  return {
    success: true,
    applicationId,
    mailtoUrl,
    whatsappUrl,
    formattedSummary,
    apiSuccess,
  };
}
