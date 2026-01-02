export interface PortfolioProject {
  id: string;
  title: string;
  titleSwahili: string;
  client: string;
  location: string;
  category: string;
  description: string;
  descriptionSwahili: string;
  equipment: string;
  timeline: string;
  outcome: string;
  outcomeSwahili: string;
  imageUrl: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'project-1',
    title: 'Hospital Backup Generator Installation',
    titleSwahili: 'Usakinishaji wa Jenereta ya Akiba ya Hospitali',
    client: 'Major Nairobi Hospital',
    location: 'Nairobi, Kenya',
    category: 'Installation',
    description: 'Complete installation of a 500kVA Lister Petter diesel generator system for critical hospital backup power. Included automatic transfer switch integration, fuel system setup, and comprehensive testing.',
    descriptionSwahili: 'Usakinishaji kamili wa mfumo wa jenereta ya dizeli ya Lister Petter ya 500kVA kwa nguvu ya akiba ya hospitali muhimu. Ilijumuisha ujumuishaji wa swichi ya uhamisho wa kiotomatiki, usanidi wa mfumo wa mafuta, na upimaji kamili.',
    equipment: '500kVA Lister Petter Genset',
    timeline: '3 days installation + commissioning',
    outcome: 'Reliable 24/7 backup power ensuring uninterrupted patient care',
    outcomeSwahili: 'Nguvu ya akiba ya kuaminika 24/7 inayohakikisha utunzaji wa wagonjwa usiokatizwa',
    imageUrl: '/placeholder.svg',
  },
  {
    id: 'project-2',
    title: 'Industrial Plant Emergency Repair',
    titleSwahili: 'Ukarabati wa Dharura wa Kiwanda cha Viwanda',
    client: 'Manufacturing Facility',
    location: 'Thika, Kenya',
    category: 'Emergency Repair',
    description: 'Emergency diesel engine repair for critical production equipment. Our technicians responded within 2 hours and completed full engine diagnostics and repair.',
    descriptionSwahili: 'Ukarabati wa dharura wa injini ya dizeli kwa vifaa muhimu vya uzalishaji. Mafundi wetu walijibu ndani ya masaa 2 na kukamilisha uchunguzi kamili wa injini na ukarabati.',
    equipment: 'Lister Petter LPW4 Engine',
    timeline: 'Same-day technician dispatch',
    outcome: 'Production restored within 8 hours - minimal downtime',
    outcomeSwahili: 'Uzalishaji ulirejeshwa ndani ya masaa 8 - wakati wa chini wa kusimama',
    imageUrl: '/placeholder.svg',
  },
  {
    id: 'project-3',
    title: 'University Campus Generator Rental',
    titleSwahili: 'Ukodishaji wa Jenereta wa Chuo Kikuu',
    client: 'Local University',
    location: 'Nairobi, Kenya',
    category: 'Rental',
    description: 'Provided 100kVA mobile generator rental for major campus event. Included delivery, setup, operator training, and fuel service throughout the event period.',
    descriptionSwahili: 'Ilitoa ukodishaji wa jenereta ya rununu ya 100kVA kwa hafla kubwa ya chuo. Ilijumuisha utoaji, usanidi, mafunzo ya opereta, na huduma ya mafuta katika kipindi chote cha hafla.',
    equipment: '100kVA Mobile Generator',
    timeline: '1-week rental with fuel service',
    outcome: 'Seamless power for 3-day campus event with zero interruptions',
    outcomeSwahili: 'Nguvu isiyo na mshono kwa hafla ya chuo ya siku 3 bila usumbufu',
    imageUrl: '/placeholder.svg',
  },
  {
    id: 'project-4',
    title: 'Agricultural Processing Plant Maintenance Contract',
    titleSwahili: 'Mkataba wa Matengenezo ya Kiwanda cha Uchakataji wa Kilimo',
    client: 'Agricultural Cooperative',
    location: 'Nakuru, Kenya',
    category: 'Maintenance',
    description: 'Ongoing preventative maintenance contract for multiple generator units. Monthly inspections, oil analysis, and detailed performance reporting.',
    descriptionSwahili: 'Mkataba wa matengenezo ya kuzuia unaoendelea kwa vitengo vingi vya jenereta. Ukaguzi wa kila mwezi, uchambuzi wa mafuta, na ripoti za kina za utendaji.',
    equipment: 'Multiple Lister Petter Units',
    timeline: '12-month service contract',
    outcome: 'Zero unplanned outages - 99.8% uptime achieved',
    outcomeSwahili: 'Sifuri ya kushindwa ambayo haijapangwa - 99.8% ya wakati wa kufanya kazi umefikiwa',
    imageUrl: '/placeholder.svg',
  },
  {
    id: 'project-5',
    title: 'Complete Spare Parts Overhaul',
    titleSwahili: 'Ukarabati Kamili wa Vipuri',
    client: 'Shipping Company',
    location: 'Mombasa, Kenya',
    category: 'Parts & Repair',
    description: 'Comprehensive engine overhaul including replacement of all major components - pistons, bearings, gaskets, injectors, and timing components with genuine OEM parts.',
    descriptionSwahili: 'Ukarabati kamili wa injini ikiwa ni pamoja na ubadilishaji wa vipengele vyote vikubwa - pistoni, bearingi, gasketi, injekta, na vipengele vya wakati na vipuri halisi vya OEM.',
    equipment: 'Lister Petter LPWS4 Marine Engine',
    timeline: '5 days complete overhaul',
    outcome: 'Engine restored to factory specifications with 5000-hour warranty',
    outcomeSwahili: 'Injini imerejeshwa kwa vipimo vya kiwanda na dhamana ya masaa 5000',
    imageUrl: '/placeholder.svg',
  },
  {
    id: 'project-6',
    title: 'Telecommunications Tower Power System',
    titleSwahili: 'Mfumo wa Nguvu wa Mnara wa Mawasiliano',
    client: 'Telecom Provider',
    location: 'Various Sites, Kenya',
    category: 'Installation',
    description: 'Multi-site generator installation project for remote telecommunications towers. Included solar-diesel hybrid systems and remote monitoring integration.',
    descriptionSwahili: 'Mradi wa usakinishaji wa jenereta za maeneo mengi kwa minara ya mawasiliano ya mbali. Ilijumuisha mifumo ya mseto wa jua-dizeli na ujumuishaji wa ufuatiliaji wa mbali.',
    equipment: 'Multiple 25kVA Gensets',
    timeline: '3-month rollout project',
    outcome: '15 sites powered with 99.9% reliability',
    outcomeSwahili: 'Maeneo 15 yanayopatiwa nguvu na uaminifu wa 99.9%',
    imageUrl: '/placeholder.svg',
  },
];
