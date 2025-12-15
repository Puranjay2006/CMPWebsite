
export interface SearchItem {
  id: string;
  title: string;
  description: string;
  page: string;
  hash?: string;
  category: 'Service' | 'Page' | 'Product' | 'General';
  icon: string;
}

export const searchIndex: SearchItem[] = [
  // General Pages
  {
    id: 'home',
    title: 'Home',
    description: 'Capital Media Partners homepage. Building businesses, empowering success.',
    page: 'home',
    category: 'Page',
    icon: 'fa-home'
  },
  {
    id: 'about',
    title: 'About Us',
    description: 'Learn about our mission, vision, values, and our story founded in Aotearoa.',
    page: 'about',
    category: 'Page',
    icon: 'fa-users'
  },
  {
    id: 'contact',
    title: 'Contact Us',
    description: 'Get in touch with our team. Phone, email, and inquiry form.',
    page: 'contact',
    category: 'Page',
    icon: 'fa-envelope'
  },
  
  // Services
  {
    id: 'service-business',
    title: 'Business Advisory Services',
    description: 'Company registration, compliance, strategic planning, and startup guidance.',
    page: 'service-business',
    category: 'Service',
    icon: 'fa-business-time'
  },
  {
    id: 'service-marketing',
    title: 'Marketing & Print Media',
    description: 'Campaign strategy, creative development, print media, and brand nationwide reach.',
    page: 'service-marketing',
    category: 'Service',
    icon: 'fa-print'
  },
  {
    id: 'service-tech',
    title: 'Technology & AI Solutions',
    description: 'Intelligent automation, AkoDesk AI, and digital transformation.',
    page: 'service-tech',
    category: 'Service',
    icon: 'fa-microchip'
  },
  {
    id: 'service-insurance',
    title: 'Insurance Advisory',
    description: 'Business protection, personal insurance, risk assessment, and policy optimization.',
    page: 'service-insurance',
    category: 'Service',
    icon: 'fa-shield-alt'
  },

  // Products & Specific Sections
  {
    id: 'akodesk',
    title: 'AkoDesk AI',
    description: 'Our flagship AI voice assistant platform for automated customer engagement.',
    page: 'service-tech',
    category: 'Product',
    icon: 'fa-robot'
  },
  {
    id: 'wall-planner',
    title: 'Community Wall Planner',
    description: 'Free 2025-2026 Wall Planner for local businesses and community hubs.',
    page: 'home',
    hash: 'products',
    category: 'Product',
    icon: 'fa-calendar-alt'
  },
  {
    id: 'partnership',
    title: 'Child Cancer Foundation Partnership',
    description: 'Learn about our official partnership and community impact work.',
    page: 'about',
    category: 'General',
    icon: 'fa-hand-holding-heart'
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    description: 'How we collect, use, and protect your personal information.',
    page: 'privacy',
    category: 'General',
    icon: 'fa-lock'
  },
  {
    id: 'terms',
    title: 'Terms & Conditions',
    description: 'The rules and regulations for using our website and services.',
    page: 'terms',
    category: 'General',
    icon: 'fa-file-contract'
  }
];
