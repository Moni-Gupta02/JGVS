/**
 * Format a number with locale-specific thousand separators
 */
export function formatNumber(num) {
  return new Intl.NumberFormat('en-IN').format(num);
}

/**
 * Scroll to top of page smoothly
 */
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Debounce function for search/input handlers
 */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Class name utility for conditional classes
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Truncate text to a maximum length
 */
export function truncate(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate Indian phone number
 */
export function isValidPhone(phone) {
  return /^(\+91[\s-]?)?[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
}
