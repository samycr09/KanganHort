import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, Save, Copy, RotateCcw, Image as ImageIcon } from "lucide-react";
import { BackButton } from "../../components/BackButton";

type PlantBio = {
  id: string;
  family: string;
  botanicalName: string;
  commonName: string;
  habitGrowthCharacteristics: string;
  lifeCycle: string;
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
};

const STORAGE_KEY = "plantbio-template-plant-1";

function nowIso() {
  return new Date().toISOString();
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
}

function makeBlankPlantBio(): PlantBio {
  const now = nowIso();
  return {
    id: "plant/",
    family: "",
    botanicalName: "  ",
    commonName: "",
    habitGrowthCharacteristics: "",
    lifeCycle: "",
    identifyingCharacteristics: "",
    leavesStemsMemristems: "",
    flowers: "",
    floweringTimeSeason: "",
    fruitSeed: "",
    seedCollectionTimeSeason: "",
    additionalPropagationRequirements: "",
    trunk: "",
    rootSystem: "",
    vascularSystem: "",
    additionalInformation: "",
    spottingCharacteristics: "",
    familyLevel: "",
    culturalInformationAndUses: "",
    references: "",
    horticulturalLandscapeInfo: "",
    ethnobotanicalInformationUses: "",
    indigenousSeason: "",
    images: [],
    coverImage: "",
    featured: false,
    studentId: "",
    studentName: "",
    createdAt: now,
    updatedAt: now,
    qrCode: "plant/1",
  };
}

function FieldLabel({ children }: { children: string }) {
  return <div className="text-sm font-semibold text-green-200">{children}</div>;
}

function Input({
  value,
  onChange,
  placeholder = "Input required",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      className="mt-1 w-full rounded-xl bg-white/5 px-3 py-2 text-white outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-green-400/60"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function TextArea({
  value,
  onChange,
  placeholder = "Input required",
  rows = 4,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      className="mt-1 w-full rounded-xl bg-white/5 px-3 py-2 text-white outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-green-400/60"
      value={value}
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl bg-black/40 p-5 backdrop-blur">{children}</div>;
}

export default function PlantBioTemplate() {
  const [plant, setPlant] = useState<PlantBio>(() => makeBlankPlantBio());
  const [status, setStatus] = useState<string>("");

  // Load saved draft
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setPlant(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const json = useMemo(() => JSON.stringify(plant, null, 2), [plant]);

  function update<K extends keyof PlantBio>(key: K, value: PlantBio[K]) {
    setPlant((p) => ({ ...p, [key]: value, updatedAt: nowIso() }));
  }

  function saveDraft() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plant));
    setStatus("Saved draft in this browser.");
    setTimeout(() => setStatus(""), 2500);
  }

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(json);
      setStatus("Copied PlantBio JSON to clipboard.");
      setTimeout(() => setStatus(""), 2500);
    } catch {
      setStatus("Copy blocked by browser. You can select/copy from the preview box.");
      setTimeout(() => setStatus(""), 3500);
    }
  }

  function reset() {
    const fresh = makeBlankPlantBio();
    setPlant(fresh);
    localStorage.removeItem(STORAGE_KEY);
    setStatus("Reset template.");
    setTimeout(() => setStatus(""), 2000);
  }

  // Images: one URL per line (optional)
  const imagesText = plant.images.join("\n");
  function setImagesFromText(v: string) {
    const arr = v
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    update("images", arr);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-black">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between p-4">
        <div className="flex items-center gap-2 text-white">
          <Leaf className="h-6 w-6" />
          <span className="font-bold">Kangan Horticulture</span>
        </div>

        <nav className="flex items-center gap-4 text-white/80">
          <Link className="hover:text-white" to="/">Home</Link>
          <Link className="hover:text-white" to="/indigenous-seasons">Indigenous Seasons</Link>
          <Link className="hover:text-white" to="/about">About</Link>
        </nav>
      </header>

      <div className="mx-auto w-full max-w-5xl px-4 pb-12">
        <div className="flex flex-wrap items-center justify-between gap-3 py-3">
          <BackButton />

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={saveDraft}
              className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-white hover:bg-white/20"
            >
              <Save className="h-4 w-4" /> Save draft
            </button>

            <button
              onClick={copyJson}
              className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-white hover:bg-white/20"
            >
              <Copy className="h-4 w-4" /> Copy JSON
            </button>

            <button
              onClick={reset}
              className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-white hover:bg-white/20"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>
        </div>

        {status && (
          <div className="mb-4 rounded-xl bg-white/10 p-3 text-white">
            {status}
          </div>
        )}

        <Card>
          <div className="text-2xl font-bold text-white">Plant Bio Template (Editable)</div>
          <div className="mt-2 text-white/70">
            Fill in each field. Leave blank if unknown. Upload an image if you want.
          </div>
        </Card>

        {/* ===== Image Upload + Preview ===== */}
        <div className="mt-6">
          <Card>
            <div className="flex items-center gap-2 text-white">
              <ImageIcon className="h-5 w-5" />
              <div className="text-lg font-bold">Upload Image</div>
            </div>

            <div className="mt-3 text-white/70 text-sm">
              Choose a file from your computer. This is saved into your draft in this browser.
            </div>

            <input
              type="file"
              accept="image/*"
              className="mt-4 block w-full text-white"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const dataUrl = await fileToDataUrl(file);

                setPlant((prev) => ({
                  ...prev,
                  coverImage: dataUrl,
                  images: [dataUrl, ...(prev.images?.slice(1) ?? [])],
                  updatedAt: nowIso(),
                }));
              }}
            />

            {plant.coverImage ? (
              <img
                src={plant.coverImage}
                alt="Plant preview"
                className="mt-4 h-64 w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="mt-4 rounded-2xl bg-white/5 p-6 text-white/70">
                Image preview: <span className="text-white">Input required</span>
              </div>
            )}
          </Card>
        </div>

        {/* ===== Fields ===== */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card>
            <FieldLabel>Plant ID (use plant/1 format)</FieldLabel>
            <Input value={plant.id} onChange={(v) => update("id", v)} placeholder="plant/1" />

            <div className="mt-3">
              <FieldLabel>QR Code</FieldLabel>
              <Input value={plant.qrCode} onChange={(v) => update("qrCode", v)} placeholder="plant/1" />
            </div>

            <div className="mt-3 flex items-center gap-3">
              <input
                id="featured"
                type="checkbox"
                className="h-4 w-4"
                checked={!!plant.featured}
                onChange={(e) => update("featured", e.target.checked)}
              />
              <label htmlFor="featured" className="text-white">
                Featured?
              </label>
            </div>
          </Card>

          <Card>
            <FieldLabel>Common Name</FieldLabel>
            <Input value={plant.commonName} onChange={(v) => update("commonName", v)} />

            <div className="mt-3">
              <FieldLabel>Botanical Name</FieldLabel>
              <Input value={plant.botanicalName} onChange={(v) => update("botanicalName", v)} />
            </div>

            <div className="mt-3">
              <FieldLabel>Family</FieldLabel>
              <Input value={plant.family} onChange={(v) => update("family", v)} />
            </div>
          </Card>

          <Card>
            <FieldLabel>Habit / Growth Characteristics</FieldLabel>
            <TextArea
              value={plant.habitGrowthCharacteristics}
              onChange={(v) => update("habitGrowthCharacteristics", v)}
              rows={4}
            />
          </Card>

          <Card>
            <FieldLabel>Life Cycle</FieldLabel>
            <Input value={plant.lifeCycle} onChange={(v) => update("lifeCycle", v)} />

            <div className="mt-3">
              <FieldLabel>Identifying Characteristics</FieldLabel>
              <TextArea
                value={plant.identifyingCharacteristics}
                onChange={(v) => update("identifyingCharacteristics", v)}
                rows={4}
              />
            </div>
          </Card>

          <Card>
            <FieldLabel>Leaves / Stems / Meristems</FieldLabel>
            <TextArea
              value={plant.leavesStemsMemristems}
              onChange={(v) => update("leavesStemsMemristems", v)}
              rows={6}
            />
          </Card>

          <Card>
            <FieldLabel>Flowers</FieldLabel>
            <TextArea value={plant.flowers} onChange={(v) => update("flowers", v)} rows={3} />

            <div className="mt-3">
              <FieldLabel>Flowering Time / Season</FieldLabel>
              <Input value={plant.floweringTimeSeason} onChange={(v) => update("floweringTimeSeason", v)} />
            </div>
          </Card>

          <Card>
            <FieldLabel>Fruit / Seed</FieldLabel>
            <TextArea value={plant.fruitSeed} onChange={(v) => update("fruitSeed", v)} rows={3} />

            <div className="mt-3">
              <FieldLabel>Seed Collection Time / Season</FieldLabel>
              <Input value={plant.seedCollectionTimeSeason} onChange={(v) => update("seedCollectionTimeSeason", v)} />
            </div>
          </Card>

          <Card>
            <FieldLabel>Additional Propagation Requirements</FieldLabel>
            <TextArea
              value={plant.additionalPropagationRequirements}
              onChange={(v) => update("additionalPropagationRequirements", v)}
              rows={4}
            />
          </Card>

          <Card>
            <FieldLabel>Trunk</FieldLabel>
            <TextArea value={plant.trunk} onChange={(v) => update("trunk", v)} rows={3} />

            <div className="mt-3">
              <FieldLabel>Root System</FieldLabel>
              <TextArea value={plant.rootSystem} onChange={(v) => update("rootSystem", v)} rows={3} />
            </div>

            <div className="mt-3">
              <FieldLabel>Vascular System</FieldLabel>
              <TextArea value={plant.vascularSystem} onChange={(v) => update("vascularSystem", v)} rows={3} />
            </div>
          </Card>

          <Card>
            <FieldLabel>Additional Information</FieldLabel>
            <TextArea value={plant.additionalInformation} onChange={(v) => update("additionalInformation", v)} rows={4} />

            <div className="mt-3">
              <FieldLabel>Spotting Characteristics</FieldLabel>
              <TextArea value={plant.spottingCharacteristics} onChange={(v) => update("spottingCharacteristics", v)} rows={3} />
            </div>
          </Card>

          <Card>
            <FieldLabel>Family Level</FieldLabel>
            <Input value={plant.familyLevel} onChange={(v) => update("familyLevel", v)} />

            <div className="mt-3">
              <FieldLabel>Cultural Information and Uses</FieldLabel>
              <TextArea value={plant.culturalInformationAndUses} onChange={(v) => update("culturalInformationAndUses", v)} rows={4} />
            </div>
          </Card>

          <Card>
            <FieldLabel>References</FieldLabel>
            <TextArea value={plant.references} onChange={(v) => update("references", v)} rows={3} />

            <div className="mt-3">
              <FieldLabel>Horticultural / Landscape Info</FieldLabel>
              <TextArea value={plant.horticulturalLandscapeInfo} onChange={(v) => update("horticulturalLandscapeInfo", v)} rows={4} />
            </div>

            <div className="mt-3">
              <FieldLabel>Ethnobotanical Uses</FieldLabel>
              <TextArea value={plant.ethnobotanicalInformationUses} onChange={(v) => update("ethnobotanicalInformationUses", v)} rows={4} />
            </div>
          </Card>

          <Card>
            <FieldLabel>Indigenous Season (name only)</FieldLabel>
            <Input value={plant.indigenousSeason} onChange={(v) => update("indigenousSeason", v)} />
          </Card>

          <Card>
            <FieldLabel>Student ID</FieldLabel>
            <Input value={plant.studentId} onChange={(v) => update("studentId", v)} />

            <div className="mt-3">
              <FieldLabel>Student Name</FieldLabel>
              <Input value={plant.studentName} onChange={(v) => update("studentName", v)} />
            </div>

            <div className="mt-3">
              <FieldLabel>Created At (ISO)</FieldLabel>
              <Input value={plant.createdAt} onChange={(v) => update("createdAt", v)} placeholder={nowIso()} />
            </div>

            <div className="mt-3">
              <FieldLabel>Updated At (ISO)</FieldLabel>
              <Input value={plant.updatedAt} onChange={(v) => update("updatedAt", v)} placeholder={nowIso()} />
            </div>
          </Card>

          <Card>
            <FieldLabel>Images (optional — one URL per line)</FieldLabel>
            <TextArea value={imagesText} onChange={setImagesFromText} rows={6} placeholder="Input required" />

            <div className="mt-3 text-white/70 text-sm">
              Tip: you can leave this blank if you uploaded an image above.
            </div>
          </Card>
        </div>

        {/* ===== JSON Preview ===== */}
        <div className="mt-6">
          <Card>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-lg font-bold text-white">PlantBio JSON Preview</div>
                <div className="text-white/70 text-sm">
                  Copy this and paste into your data file later if you want.
                </div>
              </div>
              <button
                onClick={copyJson}
                className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-white hover:bg-white/20"
              >
                <Copy className="h-4 w-4" /> Copy JSON
              </button>
            </div>

            <pre className="mt-4 overflow-auto rounded-xl bg-black/40 p-4 text-sm text-white/90 ring-1 ring-white/10">
{json}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  );
}