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
/*  studentId: string;
  studentName: string;
  createdAt: string;
  updatedAt: string;*/
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
return demoPlants;}

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
    qrCode: "plant/5"
  },
{
    id: "6",
    family: " Lamiaceae",
    botanicalName: "Mentha spicata ",
    commonName: "Common Mint ",
    habitGrowthCharacteristics: "Spearmint aroma; square stems; bright green leaves",
    lifeCycle: "Perennial",
    identifyingCharacteristics: "",
    leavesStemsMemristems:
      "Opposite leaves; square stems; meristems at nodes allow rapid spread",
    flowers: "Pale lilac spikes",
    floweringTimeSeason: "",
    fruitSeed: "Tiny nutlets; rarely used for propagation",
    seedCollectionTimeSeason: "",
    additionalPropagationRequirements: "",
    trunk: "None",
    rootSystem: "Rhizomatous, fast spreading",
    vascularSystem: "Typical Lamiaceae square stem vascular arrangement",
    additionalInformation: "",
    spottingCharacteristics: "",
    familyLevel: "",
    culturalInformationAndUses: "Culinary herb; prefers moist soils; best grown in pots to contain spread",
    references: "",
    horticulturalLandscapeInfo: "",
    ethnobotanicalInformationUses: "C",
    indigenousSeason: "",
    images: [
      "/assets/plant-6.jpg"
    ],
    qrCode: "plant/6"
  },
{
    id: "7",
    family: " Lamiaceae",
    botanicalName: "Oncimum basilicum ",
    commonName: "Sweet Basil ",
    habitGrowthCharacteristics: "Soft annual herb",
    lifeCycle: "Annual",
    identifyingCharacteristics: "Strong aromatic leaves; soft green stems",
    leavesStemsMemristems:
      "Opposite leaves; square stems; apical meristem pinching encourages bushiness",
    flowers: "White to pale pink spikes",
    floweringTimeSeason: "",
    fruitSeed: "Small black seeds",
    seedCollectionTimeSeason: "",
    additionalPropagationRequirements: "",
    trunk: "None",
    rootSystem: "Fibrous, shallow",
    vascularSystem: "Typical herbaceous Lamiaceae structure",
    additionalInformation: "",
    spottingCharacteristics: "",
    familyLevel: "",
    culturalInformationAndUses: "Culinary herb; prefers warmth, full sun, and regular feeding",
    references: "",
    horticulturalLandscapeInfo: "",
    ethnobotanicalInformationUses: "C",
    indigenousSeason: "",
    images: [
      "/assets/plant-7.jpg"
    ],
    qrCode: "plant/7"
  },
{
    id: "8",
    family: "Bignoniaceae",
    botanicalName: "Pandorea pandorana ",
    commonName: "Wonga wonga ",
    habitGrowthCharacteristics: "Glossy pinnate leaves; tubular cream flowers with maroon throat",
    lifeCycle: "Perennial",
    identifyingCharacteristics: "",
    leavesStemsMemristems:
      "Opposite pinnate leaves; twining stems; meristems at nodes",
    flowers: "Bell shaped clusters; fragrant",
    floweringTimeSeason: "",
    fruitSeed: "Woody capsules with winged seeds",
    seedCollectionTimeSeason: "",
    additionalPropagationRequirements: "",
    trunk: "Woody vine stems",
    rootSystem: "Deep, strong; drought tolerant",
    vascularSystem: "Woody climber vascular bundles; efficient water transport",
    additionalInformation: "",
    spottingCharacteristics: "",
    familyLevel: "",
    culturalInformationAndUses: "Excellent for arches and arbours; fast growing; attracts birds and insects.",
    references: "",
    horticulturalLandscapeInfo: "",
    ethnobotanicalInformationUses: "C",
    indigenousSeason: "",
    images: [
      "/assets/plant-8.jpg"
    ],
    qrCode: "plant/8"
  },
{
    id: "9",
    family: "Apiaceae",
    botanicalName: "Petroselinum crispum ",
    commonName: "Curly Leaf Parsley",
    habitGrowthCharacteristics: "Rosette herb",
    lifeCycle: "Biennial (grown as annual)",
    identifyingCharacteristics: "Tight curled leaves; aromatic",
    leavesStemsMemristems:
      "Basal rosette; meristem at crown",
    flowers: "Umbels of small yellow green flowers (2nd year)",
    floweringTimeSeason: "",
    fruitSeed: "Small ribbed seeds",
    seedCollectionTimeSeason: "",
    additionalPropagationRequirements: "",
    trunk: "None",
    rootSystem: "Taproot",
    vascularSystem: "Herbaceous.",
    additionalInformation: "",
    spottingCharacteristics: "",
    familyLevel: "",
    culturalInformationAndUses: "Culinary herb; prefers rich, moist soil",
    references: "",
    horticulturalLandscapeInfo: "",
    ethnobotanicalInformationUses: "C",
    indigenousSeason: "",
    images: [
      "/assets/plant-9.jpg"
    ],
    qrCode: "plant/9"
  },
{
    id: "10",
    family: "Apiaceae",
    botanicalName: "Petroselinum crispum var. neapolitanum",
    commonName: "Flat leaf Parsley",
    habitGrowthCharacteristics: "Upright rosette herb",
    lifeCycle: "Biennial (grown as annual)",
    identifyingCharacteristics: "Flat, deeply divided leaves; stronger flavour",
    leavesStemsMemristems:
      "Basal meristem; upright stems",
    flowers: "Yellow green umbels",
    floweringTimeSeason: "",
    fruitSeed: "Ribbed seeds",
    seedCollectionTimeSeason: "",
    additionalPropagationRequirements: "",
    trunk: "None",
    rootSystem: "Taproot",
    vascularSystem: "Herbaceous.",
    additionalInformation: "",
    spottingCharacteristics: "",
    familyLevel: "",
    culturalInformationAndUses: "Culinary herb; preferred for cooking due to stronger flavour",
    references: "",
    horticulturalLandscapeInfo: "",
    ethnobotanicalInformationUses: "C",
    indigenousSeason: "",
    images: [
      "/assets/plant-10.jpg"
    ],
    qrCode: "plant/10"
  },
{
    id: "11",
    family: "Lamiaceae",
    botanicalName: "Prostanthera rotundifolia ",
    commonName: "Roundleaf Mint Bush",
    habitGrowthCharacteristics: "",
    lifeCycle: "Perennial",
    identifyingCharacteristics: "Round leaves; strong mint aroma; masses of purple flowers",
    leavesStemsMemristems:
      "Opposite leaves; square stems; meristems at nodes",
    flowers: "Purple tubular flowers in spring",
    floweringTimeSeason: "",
    fruitSeed: "Small nutlets",
    seedCollectionTimeSeason: "",
    additionalPropagationRequirements: "",
    trunk: "Woody base",
    rootSystem: "Fibrous; prefers good drainage",
    vascularSystem: "Woody Lamiaceae structure",
    additionalInformation: "",
    spottingCharacteristics: "",
    familyLevel: "",
    culturalInformationAndUses: "Ornamental shrub; attracts pollinators; aromatic foliage",
    references: "",
    horticulturalLandscapeInfo: "",
    ethnobotanicalInformationUses: "C",
    indigenousSeason: "",
    images: [
      "/assets/plant-11.jpg"
    ],
    qrCode: "plant/11"
  },
{
    id: "12",
    family: "Asteraceae",
    botanicalName: "Craspedia globosa",
    commonName: "Billy Buttons",
    habitGrowthCharacteristics: "Tufting perennial with upright flower stems",
    lifeCycle: "Perennial",
    identifyingCharacteristics: "Spherical yellow flower heads on long stems",
    leavesStemsMemristems:
      "Silvergreen basal leaves; stems slender",
    flowers: "Globular composite heads",
    floweringTimeSeason: "Small dry seeds",
    fruitSeed: "",
    seedCollectionTimeSeason: "",
    additionalPropagationRequirements: "",
    trunk: "None",
    rootSystem: "Fibrous",
    vascularSystem: "Herbaceous",
    additionalInformation: "",
    spottingCharacteristics: "",
    familyLevel: "",
    culturalInformationAndUses: "Popular cut flower; drought tolerant; great in native plantings",
    references: "",
    horticulturalLandscapeInfo: "",
    ethnobotanicalInformationUses: "C",
    indigenousSeason: "",
    images: [
      "/assets/plant-12.jpg"
    ],
    qrCode: "plant/12"
  },
{
    id: "13",
    family: "Poaceae",
    botanicalName: "Themeda triandra",
    commonName: "Perennial grass",
    habitGrowthCharacteristics: "Tufting perennial grass",
    lifeCycle: "Perennial",
    identifyingCharacteristics: "Arching leaves; reddishbrown seed heads",
    leavesStemsMemristems:
      "Narrow leaves; basal and intercalary meristems typical of grasses",
    flowers: "Loose panicles with distinctive awns",
    floweringTimeSeason: "Grain-like seeds",
    fruitSeed: "",
    seedCollectionTimeSeason: "",
    additionalPropagationRequirements: "",
    trunk: "None",
    rootSystem: "Deep fibrous roots",
    vascularSystem: "Grass vascular bundles with C4 photosynthesis",
    additionalInformation: "",
    spottingCharacteristics: "",
    familyLevel: "",
    culturalInformationAndUses: "Important native grassland species; used in restoration and ornamental plantings",
    references: "",
    horticulturalLandscapeInfo: "",
    ethnobotanicalInformationUses: "C",
    indigenousSeason: "",
    images: [
      "/assets/plant-13.jpg"
    ],
    qrCode: "plant/13"
  },
{
    id: "14",
    family: "Lamiaceae",
    botanicalName: "Salvia officinalis",
    commonName: "Sage",
    habitGrowthCharacteristics: "Small woody perennial herb",
    lifeCycle: "Perennial",
    identifyingCharacteristics: "Greygreen textured leaves; aromatic",
    leavesStemsMemristems:
      "Opposite leaves; square stems; woody base",
    flowers: "Purpleblue spikes",
    floweringTimeSeason: "",
    fruitSeed: "Nutlets",
    seedCollectionTimeSeason: "",
    additionalPropagationRequirements: "",
    trunk: "Woody lower stems",
    rootSystem: "Fibrous",
    vascularSystem: "Woody herbaceous",
    additionalInformation: "",
    spottingCharacteristics: "",
    familyLevel: "",
    culturalInformationAndUses: "Culinary herb; medicinal uses; prefers dry, sunny conditions",
    references: "",
    horticulturalLandscapeInfo: "",
    ethnobotanicalInformationUses: "C",
    indigenousSeason: "",
    images: [
      "/assets/plant-14.jpg"
    ],
    qrCode: "plant/14"
  },
{
    id: "15",
    family: "Lamiaceae",
    botanicalName: "Salvia rosmarinus",
    commonName: "Rosemary",
    habitGrowthCharacteristics: "Woody shrub",
    lifeCycle: "Perennial",
    identifyingCharacteristics: "Needlelike aromatic leaves; upright or trailing forms",
    leavesStemsMemristems:
      "Opposite leaves; woody stems; apical dominance strong",
    flowers: "Blue to white small flowers",
    floweringTimeSeason: "",
    fruitSeed: "Nutlets",
    seedCollectionTimeSeason: "",
    additionalPropagationRequirements: "",
    trunk: "",
    rootSystem: "Deep, woody roots",
    vascularSystem: "Woody Lamiaceae",
    additionalInformation: "",
    spottingCharacteristics: "",
    familyLevel: "",
    culturalInformationAndUses: "Culinary herb; drought tolerant; used in hedging",
    references: "",
    horticulturalLandscapeInfo: "",
    ethnobotanicalInformationUses: "C",
    indigenousSeason: "",
    images: [
      "/assets/plant-15.jpg"
    ],
    qrCode: "plant/15"
  },
{
    id: "16",
    family: "Lamiaceae",
    botanicalName: "Thymus serpyllum",
    commonName: "Culinary Thyme",
    habitGrowthCharacteristics: "Low matforming groundcover",
    lifeCycle: "Perennial",
    identifyingCharacteristics: "Tiny aromatic leaves; creeping stems",
    leavesStemsMemristems:
      "Opposite leaves; square stems; rooting at nodes",
    flowers: "Pinkpurple clusters",
    floweringTimeSeason: "",
    fruitSeed: "Nutlets",
    seedCollectionTimeSeason: "",
    additionalPropagationRequirements: "",
    trunk: "None",
    rootSystem: "Shallow, fibrous",
    vascularSystem: "Herbaceous",
    additionalInformation: "",
    spottingCharacteristics: "",
    familyLevel: "",
    culturalInformationAndUses: "Culinary and ornamental; great between pavers; attracts bees",
    references: "",
    horticulturalLandscapeInfo: "",
    ethnobotanicalInformationUses: "C",
    indigenousSeason: "",
    images: [
      "/assets/plant-16.jpg"
    ],
    qrCode: "plant/16"
  },
{
    id: "17",
    family: "Violaceae",
    botanicalName: "Viola hederacea",
    commonName: "Native Violet",
    habitGrowthCharacteristics: "Spreading groundcover",
    lifeCycle: "Perennial",
    identifyingCharacteristics: "Heartshaped leaves; purplewhite flowers",
    leavesStemsMemristems:
      "Soft leaves; creeping stems; meristems at nodes",
    flowers: "Small violetlike blooms",
    floweringTimeSeason: "",
    fruitSeed: "Capsules with small seeds",
    seedCollectionTimeSeason: "",
    additionalPropagationRequirements: "",
    trunk: "None",
    rootSystem: "Fibrous, shallow",
    vascularSystem: "Herbaceous",
    additionalInformation: "",
    spottingCharacteristics: "",
    familyLevel: "",
    culturalInformationAndUses: "Shadetolerant groundcover; excellent for understory plantings",
    references: "",
    horticulturalLandscapeInfo: "",
    ethnobotanicalInformationUses: "C",
    indigenousSeason: "",
    images: [
      "/assets/plant-17.jpg"
    ],
    qrCode: "plant/17"
  },
 
];