export interface CategoryDef {
  slug: string;
  label: string;
  matchers: string[]; // lowercased keywords to match against title/description
}

function toSlug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const CATEGORY_DEFS: CategoryDef[] = [
  // Product Categories
  { slug: "area-light", label: "Area Light", matchers: ["area light"] },
  { slug: "wall-pack", label: "Wall Pack", matchers: ["wall pack"] },
  { slug: "canopy", label: "Canopy", matchers: ["canopy", "gas station canopy", "garage canopy"] },
  { slug: "flood-light", label: "Flood Light", matchers: ["flood light"] },
  { slug: "frame-light", label: "Frame Light", matchers: ["frame light"] },
  { slug: "backlit-panel", label: "Backlit Panel", matchers: ["backlit panel"] },
  { slug: "troffer-light", label: "Troffer Light", matchers: ["troffer light"] },
  { slug: "ceiling-light", label: "Ceiling Light", matchers: ["ceiling light"] },
  {
    slug: "down-light",
    label: "Down Light",
    matchers: ["down light", "slim down light", "recessed down light", "retrofit down light", "retrofit down ligjt"],
  },
  { slug: "ufo-high-bay", label: "UFO High Bay", matchers: ["ufo high bay"] },
  { slug: "linear-high-bay", label: "Linear High Bay", matchers: ["linear high bay"] },
  { slug: "linear-strip", label: "Linear Strip", matchers: ["linear strip"] },
  {
    slug: "up-and-down-linear-slot-light",
    label: "Up and Down Linear Slot Light",
    matchers: ["up and down linear slot light", "linear slot light", "up and down strip light"],
  },
  { slug: "vapor-tight", label: "Vapor Tight", matchers: ["vapor tight"] },
  {
    slug: "tube-series",
    label: "Tube Series",
    matchers: ["tube series", "type b", "fa8", "r17d"],
  },
  {
    slug: "integrated-tube",
    label: "Integrated Tube",
    matchers: ["integrated tube", "moisture proof tube", "flat integrated tube"],
  },
  { slug: "bollards", label: "Bollards", matchers: ["bollards", "bollaeds"] },

  // Accessory Categories
  { slug: "emergency-driver", label: "Emergency Driver", matchers: ["emergency driver"] },
  { slug: "sensor", label: "Sensor", matchers: ["sensor", "day light sensor", "infrared sensor", "microwave sensor"] },
  { slug: "mount-bracket", label: "Mount Bracket", matchers: ["mount bracket", "typea mount bracket", "typeb mount bracket", "typec mount bracket", "typed mount bracket", "typeh mount bracket"] },
  { slug: "surface-mount-kit", label: "Surface Mount Kit", matchers: ["surface mount kit"] },
  { slug: "ufo-reflector", label: "UFO Reflector", matchers: ["ufo reflector", "pc reflector"] },
  { slug: "remote-control", label: "Remote Control", matchers: ["remote control"] },
  { slug: "transformer", label: "Transformer", matchers: ["transformer", "stepdown transformer"] },
  { slug: "suspending-rope", label: "Suspending Rope", matchers: ["suspending rope"] },
  { slug: "junction-box", label: "Junction Box", matchers: ["junction box"] },
  { slug: "adapter", label: "Adapter", matchers: ["adapter"] },
  { slug: "connector", label: "Connector", matchers: ["connector", "linear light connector"] },
];

export function normalizeCategorySlug(input: string): string {
  const slug = toSlug(input);
  
  // Handle specific JSON category name variations
  const categoryMappings: Record<string, string> = {
    "flood-light": "flood-light", // "FLOOD LIGHT" -> flood-light
    "slim-down-light": "down-light", // "Slim Down Light" -> down-light  
    "up-and-down-linear-slot-light": "up-and-down-linear-slot-light", // case variations
    "integrated-tubes": "integrated-tube", // "Integrated Tubes" -> integrated-tube
    "bollaeds": "bollards", // "Bollaeds" -> bollards
    // Accessory category mappings
    "emergency-driver": "emergency-driver",
    "sensor": "sensor",
    "mount-bracket": "mount-bracket",
    "surface-mount-kit": "surface-mount-kit",
    "ufo-reflector": "ufo-reflector",
    "remote-control": "remote-control",
    "transformer": "transformer",
    "suspending-rope": "suspending-rope",
    "junction-box": "junction-box",
    "adapter": "adapter",
    "connector": "connector",
  };
  
  // Check direct mapping first
  if (categoryMappings[slug]) {
    return categoryMappings[slug];
  }
  
  // Try to find by exact slug or label match
  const found = CATEGORY_DEFS.find((c) => c.slug === slug || toSlug(c.label) === slug);
  return found ? found.slug : slug;
}

export function findCategoryByTitle(title: string, description?: string | null): CategoryDef | null {
  const hay = `${title} ${description ?? ""}`.toLowerCase();
  for (const def of CATEGORY_DEFS) {
    if (def.matchers.some((m) => hay.includes(m))) return def;
  }
  return null;
}


