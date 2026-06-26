import { APP_CONFIG } from '../constants';

const BASE_URL = APP_CONFIG.apiBaseUrl;

/**
 * Generic API fetch wrapper with error handling and loading support
 */
export async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your connection.');
    }
    throw error;
  }
}

export const contactService = {
  submitForm: (data) =>
    apiFetch('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const donationService = {
  createDonation: (data) =>
    apiFetch('/donations', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getHistory: () => apiFetch('/donations/history'),
  getTaxReceipt: (id) => apiFetch(`/donations/${id}/receipt`),
};

export const volunteerService = {
  register: (data) =>
    apiFetch('/volunteers/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getAssignments: () => apiFetch('/volunteers/assignments'),
  getCertificates: () => apiFetch('/volunteers/certificates'),
};

export const impactService = {
  getStats: () => apiFetch('/impact/stats'),
  getReports: () => apiFetch('/impact/reports'),
};

export const grantService = {
  submitApplication: (data) =>
    apiFetch('/grants/apply', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
