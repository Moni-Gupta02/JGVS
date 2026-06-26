import { Link } from 'react-router-dom';
import { cn } from '../../utils';
import './Button.css';

/**
 * Reusable button component supporting multiple variants and sizes.
 * Renders as Link when `to` prop is provided.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) {
  const classes = cn(
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full',
    disabled && 'btn--disabled',
    className
  );

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="btn__icon">{icon}</span>}
      <span className="btn__text">{children}</span>
      {icon && iconPosition === 'right' && <span className="btn__icon">{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}

export default Button;
