export interface Campaign {
  id: string;
  ngoId: string;
  title: string;
  description: string;
  longDescription: string;
  goalAmount: number;
  raisedAmount: number;
  image: string;
  category: 'education' | 'healthcare' | 'environment' | 'disaster-relief';
  volunteersNeeded: number;
  volunteersJoined: number;
  status: 'active' | 'completed' | 'upcoming';
  impactMetrics: {
    label: string;
    value: string;
  }[];
  updates: {
    date: string;
    title: string;
    content: string;
  }[];
}

export interface NGO {
  id: string;
  name: string;
  description: string;
  focusArea: string;
  logo: string;
  verified: boolean;
  totalRaised: number;
  totalVolunteers: number;
  campaignsCount: number;
}

export const ngos: NGO[] = [
  {
    id: 'ngo-1',
    name: 'WaterLife Foundation',
    description: 'Providing clean drinking water to rural communities across India through sustainable well construction and water purification systems.',
    focusArea: 'Clean Water',
    logo: '💧',
    verified: true,
    totalRaised: 8500000,
    totalVolunteers: 450,
    campaignsCount: 12,
  },
  {
    id: 'ngo-2',
    name: 'EduBright Initiative',
    description: 'Empowering underprivileged children through quality education, digital literacy programs, and scholarship opportunities.',
    focusArea: 'Education',
    logo: '📚',
    verified: true,
    totalRaised: 12500000,
    totalVolunteers: 820,
    campaignsCount: 18,
  },
  {
    id: 'ngo-3',
    name: 'HealthFirst Trust',
    description: 'Bringing healthcare services to remote areas through mobile clinics, health camps, and medical equipment donations.',
    focusArea: 'Healthcare',
    logo: '🏥',
    verified: true,
    totalRaised: 6200000,
    totalVolunteers: 310,
    campaignsCount: 8,
  },
  {
    id: 'ngo-4',
    name: 'GreenEarth Movement',
    description: 'Fighting climate change through reforestation, plastic cleanup drives, and sustainable living education programs.',
    focusArea: 'Environment',
    logo: '🌱',
    verified: true,
    totalRaised: 4800000,
    totalVolunteers: 1200,
    campaignsCount: 15,
  },
];

export const campaigns: Campaign[] = [
  {
    id: 'camp-1',
    ngoId: 'ngo-1',
    title: 'Clean Water for 500 Villages',
    description: 'Help us install water purification systems in 500 villages across rural Maharashtra, providing safe drinking water to over 200,000 people.',
    longDescription: 'Access to clean water is a basic human right, yet millions in rural India still lack it. Our mission is to install state-of-the-art water purification systems that are sustainable and community-managed. Each system can serve an entire village for over 15 years with minimal maintenance.',
    goalAmount: 2500000,
    raisedAmount: 1625000,
    image: 'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=800&auto=format&fit=crop',
    category: 'environment',
    volunteersNeeded: 100,
    volunteersJoined: 67,
    status: 'active',
    impactMetrics: [
      { label: 'Villages Covered', value: '312' },
      { label: 'People Helped', value: '124,800' },
      { label: 'Systems Installed', value: '312' },
    ],
    updates: [
      { date: '2026-01-15', title: 'Milestone Reached!', content: 'We have successfully installed systems in 312 villages.' },
      { date: '2026-01-10', title: 'New Partnership', content: 'Partnered with local government for faster implementation.' },
    ],
  },
  {
    id: 'camp-2',
    ngoId: 'ngo-2',
    title: 'Education for 10,000 Children',
    description: 'Sponsor the education of 10,000 underprivileged children including books, uniforms, and digital learning tools.',
    longDescription: 'Education transforms lives. Our comprehensive program provides not just school fees, but complete educational support including uniforms, books, tablets for digital learning, and after-school tutoring. Every child deserves the chance to learn and grow.',
    goalAmount: 5000000,
    raisedAmount: 3850000,
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&auto=format&fit=crop',
    category: 'education',
    volunteersNeeded: 200,
    volunteersJoined: 156,
    status: 'active',
    impactMetrics: [
      { label: 'Students Enrolled', value: '7,700' },
      { label: 'Schools Partnered', value: '45' },
      { label: 'Tablets Distributed', value: '3,200' },
    ],
    updates: [
      { date: '2026-01-20', title: 'Digital Classroom Launch', content: 'Launched 15 new digital classrooms this month.' },
    ],
  },
  {
    id: 'camp-3',
    ngoId: 'ngo-3',
    title: 'Healthcare Outreach 2026',
    description: 'Mobile health camps providing free medical checkups, medicines, and health awareness in underserved communities.',
    longDescription: 'Our mobile health units travel to remote areas where healthcare access is limited. Each camp provides free consultations, basic medicines, diagnostic tests, and referrals for specialized care. We also conduct health awareness sessions on preventive care.',
    goalAmount: 1800000,
    raisedAmount: 1170000,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&auto=format&fit=crop',
    category: 'healthcare',
    volunteersNeeded: 80,
    volunteersJoined: 52,
    status: 'active',
    impactMetrics: [
      { label: 'Patients Treated', value: '15,420' },
      { label: 'Health Camps', value: '89' },
      { label: 'Free Medicines', value: '45,000+' },
    ],
    updates: [
      { date: '2026-01-18', title: 'Eye Camp Success', content: 'Conducted eye camp with 500+ free cataract surgeries.' },
    ],
  },
  {
    id: 'camp-4',
    ngoId: 'ngo-4',
    title: 'Plant 1 Million Trees',
    description: 'Join our massive reforestation drive to plant 1 million trees across degraded forest lands in Western Ghats.',
    longDescription: 'The Western Ghats is one of the world\'s biodiversity hotspots, yet it faces severe deforestation. Our project focuses on planting native species that support local wildlife and help restore the ecosystem while providing livelihood to local communities.',
    goalAmount: 3000000,
    raisedAmount: 1500000,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop',
    category: 'environment',
    volunteersNeeded: 500,
    volunteersJoined: 423,
    status: 'active',
    impactMetrics: [
      { label: 'Trees Planted', value: '520,000' },
      { label: 'Hectares Covered', value: '850' },
      { label: 'Species Planted', value: '45' },
    ],
    updates: [
      { date: '2026-01-22', title: 'Half Million Trees!', content: 'Reached 500,000 trees planted milestone.' },
    ],
  },
  {
    id: 'camp-5',
    ngoId: 'ngo-2',
    title: 'Girls\' STEM Scholarship',
    description: 'Empowering young girls from low-income families to pursue careers in Science, Technology, Engineering, and Mathematics.',
    longDescription: 'Breaking barriers for girls in STEM. This scholarship covers full tuition, provides mentorship from women leaders in tech, and offers internship placements. We believe diversity in STEM drives innovation.',
    goalAmount: 2000000,
    raisedAmount: 980000,
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&auto=format&fit=crop',
    category: 'education',
    volunteersNeeded: 50,
    volunteersJoined: 38,
    status: 'active',
    impactMetrics: [
      { label: 'Scholarships Given', value: '245' },
      { label: 'Mentors Engaged', value: '78' },
      { label: 'Internships Placed', value: '112' },
    ],
    updates: [
      { date: '2026-01-12', title: 'New Mentorship Program', content: 'Launched partnership with 20 tech companies.' },
    ],
  },
  {
    id: 'camp-6',
    ngoId: 'ngo-3',
    title: 'Mental Health Awareness',
    description: 'Breaking the stigma around mental health through community programs, counseling centers, and support groups.',
    longDescription: 'Mental health matters. Our program trains community health workers in basic mental health support, establishes counseling centers, and runs awareness campaigns to reduce stigma. We provide free counseling to those who cannot afford it.',
    goalAmount: 1200000,
    raisedAmount: 540000,
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&auto=format&fit=crop',
    category: 'healthcare',
    volunteersNeeded: 60,
    volunteersJoined: 28,
    status: 'active',
    impactMetrics: [
      { label: 'Counseling Sessions', value: '3,200' },
      { label: 'Trained Counselors', value: '45' },
      { label: 'Awareness Events', value: '78' },
    ],
    updates: [
      { date: '2026-01-08', title: 'Helpline Launch', content: '24/7 mental health helpline now operational.' },
    ],
  },
];

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  donations: {
    id: string;
    campaignId: string;
    amount: number;
    date: string;
  }[];
  volunteerApplications: {
    id: string;
    campaignId: string;
    status: 'pending' | 'approved' | 'rejected';
    date: string;
  }[];
}

export const mockUser: User = {
  id: 'user-1',
  name: 'Priya Sharma',
  email: 'priya.sharma@email.com',
  avatar: 'PS',
  donations: [
    { id: 'don-1', campaignId: 'camp-1', amount: 5000, date: '2026-01-15' },
    { id: 'don-2', campaignId: 'camp-2', amount: 2500, date: '2026-01-10' },
    { id: 'don-3', campaignId: 'camp-4', amount: 1000, date: '2026-01-05' },
  ],
  volunteerApplications: [
    { id: 'vol-1', campaignId: 'camp-4', status: 'approved', date: '2026-01-08' },
    { id: 'vol-2', campaignId: 'camp-2', status: 'pending', date: '2026-01-20' },
  ],
};

export interface NGOUser {
  id: string;
  ngoId: string;
  name: string;
  email: string;
  plan: 'basic' | 'pro';
}

export const mockNGOUser: NGOUser = {
  id: 'ngo-user-1',
  ngoId: 'ngo-2',
  name: 'Rajesh Kumar',
  email: 'rajesh@edubright.org',
  plan: 'pro',
};

export const platformStats = {
  totalPeopleHelped: 50000,
  totalRaised: 25000000,
  totalVolunteers: 5000,
  totalCampaigns: 100,
};

export const pricingPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 999,
    period: 'month',
    features: [
      'Up to 5 active campaigns',
      'Basic analytics dashboard',
      'Email support',
      'Standard verification badge',
      'Monthly payouts',
    ],
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 2499,
    period: 'month',
    features: [
      'Unlimited campaigns',
      'Advanced analytics & reports',
      'Priority support',
      'Premium verification badge',
      'Weekly payouts',
      'Featured placement',
      'Custom donation pages',
      'API access',
    ],
    highlighted: true,
  },
];
