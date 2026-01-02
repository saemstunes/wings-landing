export interface Testimonial {
  id: string;
  quote: string;
  quoteSwahili: string;
  clientName: string;
  company: string;
  role: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: 'Wings Engineering provided exceptional service during our emergency generator failure. Their technician arrived within 2 hours and had us back online the same day. Highly professional and reliable!',
    quoteSwahili: 'Wings Engineering ilitoa huduma bora wakati wa kushindwa kwa jenereta yetu ya dharura. Fundi wao aliwasili ndani ya masaa 2 na kuturudisha mtandaoni siku hiyo hiyo. Wenye taaluma na wanaoaminika sana!',
    clientName: 'John Kamau',
    company: 'Thika Manufacturing Ltd',
    role: 'Facilities Manager',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    quote: 'We have been sourcing our Lister Petter spare parts from Wings Engineering for over 5 years. Their parts are always genuine, prices are competitive, and delivery is prompt. Excellent partner!',
    quoteSwahili: 'Tumekuwa tukipata vipuri vyetu vya Lister Petter kutoka Wings Engineering kwa zaidi ya miaka 5. Vipuri vyao ni halisi kila wakati, bei ni shindani, na utoaji ni wa haraka. Mshirika bora!',
    clientName: 'Mary Wanjiku',
    company: 'Nairobi Industrial Supplies',
    role: 'Procurement Officer',
    rating: 5,
  },
  {
    id: 'testimonial-3',
    quote: 'The installation team was professional and thorough. They completed our 200kVA generator installation ahead of schedule and provided comprehensive training for our staff. Highly recommend!',
    quoteSwahili: 'Timu ya usakinishaji ilikuwa ya kitaalamu na makini. Walikamilisha usakinishaji wetu wa jenereta ya 200kVA kabla ya ratiba na kutoa mafunzo kamili kwa wafanyakazi wetu. Ninapendekeza sana!',
    clientName: 'Peter Ochieng',
    company: 'Mombasa Port Authority',
    role: 'Technical Director',
    rating: 5,
  },
  {
    id: 'testimonial-4',
    quote: 'Wings Engineering\'s preventative maintenance program has significantly reduced our downtime. Their regular service visits and detailed reports help us stay ahead of potential issues.',
    quoteSwahili: 'Mpango wa matengenezo ya kuzuia wa Wings Engineering umepunguza sana wakati wetu wa kusimama. Ziara zao za huduma za mara kwa mara na ripoti za kina zinatusaidia kukaa mbele ya matatizo yanayoweza kutokea.',
    clientName: 'Grace Muthoni',
    company: 'Nakuru General Hospital',
    role: 'Operations Manager',
    rating: 5,
  },
  {
    id: 'testimonial-5',
    quote: 'Finding genuine Lister Petter parts in Kenya was always a challenge until we found Wings Engineering. Their technical knowledge and parts availability is unmatched in the region.',
    quoteSwahili: 'Kupata vipuri halisi vya Lister Petter nchini Kenya ilikuwa changamoto kila wakati hadi tulipopata Wings Engineering. Ujuzi wao wa kiufundi na upatikanaji wa vipuri hauna mfano katika eneo.',
    clientName: 'Samuel Kiprop',
    company: 'Eldoret Agricultural Co-op',
    role: 'Fleet Manager',
    rating: 5,
  },
];
