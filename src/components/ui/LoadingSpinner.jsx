import './LoadingSpinner.css';

function LoadingSpinner({ size = 'md', message }) {
  return (
    <div className={`loading-container loading-container--${size}`} role="status">
      <div className="loading-spinner" aria-label="Loading" />
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
}

export default LoadingSpinner;
