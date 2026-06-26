import { useScrollPosition } from '../../hooks';
import { scrollToTop } from '../../utils';
import './BackToTop.css';

function BackToTop() {
  const visible = useScrollPosition(400);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="back-to-top"
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

export default BackToTop;
