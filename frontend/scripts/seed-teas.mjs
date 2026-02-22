/**
 * Script pour peupler Strapi avec des categories et des thes.
 * Usage: node scripts/seed-teas.mjs
 *
 * Prerequis: Strapi doit tourner sur http://localhost:1337
 * Le token API est lu depuis le fichier .env
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envContent = readFileSync(resolve(__dirname, "../.env"), "utf-8");
const API_KEY = envContent.match(/STRAPI_API_KEY=(.+)/)?.[1]?.trim();
const STRAPI_URL = "http://localhost:1337";

if (!API_KEY) {
  console.error("STRAPI_API_KEY not found in .env");
  process.exit(1);
}

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

const CATEGORIES = [
  { name: "The Vert", slug: "the-vert", description: "Thes non oxydes aux notes vegetales et herbacees." },
  { name: "The Noir", slug: "the-noir", description: "Thes entierement oxydes, corsee et riches en saveurs." },
  { name: "Oolong", slug: "oolong", description: "Thes semi-oxydes, entre le vert et le noir." },
  { name: "Matcha", slug: "matcha", description: "The vert en poudre pour la ceremonie du the japonaise." },
  { name: "The Fermente", slug: "the-fermente", description: "Thes post-fermentes comme le Pu-erh." },
  { name: "The Blanc", slug: "the-blanc", description: "Thes peu transformes, delicats et subtils." },
];

const TEAS = [
  {
    name: "Sencha Imperial",
    slug: "sencha-imperial",
    shortDescription: "Recolte printaniere aux notes herbacees et umami. Un classique japonais d'une grande finesse.",
    brewingTime: 2,
    temperature: 75,
    dosage: "2g pour 200ml",
    category: "the-vert",
  },
  {
    name: "Darjeeling First Flush",
    slug: "darjeeling-first-flush",
    shortDescription: "Le champagne des thes. Notes florales et muscatees, une legerete remarquable.",
    brewingTime: 3,
    temperature: 90,
    dosage: "2.5g pour 200ml",
    category: "the-noir",
  },
  {
    name: "Tie Guan Yin",
    slug: "tie-guan-yin",
    shortDescription: "Oolong aux aromes d'orchidee et de miel. Infusion apaisante aux reflets dores.",
    brewingTime: 4,
    temperature: 85,
    dosage: "3g pour 150ml",
    category: "oolong",
  },
  {
    name: "Gyokuro",
    slug: "gyokuro",
    shortDescription: "The d'ombre au gout riche et profond, cultive a l'abri du soleil pendant 3 semaines.",
    brewingTime: 2,
    temperature: 55,
    dosage: "3g pour 100ml",
    category: "the-vert",
  },
  {
    name: "Long Jing",
    slug: "long-jing",
    shortDescription: "Le celebre Puits du Dragon. Feuilles plates aux notes de chataigne grillee.",
    brewingTime: 2,
    temperature: 80,
    dosage: "3g pour 200ml",
    category: "the-vert",
  },
  {
    name: "Earl Grey Supreme",
    slug: "earl-grey-supreme",
    shortDescription: "The noir de Ceylan parfume a la bergamote de Calabre, agremente de petales de bleuet.",
    brewingTime: 4,
    temperature: 95,
    dosage: "2.5g pour 250ml",
    category: "the-noir",
  },
  {
    name: "Matcha Ceremonial",
    slug: "matcha-ceremonial",
    shortDescription: "Poudre de the d'exception pour la ceremonie du the. Doux, cremeux, sans amertume.",
    brewingTime: 1,
    temperature: 70,
    dosage: "2g fouettes dans 80ml",
    category: "matcha",
  },
  {
    name: "Pu-erh Vintage",
    slug: "pu-erh-vintage",
    shortDescription: "The post-fermente affine pendant 10 ans. Notes terreuses, boisees et de sous-bois.",
    brewingTime: 5,
    temperature: 95,
    dosage: "5g pour 200ml",
    category: "the-fermente",
  },
  {
    name: "Bai Mu Dan",
    slug: "bai-mu-dan",
    shortDescription: "The blanc delicat aux notes de miel et de fleurs. Douceur et subtilite.",
    brewingTime: 4,
    temperature: 80,
    dosage: "3g pour 200ml",
    category: "the-blanc",
  },
  {
    name: "Genmaicha",
    slug: "genmaicha",
    shortDescription: "The vert japonais au riz souffle grille. Saveur unique et reconfortante.",
    brewingTime: 2,
    temperature: 80,
    dosage: "3g pour 200ml",
    category: "the-vert",
  },
];

async function createCategory(cat) {
  const res = await fetch(`${STRAPI_URL}/api/tea-categories`, {
    method: "POST",
    headers,
    body: JSON.stringify({ data: cat }),
  });
  const data = await res.json();
  if (!res.ok) {
    if (data.error?.message?.includes("unique")) {
      console.log(`  Category "${cat.name}" already exists, skipping.`);
      // Fetch existing
      const existing = await fetch(
        `${STRAPI_URL}/api/tea-categories?filters[slug][$eq]=${cat.slug}`,
        { headers }
      );
      const existingData = await existing.json();
      return existingData.data?.[0] || null;
    }
    console.error(`  Error creating category "${cat.name}":`, data.error?.message);
    return null;
  }
  console.log(`  Created category: ${cat.name} (id: ${data.data.id})`);
  return data.data;
}

async function createTea(tea, categoryDocumentId) {
  const teaData = {
    name: tea.name,
    slug: tea.slug,
    shortDescription: tea.shortDescription,
    brewingTime: tea.brewingTime,
    temperature: tea.temperature,
    dosage: tea.dosage,
  };

  if (categoryDocumentId) {
    teaData.tea_category = categoryDocumentId;
  }

  const res = await fetch(`${STRAPI_URL}/api/teas`, {
    method: "POST",
    headers,
    body: JSON.stringify({ data: teaData }),
  });
  const data = await res.json();
  if (!res.ok) {
    if (data.error?.message?.includes("unique") || data.error?.message?.includes("already")) {
      console.log(`  Tea "${tea.name}" already exists, skipping.`);
      return;
    }
    console.error(`  Error creating tea "${tea.name}":`, data.error?.message || JSON.stringify(data.error));
    return;
  }
  console.log(`  Created tea: ${tea.name} (id: ${data.data.id})`);

  // Publish the tea
  await fetch(`${STRAPI_URL}/api/teas/${data.data.documentId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { ...teaData, tea_category: categoryDocumentId } }),
  });
}

async function main() {
  console.log("Seeding Strapi with tea data...\n");

  // 1. Create categories
  console.log("Creating categories...");
  const categoryMap = {};
  for (const cat of CATEGORIES) {
    const created = await createCategory(cat);
    if (created) {
      categoryMap[cat.slug] = created.documentId;

      // Publish the category
      await fetch(`${STRAPI_URL}/api/tea-categories/${created.documentId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ data: { name: cat.name, slug: cat.slug, description: cat.description } }),
      });
    }
  }

  console.log("\nCreating teas...");
  for (const tea of TEAS) {
    const catDocId = categoryMap[tea.category];
    await createTea(tea, catDocId);
  }

  console.log("\nDone! Your Strapi is now populated with tea data.");
}

main().catch(console.error);
