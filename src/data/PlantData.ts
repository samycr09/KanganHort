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
  return stored ? JSON.parse(stored) : demoPlants;
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
// ################ EDIT HERE ##############################

export const demoPlants: PlantBio[] = [
  {
    id: "1",
    family: "Haemodoraceae",
    botanicalName: "Anigozanthos manglesii",
    commonName: "Kangaroo Paw",
    habitGrowthCharacteristics: "Perennial herb with upright flowering stems",
    lifeCycle: "Perennial",
    identifyingCharacteristics: "Distinctive fuzzy tubular flowers resembling a kangaroo paw; fan shaped leaf clumps",
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
      "/assets/plant-1.jpg"
    ],
    studentId: "demo",
    studentName: "Student",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    qrCode: "/plant/1"
  },
  // Repeat for plant/2 to plant-17(same structure)
 {
   id: "2",
    family: "Asteraceae",
    botanicalName: "Chrysocephalum apiculatum ",
    commonName: "Everlasting Daisy flowering ",
    habitGrowthCharacteristics: "Low, spreading perennial groundcover",
    lifeCycle: "Perennial",
    identifyingCharacteristics: "Silver grey foliage; clusters of bright yellow button flowers",
    leavesStemsMemristems:
      "Narrow, soft, silvery leaves; stems trailing and rooting at nodes",
    flowers: "Papery yellow flower heads",
    floweringTimeSeason: "",
    fruitSeed: "Small dry achenes",
    seedCollectionTimeSeason: "",
    additionalPropagationRequirements: "",
    trunk: "",
    rootSystem: "Fibrous, shallow",
    vascularSystem: "Adapted to drought; efficient water retention",
    additionalInformation: "",
    spottingCharacteristics: "",
    familyLevel: "",
    culturalInformationAndUses: "Excellent for native gardens, borders, habitat plantings; attracts pollinators.",
    references: "",
    horticulturalLandscapeInfo: "",
    ethnobotanicalInformationUses: "C",
    indigenousSeason: "",
    images: [
      "/assets/plant-2.jpg"
    ],
    studentId: "demo",
    studentName: "Student",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    qrCode: "/plant/2"
  }, 
{
    id: "3",
    family: "Rutaceae",
    botanicalName: "Correa glabra ",
    commonName: "Rock correa ",
    habitGrowthCharacteristics: "Dense shrub 1–2 m tall",
    lifeCycle: "Perennial",
    identifyingCharacteristics: "Smooth, glossy leaves; tubular green to red flowers",
    leavesStemsMemristems:
      "Opposite leaves; stems woody; meristems protected in leaf axils",
    flowers: "Tubular, bird pollinated; greenish with red tips",
    floweringTimeSeason: "Guling (Winter) extending from Waring to Poorneet",
    fruitSeed: "Dry capsule with several seeds",
    seedCollectionTimeSeason: "",
    additionalPropagationRequirements: "",
    trunk: "Woody multi stemmed base",
    rootSystem: "Deep, hardy; drought tolerant",
    vascularSystem: "Woody vascular bundles; adapted to dry sclerophyll conditions",
    additionalInformation: "",
    spottingCharacteristics: "",
    familyLevel: "",
    culturalInformationAndUses: "Great screening shrub; attracts honeyeaters; tolerates shade and dry soils",
    references: "",
    horticulturalLandscapeInfo: "",
    ethnobotanicalInformationUses: "C",
    indigenousSeason: "",
    images: [
      "/assets/plant-3.jpg"
    ],
    studentId: "demo",
    studentName: "Student",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(), 
    qrCode: "plant/3"
  },
  {
    id: "4",
    family: "Asphodelaceae",
    botanicalName: "Dianella revoluta ",
    commonName: "Flax lily ",
    habitGrowthCharacteristics: "Tufting perennial with strappy leaves",
    lifeCycle: "Perennial",
    identifyingCharacteristics: "Blue purple flowers with yellow anthers; glossy blue berries",
    leavesStemsMemristems:
      "Linear leaves from basal meristem; stems slender",
    flowers: "Star shaped blue flowers on branched stems",
    floweringTimeSeason: "",
    fruitSeed: "Bright blue berries; seeds black",
    seedCollectionTimeSeason: "",
    additionalPropagationRequirements: "",
    trunk: "None",
    rootSystem: "Rhizomatous; forms clumps",
    vascularSystem: "Efficient water storage in rhizomes",
    additionalInformation: "",
    spottingCharacteristics: "",
    familyLevel: "",
    culturalInformationAndUses: "Hardy landscaping plant; used in mass plantings; berries attract wildlife",
    references: "",
    horticulturalLandscapeInfo: "",
    ethnobotanicalInformationUses: "C",
    indigenousSeason: "",
    images: [
      "/assets/plant-4.jpg"
    ],
    studentId: "demo",
    studentName: "Student",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    qrCode: "plant/4"
  },
{
    id: "5",
    family: "Moraceae",
    botanicalName: " Ficus benjamina variegata",
    commonName: "Variegated Weeping Fig",
    habitGrowthCharacteristics: "Evergreen tree or large shrub with pendulous branches",
    lifeCycle: "Perennial",
    identifyingCharacteristics: "Cream variegated leaves; graceful weeping habit",
    leavesStemsMemristems:
      "Glossy ovate leaves; woody stems; apical meristems dominant",
    flowers: "Inconspicuous internal fig flowers (syconia).",
    floweringTimeSeason: "",
    fruitSeed: "Small fig fruits; rarely produced indoors.",
    seedCollectionTimeSeason: "",
    additionalPropagationRequirements: "",
    trunk: "Smooth grey trunk; can develop aerial roots",
    rootSystem: "Strong, invasive; surface rooting",
    vascularSystem: "Latex bearing vessels typical of figs.",
    additionalInformation: "",
    spottingCharacteristics: "",
    familyLevel: "",
    culturalInformationAndUses: "Popular indoor plant; used for screening; requires bright light and stable conditions",
    references: "",
    horticulturalLandscapeInfo: "",
    ethnobotanicalInformationUses: "C",
    indigenousSeason: "",
    images: [
      "/assets/plant-5.jpg"
    ],
    studentId: "demo",
    studentName: "Student",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(), 
    qrCode: "plant/5"
  },
];