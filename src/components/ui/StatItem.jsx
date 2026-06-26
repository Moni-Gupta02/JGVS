import './StatItem.css';

const ICONS = {
  users: '👥',
  village: '🏘️',
  women: '👩',
  farmer: '👨‍🌾',
  herb: '🌿',
  water: '💧',
  fish: '🐟',
  sector: '📊',
};

/**
 * Impact statistic display item with icon, value, and label.
 */
function StatItem({ icon, value, label, className = '' }) {
  const displayIcon = ICONS[icon] || icon;

  return (
    <div className={`stat-item ${className}`}>
      <span className="stat-item__icon" aria-hidden="true">{displayIcon}</span>
      <span className="stat-item__value">{value}</span>
      <span className="stat-item__label">{label}</span>
    </div>
  );
}

export default StatItem;
