/**
 * Official Donation & Bank Account Configuration for SAARK Philanthropy Foundation
 * Extracted from official HDFC Bank Institutional Account documentation and UPI QR.
 */

export const BANK_DETAILS = {
  accountName: 'SAARK PHILANTHROPY FOUNDATION',
  bankName: 'HDFC Bank Ltd',
  accountNumber: '50100742096529',
  accountType: 'Institutional Savings Account',
  productCode: '145',
  ifscCode: 'HDFC0008334',
  micrCode: '275240202',
  branchCode: '8334',
  branchName: 'Jakhania Gobind',
  branchAddress:
    'Upper Grd Floor, Village and Post Jakhania Gobind, Tehsil Jakhania, Dist. Ghazipur, Uttar Pradesh - 275203',
  registeredAddress:
    'H No 127, Vill Chakfari, Post Bahariyabad, Gadaipur, Saidpur, Ghazipur, Uttar Pradesh - 275204',
  customerId: '292319993',
  acOpenDate: '01/07/2024',
  currency: 'INR',
  mobileNumber: '8090517004',
  formattedPhone: '+91 80905 17004',
  upiId: '8090517004@hdfc',
  upiPayeeName: 'SAARK PHILANTHROPY FOUNDATION',
  qrImage: '/donation-qr.jpg',
  passbookImage: '/bank-passbook.jpg',
};

export const DONATION_TIERS = [
  {
    amount: 500,
    label: '₹500',
    title: 'Child Nutrition & Education',
    description: 'Provides nutrition kits and essential stationery supplies for one child.',
  },
  {
    amount: 1000,
    label: '₹1,000',
    title: 'Rural Healthcare & Medicine',
    description: 'Supports primary medical checkups, essential medicines, and diagnostic tests in rural health camps.',
  },
  {
    amount: 2500,
    label: '₹2,500',
    title: 'Women SHG Empowerment',
    description: 'Equips a rural woman artisan with tools and micro-enterprise vocational skills training.',
  },
  {
    amount: 5000,
    label: '₹5,000',
    title: 'Sustainable Farming Support',
    description: 'Provides indigenous heirloom seeds, bio-fertilizers, and guidance to a smallholder farmer family.',
  },
  {
    amount: 10000,
    label: '₹10,000',
    title: 'Community Development',
    description: 'Powers community water-harvesting or smart learning center infrastructure in an underserved village.',
  },
];

export const UPI_APPS = [
  { name: 'Google Pay', short: 'GPay', color: '#4285F4' },
  { name: 'PhonePe', short: 'PhonePe', color: '#5f259f' },
  { name: 'Paytm', short: 'Paytm', color: '#00b9f5' },
  { name: 'BHIM UPI', short: 'BHIM', color: '#00796B' },
  { name: 'PayZapp / HDFC', short: 'HDFC', color: '#004c8f' },
  { name: 'Amazon Pay', short: 'Amazon', color: '#ff9900' },
  { name: 'Any UPI App', short: 'Any UPI', color: '#1b5e3b' },
];
