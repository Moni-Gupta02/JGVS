import './SectionHeader.css';

/**
 * Reusable section header with optional icon and subtitle.
 */
function SectionHeader({ title, subtitle, icon = '🌿', align = 'center', className = '' }) {
  return (
    <div className={`section-header section-header--${align} ${className}`}>
      {icon && <span className="section-header__icon" aria-hidden="true">{icon}</span>}
      <h2 className="section-header__title">{title}</h2>
      {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
    </div>
  );
}

export default SectionHeader;
