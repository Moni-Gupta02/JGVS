import { DonationSection } from '../components/donation';
import './DonatePage.css';

/**
 * Dedicated Donation Page for SAARK Philanthropy Foundation.
 * Used for /donate and /donor/donate routes.
 */
function DonatePage() {
  return (
    <div className="donate-page-container">
      <DonationSection showHero={true} />
    </div>
  );
}

export default DonatePage;
