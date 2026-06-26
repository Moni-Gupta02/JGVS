import { SectionHeader } from '../components/ui';
import './PageTemplate.css';

/**
 * Generic page template for portal and content pages.
 */
function PageTemplate({ title, subtitle, children, actions }) {
  return (
    <div className="page-template">
      <div className="page-template__header">
        <SectionHeader title={title} subtitle={subtitle} align="left" icon="" />
        {actions && <div className="page-template__actions">{actions}</div>}
      </div>
      <div className="page-template__body">{children}</div>
    </div>
  );
}

export default PageTemplate;
