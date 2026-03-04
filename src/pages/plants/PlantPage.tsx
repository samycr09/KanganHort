// C:/Users/kym/react-vite-Hort2.6/src/pages/plants/PlantPage.tsx
import { SITE_NAME } from "../../config/site";
import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Leaf, QrCode, ChevronLeft, ChevronRight } from "lucide-react";
import { BackButton } from "../../components/BackButton";

import { demoPlants } from "../../data/PlantData";
import type { PlantBio } from "../../data/PlantData";

// Extract a number from ids like "plant/1", "PLANT-001", "PLANT/1"
function getPlantNumber(id: string): number | null {
  const m = String(id).match(/(\d+)/);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : null;
}

// Fallback to public image convention
function publicAssetForPlantNumber(n: number): string {
  // expects: C:/Users/kym/react-vite-Hort2.6/public/assets/plant-1.jpg
  return `/assets/plant-${n}.jpg`;
}

function safeStr(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function normalizePlantBio(p: PlantBio): PlantBio {
  //const now = new Date().toISOString();
  return {
    id: safeStr(p.id) || "plant/1",
    family: safeStr(p.family),
    botanicalName: safeStr(p.botanicalName),
    commonName: safeStr(p.commonName),
    habitGrowthCharacteristics: safeStr(p.habitGrowthCharacteristics),
    lifeCycle: safeStr(p.lifeCycle),
    identifyingCharacteristics: safeStr(p.identifyingCharacteristics),
    leavesStemsMemristems: safeStr(p.leavesStemsMemristems),
    flowers: safeStr(p.flowers),
    floweringTimeSeason: safeStr(p.floweringTimeSeason),
    fruitSeed: safeStr(p.fruitSeed),
    seedCollectionTimeSeason: safeStr(p.seedCollectionTimeSeason),
    additionalPropagationRequirements: safeStr(p.additionalPropagationRequirements),
    trunk: safeStr(p.trunk),
    rootSystem: safeStr(p.rootSystem),
    vascularSystem: safeStr(p.vascularSystem),
    additionalInformation: safeStr(p.additionalInformation),
    spottingCharacteristics: safeStr(p.spottingCharacteristics),
    familyLevel: safeStr(p.familyLevel),
    culturalInformationAndUses: safeStr(p.culturalInformationAndUses),
    references: safeStr(p.references),
    horticulturalLandscapeInfo: safeStr(p.horticulturalLandscapeInfo),
    ethnobotanicalInformationUses: safeStr(p.ethnobotanicalInformationUses),
    indigenousSeason: safeStr(p.indigenousSeason),
    images: Array.isArray(p.images) ? p.images : [],
    coverImage: safeStr(p.coverImage),
    featured: !!p.featured,
    /*studentId: safeStr(p.studentId),
    studentName: safeStr(p.studentName),
    createdAt: safeStr(p.createdAt) || now,
    updatedAt: safeStr(p.updatedAt) || now,*/
    qrCode: safeStr(p.qrCode) || safeStr(p.id) || "plant/1",
  };
}

function Field({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const display = value?.trim() ? value : "";
  return (
    <div className="rounded-2xl bg-black/40 p-4 ring-1 ring-white/10 backdrop-blur">
      <div className="text-sm font-semibold text-green-200">{label}</div>
      <div className="mt-1 whitespace-pre-wrap text-white/90">
        {display || <span className="text-white/40">—</span>}
      </div>
    </div>
  );
}

export function PlantPage() {
  const { id } = useParams(); // /plant/:id
  const navigate = useNavigate();

  // Sort plants in numeric order (so next/prev is consistent)
  const orderedPlants = useMemo(() => {
    return [...demoPlants].sort((a, b) => {
      const an = getPlantNumber(a.id) ?? 0;
      const bn = getPlantNumber(b.id) ?? 0;
      return an - bn;
    });
  }, []);

  const routeNumber = Number(id ?? "1");

  const currentIndex = useMemo(() => {
    const idx = orderedPlants.findIndex(
      (p) => (getPlantNumber(p.id) ?? 0) === routeNumber
    );
    return idx >= 0 ? idx : 0;
  }, [orderedPlants, routeNumber]);

  const currentRaw = orderedPlants[currentIndex] ?? orderedPlants[0];
  const plant = normalizePlantBio(currentRaw);

  const plantNumber = getPlantNumber(plant.id) ?? currentIndex + 1;

  // Featured image priority:
  // 1) coverImage (if set)
  // 2) first of images[]
  // 3) fallback to /public/assets/plant-N.jpg
  const featureImage =
    (plant.coverImage && plant.coverImage.trim()) ||
    (plant.images?.[0] && plant.images[0].trim()) ||
    publicAssetForPlantNumber(plantNumber);

  function goToIndex(nextIndex: number) {
    const p = orderedPlants[nextIndex];
    const n = getPlantNumber(p.id) ?? nextIndex + 1;
    navigate(`/plant/${n}`);
  }

  function prev() {
    goToIndex((currentIndex - 1 + orderedPlants.length) % orderedPlants.length);
  }

  function next() {
    goToIndex((currentIndex + 1) % orderedPlants.length);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-950 via-green-900 to-black">
      {/* faded background image */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={featureImage}
          alt=""
          className="h-full w-full object-cover opacity-10 blur-sm"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Header */}
      <header className="relative mx-auto flex w-full max-w-5xl items-center justify-between p-4">
        <div className="flex items-center gap-2 text-white">
          <Leaf className="h-6 w-6" />
          <span className="font-bold">{SITE_NAME}</span>
        </div>

        <nav className="flex items-center gap-4 text-white/80">
          <Link className="hover:text-white" to="/">Home</Link>
          <Link className="hover:text-white" to="/indigenous-seasons">Indigenous Seasons</Link>
          <Link className="hover:text-white" to="/about">About</Link>
        </nav>
      </header>

      <div className="relative mx-auto w-full max-w-5xl px-4 pb-10">
        {/* Top controls */}
        <div className="flex items-center justify-between gap-3 py-3">
          <BackButton />

          <div className="flex items-center gap-2 text-white/80">
            <button
              onClick={prev}
              className="rounded-xl bg-white/10 px-3 py-2 hover:bg-white/20"
              aria-label="Previous plant"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="text-sm">
              Plant {currentIndex + 1} of {orderedPlants.length}
            </div>

            <button
              onClick={next}
              className="rounded-xl bg-white/10 px-3 py-2 hover:bg-white/20"
              aria-label="Next plant"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-white/80">
            <QrCode className="h-5 w-5" />
            <span className="text-sm">QR: {plant.qrCode}</span>
          </div>
        </div>

        {/* Hero image */}
        <img
          src={featureImage}
          alt={plant.commonName || "Plant image"}
          className="mb-6 h-72 w-full rounded-3xl object-cover ring-1 ring-white/10"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />

        {/* Title */}
        <div className="mb-6 rounded-3xl bg-black/40 p-6 ring-1 ring-white/10 backdrop-blur">
          <div className="text-sm text-white/60">Plant ID</div>
          <div className="text-xl font-bold text-white">{plant.id}</div>
          <div className="mt-2 text-white/80">
            <span className="font-semibold text-white">{plant.commonName}</span>{" "}
            {plant.botanicalName ? <span className="text-white/70">— {plant.botanicalName}</span> : null}
          </div>
        </div>

        {/* Fields */}
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Family" value={plant.family} />
          <Field label="Life Cycle" value={plant.lifeCycle} />

          <Field label="Habit / Growth Characteristics" value={plant.habitGrowthCharacteristics} />
          <Field label="Identifying Characteristics" value={plant.identifyingCharacteristics} />

          <Field label="Leaves / Stems / Meristems" value={plant.leavesStemsMemristems} />
          <Field label="Flowers" value={plant.flowers} />

          <Field label="Flowering Time / Season" value={plant.floweringTimeSeason} />
          <Field label="Fruit / Seed" value={plant.fruitSeed} />

          <Field label="Seed Collection Time / Season" value={plant.seedCollectionTimeSeason} />
          <Field label="Additional Propagation Requirements" value={plant.additionalPropagationRequirements} />

          <Field label="Trunk" value={plant.trunk} />
          <Field label="Root System" value={plant.rootSystem} />

          <Field label="Vascular System" value={plant.vascularSystem} />
          <Field label="Additional Information" value={plant.additionalInformation} />

          <Field label="Spotting Characteristics" value={plant.spottingCharacteristics} />
          <Field label="Family Level" value={plant.familyLevel} />

          <Field label="Cultural Information and Uses" value={plant.culturalInformationAndUses} />
          <Field label="References" value={plant.references} />

          <Field label="Horticultural / Landscape Info" value={plant.horticulturalLandscapeInfo} />
          <Field label="Ethnobotanical Information / Uses" value={plant.ethnobotanicalInformationUses} />

          <Field label="Indigenous Season" value={plant.indigenousSeason} />
          {/* <Field label="Student" value={`${plant.studentName}${plant.studentId ? ` (${plant.studentId})` : ""}`.trim()} /> 

          <Field label="Created At" value={plant.createdAt} />
          <Field label="Updated At" value={plant.updatedAt} /> */}
        </div>
      </div>
    </div>
  );
}