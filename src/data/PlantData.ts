export interface IndigenousSeason {
  name: string;
  period: string;
  description: string;
  weather: string;
  plantIndicators: string;
  animalBehavior: string;
  
}

export interface PlantBio {
  id: string;
  family: string;
  botanicalName: string;
  commonName: string;
  habitGrowthCharacteristics: string;
  lifeCycle: string;
 //PlantBio: string;
  identifyingCharacteristics: string;
  leavesStemsMemristems: string;
  flowers: string;
  floweringTimeSeason: string;
  fruitSeed: string;
  seedCollectionTimeSeason: string;
  additionalPropagationRequirements: string;
  trunk: string;
  rootSystem: string;
  vascularSystem: string;
  additionalInformation: string;
  spottingCharacteristics: string;
  familyLevel: string;
  culturalInformationAndUses: string;
  references: string;
  horticulturalLandscapeInfo: string;
  ethnobotanicalInformationUses: string;
  indigenousSeason: string;
  images: string[];
  coverImage?: string;
  featured?: boolean;
  studentId: string;
  studentName: string;
  createdAt: string;
  updatedAt: string;
  qrCode: string;
}

// What the PlantInfo screen needs (UI-friendly shape)
export interface PlantView {
  plantId: string;
  commonName: string;
  botanicalName: string;
  imageUrl: string;

  leaves: string;
  stem: string;
  meristems: string;

  flower: string;
  flowerSeason: string;

  fruitSeed: string;
  fruitSeedSeason: string;

  trunk: string;
  rootSystem: string;
  vascularSystem: string;

  propagationRequired: string;
  additionalComment?: string;
}

// Convert a PlantBio (admin/storage shape) into PlantView (UI shape)
export function plantBioToView(p: PlantBio): PlantView {
  // If you store multiple images, use first one as display image.
  const imageUrl = p.images?.[0] ?? "";

  // You currently store leaves/stem/meristems as one combined field.
  // We'll do a safe split if possible; otherwise show the combined text in Leaves.
  const combined = (p.leavesStemsMemristems ?? "").trim();

  let leaves = combined;
  let stem = "";
  let meristems = "";

  // Optional: try to split with common labels if your text uses them.
  // This is defensive and won't crash if the format isn't consistent.
  const lower = combined.toLowerCase();
  if (lower.includes("stem") || lower.includes("meristem")) {
    // Simple heuristic: keep all in leaves if format unknown.
    // (You can improve later once your data format is consistent.)
  }

  return {
    plantId: p.id, // using PlantBio.id as the UI plantId
    commonName: p.commonName,
    botanicalName: p.botanicalName,
    imageUrl,

    leaves,
    stem,
    meristems,

    flower: p.flowers,
    flowerSeason: p.floweringTimeSeason,

    fruitSeed: p.fruitSeed,
    fruitSeedSeason: p.seedCollectionTimeSeason,

    trunk: p.trunk,
    rootSystem: p.rootSystem,
    vascularSystem: p.vascularSystem,

    propagationRequired: p.additionalPropagationRequirements,
    additionalComment: p.additionalInformation || undefined,
  };
}

export const indigenousSeasons: IndigenousSeason[] = [
  {
    name: 'Birak',
    period: 'December - January',
    description: 'Hot and dry, often with strong winds. Traditional fire/cool burning season to care for Country.',
    weather: 'Hot, dry, and windy; occasional heat spikes',
    plantIndicators: 'Dry grasses; many plants harden off; summer flowering begins',
    animalBehavior: 'Increased insect activity; reptiles active; many animals seek shade and water'
  },
{
    name: 'Bunuru',
    period: 'February - March',
    description: 'The hottest and driest time. Waterways and wetlands are vital places of life.',
    weather: 'Hottest period; very dry; heatwaves more likely',
    plantIndicators: 'Plants conserve moisture; seed heads and dry grasses common',
    animalBehavior: 'Animals stay close to water; birds concentrate around wetlands'
  },
  {
    name: 'Djeran',
    period: 'April - May',
    description: 'Cooling season. Leaves start to change and fall; mornings become crisp; some rains return.',
    weather: 'Cooler days and nights; increasing rainfall and dew',
    plantIndicators: 'Autumn colour; fungi appear; some native plants set seed',
    animalBehavior: 'Bird movements shift; animals prepare for colder months'
  },
  {
    name: 'Makuru',
    period: 'June - July',
    description: 'Cold and wet. Strong winds, rain, and frosts are common; waterways flow strongly.',
    weather: 'Coldest and wettest period; frosts and cold winds',
    plantIndicators: 'Slower plant growth; mosses and fungi thrive in damp areas',
    animalBehavior: 'Lower activity for many species; some birds shelter and forage closer to cover'
  },
  {
    name: 'Djilba',
    period: 'August - September',
    description: 'Early spring / “season of change”. Warm days can be mixed with cold snaps and rain.',
    weather: 'Unpredictable; alternating sun, rain, and cold snaps',
    plantIndicators: 'Wattles begin flowering; new shoots appear; early orchids may emerge',
    animalBehavior: 'More nesting activity; insects begin to return; frogs become more active after rain'
  },
  {
    name: 'Kambarang',
    period: 'October - November',
    description: 'Late spring. Warmer weather settles in; many plants flower and country feels “alive”.',
    weather: 'Warming and generally drier; longer sunny days',
    plantIndicators: 'Wildflowers and grasses in bloom; new growth strong across many species',
    animalBehavior: 'High pollinator activity (bees, butterflies); nesting and breeding increases'
  }
];

// Mock plant data
export const mockPlants: PlantBio[] = [];

// Storage helpers
export function getPlants(): PlantBio[] {
  const stored = localStorage.getItem('plants');
  return stored ? JSON.parse(stored) : mockPlants;
}

export function savePlant(plant: PlantBio): void {
  const plants = getPlants();
  const existingIndex = plants.findIndex(p => p.id === plant.id);
  
  if (existingIndex >= 0) {
    plants[existingIndex] = plant;
  } else {
    plants.push(plant);
  }
  
  localStorage.setItem('plants', JSON.stringify(plants));
}

export function deletePlant(id: string): void {
  const plants = getPlants().filter(p => p.id !== id);
  localStorage.setItem('plants', JSON.stringify(plants));
}

export function getPlantById(id: string): PlantBio | undefined {
  return getPlants().find(p => p.id === id);
}

export const demoPlants: PlantBio[] = [
  {
    id: "PLANT-001",
    family: "Haemodoraceae",
    botanicalName: "Anigozanthos manglesii",
    commonName: "Kangaroo Paw",
    habitGrowthCharacteristics: "Perennial herb with upright flowering stems",
    lifeCycle: "Perennial",
    identifyingCharacteristics: "Distinctive tubular flowers resembling a kangaroo paw",
    leavesStemsMemristems:
      "Leaves: Linear, sword-shaped\nStem: Unbranched flowering stems\nMeristems: Apical for flowers, basal for leaf growth",
    flowers: "Tubular red and green flowers covered in fine hairs",
    floweringTimeSeason: "Poorneet (September - October)",
    fruitSeed: "Capsule containing black seeds",
    seedCollectionTimeSeason: "Buarth Gurru (November)",
    additionalPropagationRequirements: "Division of rhizomes or seed propagation",
    trunk: "No woody trunk",
    rootSystem: "Fibrous roots with rhizomes",
    vascularSystem: "Monocot vascular bundles",
    additionalInformation: "Western Australia's floral emblem",
    spottingCharacteristics: "Bright red flowers in spring",
    familyLevel: "Haemodoraceae",
    culturalInformationAndUses: "Used in Aboriginal seasonal knowledge",
    references: "FloraBase WA",
    horticulturalLandscapeInfo: "Full sun, well-drained soil",
    ethnobotanicalInformationUses: "Cultural seasonal indicator",
    indigenousSeason: "Poorneet",
    images: [
      "/assets/kangaroo-paw.jpg"
    ],
    studentId: "demo",
    studentName: "Kangan Student",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    qrCode: "PLANT-001"
  },
  // Repeat for PLANT-002 ... PLANT-005 (same structure)
  {
    id: "PLANT-002",
    family: "Proteaceae",
    botanicalName: "Telopea speciosissima",
    commonName: "Waratah",
    habitGrowthCharacteristics: "",
    lifeCycle: "",
    identifyingCharacteristics: "",
    leavesStemsMemristems:
      "Leaves: Oblong to lanceolate, dark green, leathery, 10–20cm long\n" +
      "Stem: Woody, upright, branching\n" +
      "Meristems: Terminal meristems produce large flower heads",
    flowers:
      "Large red dome-shaped head, 10–15cm diameter, surrounded by red bracts",
    floweringTimeSeason: "Guling to Poorneet (August - October)",
    fruitSeed: "Woody follicle containing winged seeds",
    seedCollectionTimeSeason: "Garrawang to Biderap (December - February)",
    additionalPropagationRequirements:
      "Cuttings from semi-hardwood in autumn, grafting onto hardy rootstock recommended",
    trunk: "Multi-stemmed shrub, woody at base",
    rootSystem: "Deep taproot with lateral roots",
    vascularSystem: "Ring of vascular bundles in stem (dicot)",
    additionalInformation:
      "New South Wales floral emblem. Spectacular spring display. Prefers acidic, well-drained soil and part shade.",
    spottingCharacteristics: "",
    familyLevel: "",
    culturalInformationAndUses: "",
    references: "",
    horticulturalLandscapeInfo: "",
    ethnobotanicalInformationUses: "",
    indigenousSeason: "Guling",
    images: ["https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800"],
    studentId: "",
    studentName: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    qrCode: "PLANT-002",
  },
  {
    id: "PLANT-003",
    family: "Fabaceae",
    botanicalName: "Acacia dealbata",
    commonName: "Silver Wattle",
    habitGrowthCharacteristics: "",
    lifeCycle: "",
    identifyingCharacteristics: "",
    leavesStemsMemristems:
      "Leaves: Bipinnate, feathery, silver-grey, compound with small leaflets\n" +
      "Stem: Smooth, grey-green when young, becoming fissured with age\n" +
      "Meristems: Lateral and terminal meristems produce numerous flower clusters",
    flowers: "Globular bright yellow flower heads in large sprays",
    floweringTimeSeason: "Waring to Guling (June - August)",
    fruitSeed: "Flat brown pods, 4–10cm long",
    seedCollectionTimeSeason: "Poorneet to Buarth Gurru (October - November)",
    additionalPropagationRequirements:
      "Scarified seeds sown in spring, can also use cuttings",
    trunk: "Single or multi-trunked, can reach 20–30m height",
    rootSystem: "Extensive root system, nitrogen-fixing nodules",
    vascularSystem: "Secondary growth with distinct xylem and phloem layers",
    additionalInformation:
      "Fast-growing pioneer species. Nitrogen fixer improves soil. Can become invasive outside native range.",
    spottingCharacteristics: "",
    familyLevel: "",
    culturalInformationAndUses: "",
    references: "",
    horticulturalLandscapeInfo: "",
    ethnobotanicalInformationUses: "",
    indigenousSeason: "Waring",
    images: ["https://images.unsplash.com/photo-1615671524827-c1fe3973b648?w=800"],
    studentId: "",
    studentName: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    qrCode: "PLANT-003",
  },
  {
    id: "PLANT-004",
    family: "Proteaceae",
    botanicalName: "Banksia integrifolia",
    commonName: "Banksia",
    habitGrowthCharacteristics: "",
    lifeCycle: "",
    identifyingCharacteristics: "",
    leavesStemsMemristems:
      "Leaves: Linear to oblong, dark green above, white-silver underneath, 4–20cm long\n" +
      "Stem: Woody, grey bark becoming rough with age\n" +
      "Meristems: Terminal meristems produce characteristic flower spikes",
    flowers: "Cylindrical pale yellow flower spike, 5–15cm long",
    floweringTimeSeason: "Luk to Buarth Gurru (March - November)",
    fruitSeed:
      "Woody follicles embedded in cone, release seeds after fire",
    seedCollectionTimeSeason: "Year-round, fire-triggered release",
    additionalPropagationRequirements:
      "Seed after heat treatment or smoke water, cuttings difficult",
    trunk: "Single trunk, can grow 5–25m tall",
    rootSystem:
      "Deep root system with proteoid roots for nutrient uptake",
    vascularSystem: "Well-developed secondary vascular tissue",
    additionalInformation:
      "Important food source for nectar-feeding birds and insects. Fire-adapted species with serotinous seed release.",
    spottingCharacteristics: "",
    familyLevel: "",
    culturalInformationAndUses: "",
    references: "",
    horticulturalLandscapeInfo: "",
    ethnobotanicalInformationUses: "",
    indigenousSeason: "Luk",
    images: ["https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=800"],
    studentId: "",
    studentName: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    qrCode: "PLANT-004",
  },
  {
    id: "PLANT-005",
    family: "Myrtaceae",
    botanicalName: "Callistemon citrinus",
    commonName: "Bottlebrush",
    habitGrowthCharacteristics: "",
    lifeCycle: "",
    identifyingCharacteristics: "",
    leavesStemsMemristems:
      "Leaves: Linear to narrow-lanceolate, aromatic when crushed, 3–7cm long\n" +
      "Stem: Woody, papery bark peeling in strips\n" +
      "Meristems: Terminal meristems produce bottlebrush-like flower spikes",
    flowers:
      "Red cylindrical spike with prominent stamens, 5–10cm long",
    floweringTimeSeason: "Poorneet to Biderap (September - February)",
    fruitSeed: "Woody capsules persist on stems for years",
    seedCollectionTimeSeason: "Garrawang onwards (December+)",
    additionalPropagationRequirements:
      "Semi-hardwood cuttings in autumn, seed germination easy but slow",
    trunk: "Multi-stemmed shrub or small tree",
    rootSystem: "Fibrous root system, moderately deep",
    vascularSystem: "Typical dicot vascular arrangement with cambium",
    additionalInformation:
      "Highly attractive to honeyeaters and lorikeets. Tolerates waterlogging and frost. Popular ornamental plant.",
    spottingCharacteristics: "",
    familyLevel: "",
    culturalInformationAndUses: "",
    references: "",
    horticulturalLandscapeInfo: "",
    ethnobotanicalInformationUses: "",
    indigenousSeason: "Poorneet",
    images: ["https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?w=800"],
    studentId: "",
    studentName: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    qrCode: "PLANT-005",
  },
];
/*
  {
    plantId: 'PLANT-002',
    commonName: 'Waratah',
    botanicalName: 'Telopea speciosissima',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800',
    leaves: 'Oblong to lanceolate, dark green, leathery, 10-20cm long',
    stem: 'Woody, upright, branching',
    meristems: 'Terminal meristems produce large flower heads',
    flower: 'Large red dome-shaped head, 10-15cm diameter, surrounded by red bracts',
    flowerSeason: 'Guling to Poorneet (August - October)',
    fruitSeed: 'Woody follicle containing winged seeds',
    fruitSeedSeason: 'Garrawang to Biderap (December - February)',
    trunk: 'Multi-stemmed shrub, woody at base',
    rootSystem: 'Deep taproot with lateral roots',
    vascularSystem: 'Ring of vascular bundles in stem (dicot)',
    propagationRequired: 'Cuttings from semi-hardwood in autumn, grafting onto hardy rootstock recommended',
    additionalComment: 'New South Wales floral emblem. Spectacular spring display. Prefers acidic, well-drained soil and part shade.'
  },
  {
    plantId: 'PLANT-003',
    commonName: 'Silver Wattle',
    botanicalName: 'Acacia dealbata',
    imageUrl: 'https://images.unsplash.com/photo-1615671524827-c1fe3973b648?w=800',
    leaves: 'Bipinnate, feathery, silver-grey, compound with small leaflets',
    stem: 'Smooth, grey-green when young, becoming fissured with age',
    meristems: 'Lateral and terminal meristems produce numerous flower clusters',
    flower: 'Globular bright yellow flower heads in large sprays',
    flowerSeason: 'Waring to Guling (June - August)',
    fruitSeed: 'Flat brown pods, 4-10cm long',
    fruitSeedSeason: 'Poorneet to Buarth Gurru (October - November)',
    trunk: 'Single or multi-trunked, can reach 20-30m height',
    rootSystem: 'Extensive root system, nitrogen-fixing nodules',
    vascularSystem: 'Secondary growth with distinct xylem and phloem layers',
    propagationRequired: 'Scarified seeds sown in spring, can also use cuttings',
    additionalComment: 'Fast-growing pioneer species. Nitrogen fixer improves soil. Can become invasive outside native range.'
  },
  {
    plantId: 'PLANT-004',
    commonName: 'Banksia',
    botanicalName: 'Banksia integrifolia',
    imageUrl: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=800',
    leaves: 'Linear to oblong, dark green above, white-silver underneath, 4-20cm long',
    stem: 'Woody, grey bark becoming rough with age',
    meristems: 'Terminal meristems produce characteristic flower spikes',
    flower: 'Cylindrical pale yellow flower spike, 5-15cm long',
    flowerSeason: 'Luk to Buarth Gurru (March - November)',
    fruitSeed: 'Woody follicles embedded in cone, release seeds after fire',
    fruitSeedSeason: 'Year-round, fire-triggered release',
    trunk: 'Single trunk, can grow 5-25m tall',
    rootSystem: 'Deep root system with proteoid roots for nutrient uptake',
    vascularSystem: 'Well-developed secondary vascular tissue',
    propagationRequired: 'Seed after heat treatment or smoke water, cuttings difficult',
    additionalComment: 'Important food source for nectar-feeding birds and insects. Fire-adapted species with serotinous seed release.'
  },
  {
    plantId: 'PLANT-005',
    commonName: 'Bottlebrush',
    botanicalName: 'Callistemon citrinus',
    imageUrl: 'https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?w=800',
    leaves: 'Linear to narrow-lanceolate, aromatic when crushed, 3-7cm long',
    stem: 'Woody, papery bark peeling in strips',
    meristems: 'Terminal meristems produce bottlebrush-like flower spikes',
    flower: 'Red cylindrical spike with prominent stamens, 5-10cm long',
    flowerSeason: 'Poorneet to Biderap (September - February)',
    fruitSeed: 'Woody capsules persist on stems for years',
    fruitSeedSeason: 'Garrawang onwards (December+)',
    trunk: 'Multi-stemmed shrub or small tree',
    rootSystem: 'Fibrous root system, moderately deep',
    vascularSystem: 'Typical dicot vascular arrangement with cambium',
    propagationRequired: 'Semi-hardwood cuttings in autumn, seed germination easy but slow',
    additionalComment: 'Highly attractive to honeyeaters and lorikeets. Tolerates waterlogging and frost. Popular ornamental plant.'
  }
*/

