import { Link } from 'react-router-dom';
import { cn } from '../../utils';
import './Card.css';

/**
 * Generic card component for focus areas, programs, and content blocks.
 */
function Card({
  children,
  image,
  imageAlt = '',
  title,
  description,
  to,
  href,
  className,
  variant = 'default',
  overlay,
  footer,
  onClick,
}) {
  const Wrapper = to ? Link : href ? 'a' : 'div';
  const wrapperProps = to
    ? { to }
    : href
      ? { href, target: '_blank', rel: 'noopener noreferrer' }
      : onClick
        ? { onClick, role: 'button', tabIndex: 0 }
        : {};

  return (
    <Wrapper
      className={cn('card', `card--${variant}`, (to || href || onClick) && 'card--clickable', className)}
      {...wrapperProps}
    >
      {image && (
        <div className="card__image-wrapper">
          <img
            src={image}
            alt={imageAlt || title || ''}
            className="card__image"
            loading="lazy"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            onError={(e) => {
              if (e.currentTarget.parentElement) {
                e.currentTarget.parentElement.style.display = 'none';
              }
            }}
          />
          {overlay && <div className="card__overlay">{overlay}</div>}
        </div>
      )}
      <div className="card__body">
        {title && <h3 className="card__title">{title}</h3>}
        {description && <p className="card__description">{description}</p>}
        {children}
      </div>
      {footer && <div className="card__footer">{footer}</div>}
    </Wrapper>
  );
}

export default Card;
