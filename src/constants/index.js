/** Application-wide configuration from environment variables */
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'SAARK Philanthropy Foundation',
  tagline:
    import.meta.env.VITE_APP_TAGLINE ||
    'Empowering Communities, Protecting Nature, Transforming Lives',
  contact: {
    email: import.meta.env.VITE_CONTACT_EMAIL || 'info@saarkfoundation.org',
    phone: import.meta.env.VITE_CONTACT_PHONE || '+91-9876543210',
    address:
      import.meta.env.VITE_CONTACT_ADDRESS ||
      'SAARK Foundation, New Delhi, India',
  },
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
};

export const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { name: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
  { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { name: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
];

export const TOP_BAR_LINKS = [
  { label: 'News & Events', path: '/media/news' },
  { label: 'Media', path: '/media' },
  { label: 'Careers', path: '/careers' },
  { label: 'Resources', path: '/resources' },
];

export const NAV_LINKS = [
  { label: 'HOME', path: '/' },
  { label: 'ABOUT US', path: '/about' },
  {
    label: 'OUR PROGRAMS',
    path: '/programs',
    children: [
      { label: 'Education & Skill Development', path: '/programs/education' },
      { label: 'Child Care & Protection', path: '/programs/child-care' },
      { label: 'Women Empowerment', path: '/programs/women-empowerment' },
      { label: 'Healthcare & Nutrition', path: '/programs/healthcare' },
      { label: 'Sustainable Agriculture', path: '/programs/agriculture' },
      { label: 'Herbs & Spices Mission', path: '/programs/herbs' },
      { label: 'Livestock Development', path: '/programs/livestock' },
      { label: 'Fisheries Development', path: '/programs/fisheries' },
      { label: 'Aquatic Biodiversity', path: '/programs/aquatic' },
      { label: 'Environment & Climate', path: '/programs/environment' },
    ],
  },
  { label: 'PROJECTS', path: '/projects' },
  { label: 'IMPACT', path: '/impact' },
  {
    label: 'GET INVOLVED',
    path: '/get-involved',
    children: [
      { label: 'Donate', path: '/donor/donate' },
      { label: 'Apply for Grant', path: '/grants' },
      { label: 'Volunteer', path: '/volunteer/register' },
      { label: 'Partner With Us', path: '/partners/join' },
      { label: 'Fundraise', path: '/get-involved/fundraise' },
      { label: 'Internship', path: '/get-involved/internship' },
    ],
  },
  { label: 'PARTNERS', path: '/partners' },
  { label: 'MEDIA', path: '/media' },
  { label: 'CONTACT US', path: '/contact' },
];

export const PORTAL_LINKS = [
  {
    title: 'Donor Portal',
    path: '/donor',
    items: [
      { label: 'Online Donation', path: '/donor/donate' },
      { label: 'Tax Receipt', path: '/donor/tax-receipt' },
      { label: 'Donation History', path: '/donor/history' },
      { label: 'Impact Reports', path: '/donor/impact-reports' },
    ],
  },
  {
    title: 'Volunteer Portal',
    path: '/volunteer',
    items: [
      { label: 'Registration', path: '/volunteer/register' },
      { label: 'Training', path: '/volunteer/training' },
      { label: 'Assignments', path: '/volunteer/assignments' },
      { label: 'Certificates', path: '/volunteer/certificates' },
    ],
  },
  {
    title: 'Beneficiary Portal',
    path: '/beneficiary',
    items: [
      { label: 'Family Profile', path: '/beneficiary/profile' },
      { label: 'Program Tracking', path: '/beneficiary/tracking' },
      { label: 'Support Requests', path: '/beneficiary/support' },
      { label: 'Case Management', path: '/beneficiary/cases' },
    ],
  },
  {
    title: 'Farmer Portal',
    path: '/farmer',
    items: [
      { label: 'Crop Advisory', path: '/farmer/advisory' },
      { label: 'Training Videos', path: '/farmer/training' },
      { label: 'Market Linkages', path: '/farmer/market' },
      { label: 'Government Schemes', path: '/farmer/schemes' },
    ],
  },
  {
    title: 'Women SHG Portal',
    path: '/shg',
    items: [
      { label: 'Group Management', path: '/shg/groups' },
      { label: 'Savings Records', path: '/shg/savings' },
      { label: 'Enterprise Tracking', path: '/shg/enterprise' },
      { label: 'Capacity Building', path: '/shg/capacity' },
    ],
  },
  {
    title: 'Admin Dashboard',
    path: '/admin',
    items: [
      { label: 'Project Monitoring', path: '/admin/projects' },
      { label: 'Financial Management', path: '/admin/finance' },
      { label: 'HR Management', path: '/admin/hr' },
      { label: 'GIS Mapping', path: '/admin/gis' },
      { label: 'Impact Analytics', path: '/admin/analytics' },
      { label: 'Report Generation', path: '/admin/reports' },
    ],
  },
];

export const IMPACT_STATS = [
  { icon: 'users', value: '50,000+', label: 'Lives Impacted' },
  { icon: 'village', value: '500+', label: 'Villages Covered' },
  { icon: 'women', value: '5,000+', label: 'Women Empowered' },
  { icon: 'farmer', value: '1,000+', label: 'Farmers Trained' },
  { icon: 'herb', value: '100+', label: 'Herbal Gardens' },
  { icon: 'water', value: '50+', label: 'Water Bodies Conserved' },
  { icon: 'fish', value: '20+', label: 'Fisheries Projects' },
  { icon: 'sector', value: '10+', label: 'Development Sectors' },
];

export const FOCUS_AREAS = [
  {
    id: 'education',
    title: 'Education & Skill Development',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
    path: '/programs/education',
    programs: ['Scholarship Program', 'Digital Education', 'Libraries', 'Career Guidance'],
  },
  {
    id: 'child-care',
    title: 'Child Care & Protection',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop',
    path: '/programs/child-care',
    programs: ['Child Rights', 'Nutrition', 'Counseling', 'Rehabilitation'],
  },
  {
    id: 'women',
    title: 'Women Empowerment',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop',
    path: '/programs/women-empowerment',
    programs: ['SHG Formation', 'Entrepreneurship', 'Financial Literacy', 'Leadership Training'],
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Nutrition',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop',
    path: '/programs/healthcare',
    programs: ['Health Camps', 'Maternal Health', 'Telemedicine', 'Nutrition Support'],
  },
  {
    id: 'agriculture',
    title: 'Sustainable Agriculture',
    image:
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
    path: '/programs/agriculture',
    programs: ['Organic Farming', 'Natural Farming', 'Hydroponics', 'FPO Promotion', 'Agri Business'],
  },
  {
    id: 'herbs',
    title: 'Herbs, Spices & Medicinal Plants',
    image:
      'https://images.unsplash.com/photo-1466692476867-aef1dfb1e735?w=400&h=300&fit=crop',
    path: '/programs/herbs',
    programs: ['Tulsi', 'Ashwagandha', 'Aloe Vera', 'Ginger', 'Turmeric', 'Herbal Processing'],
  },
  {
    id: 'fisheries',
    title: 'Fisheries & Aquatic Biodiversity',
    image:
      'https://images.unsplash.com/photo-1544551763-77aef415d3c3?w=400&h=300&fit=crop',
    path: '/programs/fisheries',
    programs: ['Biofloc', 'Cage Culture', 'Fish Hatchery', 'Fish Feed'],
  },
  {
    id: 'environment',
    title: 'Environment & Climate Action',
    image:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop',
    path: '/programs/environment',
    programs: ['Plantation', 'Water Conservation', 'Waste Management', 'Renewable Energy', 'Climate Awareness'],
  },
];

export const FLAGSHIP_PROGRAMS = [
  {
    id: 'herbal-village',
    title: 'Herbal Village Mission',
    description:
      'Promoting cultivation of medicinal plants and herbs to create sustainable livelihoods in rural communities.',
    image:
      'https://images.unsplash.com/photo-1466692476867-aef1dfb1e735?w=500&h=350&fit=crop',
    icon: '🌿',
    path: '/programs/herbal-village',
  },
  {
    id: 'agriculture-mission',
    title: 'Sustainable Agriculture Mission',
    description:
      'Empowering farmers with organic farming techniques, natural inputs, and market linkages for better yields.',
    image:
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&h=350&fit=crop',
    icon: '🌾',
    path: '/programs/agriculture-mission',
  },
  {
    id: 'child-protection',
    title: 'SAARK Child Protection Initiative',
    description:
      'Ensuring every child has access to education, nutrition, and a safe environment to grow and thrive.',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&h=350&fit=crop',
    icon: '👶',
    path: '/programs/child-protection',
  },
  {
    id: 'women-collective',
    title: 'SAARK Women Collective Program',
    description:
      'Building self-help groups and entrepreneurship opportunities for women in underserved communities.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=350&fit=crop',
    icon: '👩',
    path: '/programs/women-collective',
  },
  {
    id: 'fisheries-mission',
    title: 'Fisheries Development Mission',
    description:
      'Supporting fisherfolk with modern techniques, hatcheries, and sustainable aquaculture practices.',
    image:
      'https://images.unsplash.com/photo-1544551763-77aef415d3c3?w=500&h=350&fit=crop',
    icon: '🐟',
    path: '/programs/fisheries-mission',
  },
  {
    id: 'aquatic-biodiversity',
    title: 'Aquatic Biodiversity Mission',
    description:
      'Conserving rivers, wetlands, and native aquatic species through community-led protection initiatives.',
    image:
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=350&fit=crop',
    icon: '🌊',
    path: '/programs/aquatic-biodiversity',
  },
];

export const HERO_SLIDES = [
  {
    image:
      'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1600&h=900&fit=crop',
    badge: 'TOGETHER FOR A BETTER TOMORROW',
    title: 'Building Sustainable Communities for',
    highlight: 'Future Generations',
    description:
      'SAARK Philanthropy Foundation works across education, healthcare, agriculture, women empowerment, and environmental conservation to create lasting change in rural India.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&h=900&fit=crop',
    badge: 'EMPOWERING RURAL FARMERS',
    title: 'Transforming Agriculture for',
    highlight: 'Sustainable Livelihoods',
    description:
      'Through organic farming, natural inputs, and market linkages, we help farmers increase yields while protecting the environment.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&h=900&fit=crop',
    badge: 'WOMEN LEADING CHANGE',
    title: 'Empowering Women Through',
    highlight: 'Collective Action',
    description:
      'Our SHG programs and entrepreneurship initiatives enable women to become leaders and economic contributors in their communities.',
  },
];

export const IMPACT_MAP_STATS = [
  { label: 'States', value: '26' },
  { label: 'Districts', value: '500+' },
  { label: 'Villages', value: '500+' },
  { label: 'Community Partners', value: '1000+' },
  { label: 'Funds Utilized', value: '95%' },
];

export const NEWS_ITEMS = [
  {
    id: 1,
    date: 'Jun 15, 2026',
    title: 'SAARK Foundation wins National Award for Rural Development',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=120&h=80&fit=crop',
    path: '/media/news/national-award',
  },
  {
    id: 2,
    date: 'Jun 10, 2026',
    title: 'Herbal Village Mission expands to 50 new villages',
    image:
      'https://images.unsplash.com/photo-1466692476867-aef1dfb1e735?w=120&h=80&fit=crop',
    path: '/media/news/herbal-expansion',
  },
  {
    id: 3,
    date: 'Jun 5, 2026',
    title: 'World Environment Day: 10,000 trees planted across India',
    image:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=120&h=80&fit=crop',
    path: '/media/news/environment-day',
  },
];

export const SUCCESS_STORIES = [
  {
    id: 1,
    title: 'From Farmer to Entrepreneur',
    excerpt:
      'Meet Priya, who transformed her small farm into a thriving herbal products business, employing 15 women from her village.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop',
    path: '/stories/priya-entrepreneur',
    featured: true,
  },
  {
    id: 2,
    title: 'A Child\'s Dream Realized',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=80&h=80&fit=crop',
    path: '/stories/child-dream',
  },
  {
    id: 3,
    title: 'Village Water Revolution',
    image:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=80&h=80&fit=crop',
    path: '/stories/water-revolution',
  },
  {
    id: 4,
    title: 'Fisherfolk Success Story',
    image:
      'https://images.unsplash.com/photo-1544551763-77aef415d3c3?w=80&h=80&fit=crop',
    path: '/stories/fisherfolk',
  },
];

export const PARTNERS = [
  { name: 'NABARD', logo: 'NABARD' },
  { name: 'NMPB', logo: 'NMPB' },
  { name: 'NFDB', logo: 'NFDB' },
  { name: 'UNDP', logo: 'UNDP' },
  { name: 'UNICEF', logo: 'UNICEF' },
  { name: 'World Vision', logo: 'World Vision' },
  { name: 'CARE', logo: 'CARE' },
  { name: 'CRS', logo: 'CRS' },
];

export const ABOUT_SECTIONS = {
  vision:
    'A world where every community thrives in harmony with nature, empowered with education, health, and sustainable livelihoods.',
  mission:
    'To empower rural and underserved communities through integrated programs in education, healthcare, agriculture, women empowerment, and environmental conservation.',
  values: [
    { title: 'Integrity', description: 'Transparency and accountability in all our actions' },
    { title: 'Compassion', description: 'Serving with empathy and respect for all' },
    { title: 'Sustainability', description: 'Creating lasting impact for future generations' },
    { title: 'Innovation', description: 'Embracing new approaches to solve old challenges' },
    { title: 'Collaboration', description: 'Working together with communities and partners' },
  ],
  journey: [
    { year: '2010', event: 'SAARK Foundation established with education programs' },
    { year: '2014', event: 'Expanded to women empowerment and SHG formation' },
    { year: '2018', event: 'Launched Herbal Village Mission across 100 villages' },
    { year: '2022', event: 'Reached 50,000+ lives impacted milestone' },
    { year: '2026', event: 'Operating in 26 states with 1000+ community partners' },
  ],
};

export const FOOTER_QUICK_LINKS = [
  { label: 'About Us', path: '/about' },
  { label: 'Our Programs', path: '/programs' },
  { label: 'Projects', path: '/projects' },
  { label: 'Impact', path: '/impact' },
  { label: 'Careers', path: '/careers' },
  { label: 'Media', path: '/media' },
];

export const FOOTER_PROGRAM_LINKS = [
  { label: 'Education', path: '/programs/education' },
  { label: 'Child Protection', path: '/programs/child-care' },
  { label: 'Women Empowerment', path: '/programs/women-empowerment' },
  { label: 'Healthcare', path: '/programs/healthcare' },
  { label: 'Agriculture', path: '/programs/agriculture' },
  { label: 'Environment', path: '/programs/environment' },
];

export const FOOTER_INVOLVE_LINKS = [
  { label: 'Apply for Grant', path: '/grants' },
  { label: 'Volunteer', path: '/volunteer/register' },
  { label: 'Internship', path: '/get-involved/internship' },
  { label: 'Partner', path: '/partners/join' },
  { label: 'Fundraise', path: '/get-involved/fundraise' },
  { label: 'Donate', path: '/donor/donate' },
];

export const GRANT_ORG_TYPES = [
  { value: '', label: 'Select type' },
  { value: 'ngo', label: 'NGO / Non-Profit' },
  { value: 'csr', label: 'CSR / Corporate' },
  { value: 'government', label: 'Government Agency' },
  { value: 'shg', label: 'Self-Help Group' },
  { value: 'individual', label: 'Individual' },
  { value: 'other', label: 'Other' },
];

export const GRANT_CATEGORIES = [
  { value: '', label: 'Select category' },
  { value: 'education', label: 'Education & Skill Development' },
  { value: 'child-care', label: 'Child Care & Protection' },
  { value: 'women', label: 'Women Empowerment' },
  { value: 'healthcare', label: 'Healthcare & Nutrition' },
  { value: 'agriculture', label: 'Sustainable Agriculture' },
  { value: 'herbs', label: 'Herbs & Medicinal Plants' },
  { value: 'fisheries', label: 'Fisheries & Aquaculture' },
  { value: 'environment', label: 'Environment & Climate Action' },
  { value: 'livelihood', label: 'Livelihood & Enterprise' },
];

export const GRANT_STEPS = [
  { title: 'Submit Application', description: 'Fill in your basic details and project overview.' },
  { title: 'Review', description: 'Our team evaluates eligibility within 7–10 business days.' },
  { title: 'Interview', description: 'Shortlisted applicants may be invited for a brief discussion.' },
  { title: 'Approval', description: 'Approved grants are disbursed in agreed milestones.' },
];
