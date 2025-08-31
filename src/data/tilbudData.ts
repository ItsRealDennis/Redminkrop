export type CompanySize = 'small' | 'medium' | 'large';

export interface TilbudData {
  size: CompanySize;
  title: string;
  description: string;
  services: string[];
  pris: string;
  fordele: string[];
  varighed: string;
  ekstraServices?: string[];
}

export const tilbudData: Record<CompanySize, TilbudData> = {
  small: {
    size: 'small',
    title: "Startup Pakken",
    description: "Perfekt til virksomheder under 100 ansatte",
    services: [
      "Grundlæggende sundhedstjek for alle medarbejdere",
      "Digital platform med personlige sundhedsprofiler",
      "Månedlige wellness-webinarer",
      "Ergonomisk arbejdspladsgennemgang",
      "24/7 sundhedsrådgivning hotline"
    ],
    pris: "Fra 50.000 kr./år",
    fordele: [
      "Hurtig implementering (2-4 uger)",
      "Ingen bindingsperiode",
      "Fleksibel skalering",
      "Dedikeret onboarding-specialist"
    ],
    varighed: "Implementering: 2-4 uger",
    ekstraServices: [
      "Fitness-partnerskaber",
      "Mental sundhed workshops"
    ]
  },
  medium: {
    size: 'medium',
    title: "Vækst Pakken",
    description: "Skræddersyet til virksomheder med 100-500 ansatte",
    services: [
      "Omfattende sundhedstjek med speciallæger",
      "Avanceret digital platform med AI-drevet sundhedsanalyse",
      "Ugentlige on-site fitness og mindfulness sessioner",
      "Komplet ergonomisk arbejdspladsvurdering og optimering",
      "24/7 sundhedsrådgivning med videokonsultationer",
      "Kvartalsvis sundhedsrapportering til ledelsen"
    ],
    pris: "Fra 150.000 kr./år",
    fordele: [
      "Målbar ROI inden for 6 måneder",
      "Reduceret sygefravær med op til 30%",
      "Øget medarbejdertilfredshed",
      "Skræddersyet implementeringsplan",
      "Dedikeret account manager"
    ],
    varighed: "Implementering: 4-6 uger",
    ekstraServices: [
      "Executive health program",
      "Familiemedlemskaber",
      "Internationale sundhedsforsikringer"
    ]
  },
  large: {
    size: 'large',
    title: "Enterprise Pakken",
    description: "Komplet løsning til virksomheder med 500+ ansatte",
    services: [
      "VIP sundhedstjek med fuld kropsscanning",
      "Enterprise platform med fuld API-integration",
      "Daglige on-site sundhedsfaciliteter",
      "Komplet workplace wellness transformation",
      "24/7 concierge sundhedsservice",
      "Real-time sundhedsdata dashboard",
      "Personaliserede sundhedsplaner for hver medarbejder",
      "Quarterly C-level health briefings"
    ],
    pris: "Custom pricing - kontakt os",
    fordele: [
      "Garanteret 40% reduktion i sygefravær",
      "Øget produktivitet med minimum 20%",
      "Fuld GDPR compliance",
      "White-label muligheder",
      "Global support 24/7",
      "Dedikeret implementation team"
    ],
    varighed: "Implementering: 8-12 uger",
    ekstraServices: [
      "Global sundhedsdækning",
      "M&A sundhedsintegration",
      "Custom wellness apps",
      "Årlige sundhedskonferencer"
    ]
  }
};