export type KPI = {
  label: string;
  value: number;
  unit: string; // %, ↓, ↑, +, etc.
};

export type TimelineItem = {
  year: number;
  title: string;
  summary: string;
  impact: string | null;
  kpis: KPI[];
  link: string | null;
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  logo?: string; // path to client logo
};

export const TIMELINE_DATA: TimelineItem[] = [
  {
    year: 2015,
    title: 'Vi tager det første skridt',
    summary: 'RedMinKrop grundlægges med missionen om sundere arbejdspladser gennem målbar medarbejdertrivsel.',
    impact: null,
    kpis: [],
    link: null,
  },
  {
    year: 2017,
    title: 'De første større aftaler',
    summary: 'Firmakontrakter med HR-afdelinger og sundhedsråd. Vi beviser konceptet med data.',
    impact: 'Udrulning hos +5 større virksomheder',
    kpis: [
      { label: 'Nye kontrakter', value: 5, unit: '+' },
      { label: 'Medarbejdere nået', value: 240, unit: '+' }
    ],
    link: '/cases/it-virksomhed-240',
  },
  {
    year: 2019,
    title: 'Platform lanceres',
    summary: 'Digital platform til tracking af sundhedsdata og automatiserede rapporter går live.',
    impact: 'Real-time sundhedsindsigt',
    kpis: [
      { label: 'Aktive brugere', value: 1200, unit: '+' },
      { label: 'Data compliance', value: 100, unit: '%' }
    ],
    link: null,
  },
  {
    year: 2021,
    title: 'Ergonomi på dagsordenen',
    summary: 'Udvidelse med ergonomi-assessments og arbejdspladsindretning. KPI-rapporter dokumenterer effekt.',
    impact: 'Målbar forbedring af fysisk trivsel',
    kpis: [
      { label: 'Sygefravær', value: 12, unit: '%↓' },
      { label: 'Medarbejdertilfredshed', value: 18, unit: '%↑' }
    ],
    link: '/services/ergonomi',
    quote: {
      text: 'RedMinKrops ergonomi-program har reduceret vores sygemeldinger markant. ROI var tydelig efter 6 måneder.',
      author: 'Mette Larsen',
      role: 'HR Director, TechCorp A/S'
    }
  },
  {
    year: 2023,
    title: 'AI-drevet sundhed',
    summary: 'Prediktive modeller identificerer risikogrupper før problemer opstår. Proaktiv intervention.',
    impact: 'Fra reaktiv til proaktiv sundhedsledelse',
    kpis: [
      { label: 'Forudsagt risiko', value: 87, unit: '%' },
      { label: 'Forebyggede sygedage', value: 450, unit: '+' }
    ],
    link: '/teknologi/ai-insights',
  },
  {
    year: 2024,
    title: 'Hybrid sundhedspakker',
    summary: 'Onsite + online træning sikrer fleksibilitet. API-integrationer med HR-systemer.',
    impact: 'Skalerbar sundhed for moderne arbejdspladser',
    kpis: [
      { label: 'Online engagement', value: 75, unit: '%' },
      { label: 'API uptime', value: 99.9, unit: '%' },
      { label: 'NPS score', value: 72, unit: '+' }
    ],
    link: '/pakker',
    quote: {
      text: 'Hybrid-modellen passer perfekt til vores distribuerede teams. Engagement er højere end nogensinde.',
      author: 'Thomas Kjær',
      role: 'CHRO, FinanceGroup'
    }
  },
  {
    year: 2025,
    title: 'Fremtiden - med jer?',
    summary: 'Enterprise governance, ISO-certificering og udvidet KPI-framework. Plads til jeres virksomhed.',
    impact: 'Næste kapitel skrives med jer',
    kpis: [
      { label: 'Nye sites', value: 3, unit: '+' },
      { label: 'Enterprise-kunder', value: 10, unit: '+' }
    ],
    link: '/kontakt',
  }
];