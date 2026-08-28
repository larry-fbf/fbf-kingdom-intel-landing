import { readFileSync } from "node:fs";
import { join } from "node:path";

const manifestPath = join(process.cwd(), ".next", "app-path-routes-manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const generatedRoutes = new Set(Object.values(manifest));

const criticalRoutes = [
  "/",
  "/workshop",
  "/api/workshop/register",
  "/api/register",
  "/thank-you",
  "/vip",
  "/dashboard",
  "/workbook",
  "/workbook-thank-you",
];

const missingRoutes = criticalRoutes.filter((route) => !generatedRoutes.has(route));

if (missingRoutes.length > 0) {
  console.error(`Critical route check failed. Missing: ${missingRoutes.join(", ")}`);
  process.exit(1);
}

const workshopSource = readFileSync(join(process.cwd(), "app", "workshop", "WorkshopLanding.tsx"), "utf8");
const workshopPage = readFileSync(join(process.cwd(), "app", "workshop", "page.tsx"), "utf8");
const thankYouPage = readFileSync(join(process.cwd(), "app", "thank-you", "page.tsx"), "utf8");
const vipUpsellPage = readFileSync(join(process.cwd(), "app", "vip", "VIPUpsellPage.tsx"), "utf8");
const dashboardPage = readFileSync(join(process.cwd(), "app", "dashboard", "page.tsx"), "utf8");
const rootLayout = readFileSync(join(process.cwd(), "app", "layout.tsx"), "utf8");
const clarityTracker = readFileSync(join(process.cwd(), "app", "components", "MicrosoftClarity.tsx"), "utf8");

const requiredWorkshopMarkers = [
  "Free Kingdom Intelligence Workshop",
  "Tuesday, August 18",
  "/api/workshop/register",
  "Called But Stuck?",
];

const requiredWorkshopMetadata = [
  "https://www.kingdomintel.com/workshop",
  "https://www.kingdomintel.com/images/kingdom-intel-workshop-og.jpg",
  "Called but Stuck? | Kingdom Intel Workshop | Aug 18th 11am CT",
  "width: 1200",
  "height: 630",
];

const missingMarkers = requiredWorkshopMarkers.filter((marker) => !workshopSource.includes(marker) && !workshopPage.includes(marker));

if (missingMarkers.length > 0) {
  console.error(`Workshop content check failed. Missing markers: ${missingMarkers.join(", ")}`);
  process.exit(1);
}

if (/export\s+\{\s*default\s*\}\s+from\s+["']\.\.\/page["']/.test(workshopPage)) {
  console.error("Workshop content check failed. /workshop must not alias the root masterclass page.");
  process.exit(1);
}

const missingMetadata = requiredWorkshopMetadata.filter((marker) => !workshopPage.includes(marker));

if (missingMetadata.length > 0) {
  console.error(`Workshop metadata check failed. Missing markers: ${missingMetadata.join(", ")}`);
  process.exit(1);
}

const requiredThankYouMarkers = [
  "1194072208",
  "KIM Final Registration Welcome",
  "A message from Staci",
];

const missingThankYouMarkers = requiredThankYouMarkers.filter((marker) => !thankYouPage.includes(marker));

if (missingThankYouMarkers.length > 0) {
  console.error(`Thank-you content check failed. Missing markers: ${missingThankYouMarkers.join(", ")}`);
  process.exit(1);
}

const requiredVipMarkers = [
  "1222112622",
  "VIP 2026 (Evergreen)",
  "Yes, I want VIP for $97",
];

const missingVipMarkers = requiredVipMarkers.filter((marker) => !vipUpsellPage.includes(marker));

if (missingVipMarkers.length > 0) {
  console.error(`VIP content check failed. Missing markers: ${missingVipMarkers.join(", ")}`);
  process.exit(1);
}

const requiredDashboardMarkers = [
  "Event Dashboard",
  "Challenge",
  "September 15-17 | 12 PM Central",
  "VIP",
  "September 16-17 | 7 PM Central",
];

const missingDashboardMarkers = requiredDashboardMarkers.filter((marker) => !dashboardPage.includes(marker));

if (missingDashboardMarkers.length > 0) {
  console.error(`Dashboard content check failed. Missing markers: ${missingDashboardMarkers.join(", ")}`);
  process.exit(1);
}

if (/<meta\s+(property|name)=["'](?:og:|twitter:)/.test(rootLayout)) {
  console.error("Metadata check failed. Open Graph/Twitter tags must use Next metadata, not manual root layout tags.");
  process.exit(1);
}

const requiredClarityMarkers = [
  "y6e5kqw1k1",
  "y6e6rbfrug",
  "NEXT_PUBLIC_CLARITY_FBFCHALLENGE_ID",
  "https://www.clarity.ms/tag/",
  "microsoft-clarity-",
];

const missingClarityMarkers = requiredClarityMarkers.filter((marker) => !clarityTracker.includes(marker));

if (!rootLayout.includes("MicrosoftClarity")) {
  console.error("Clarity check failed. Root layout must render the MicrosoftClarity tracker.");
  process.exit(1);
}

if (missingClarityMarkers.length > 0) {
  console.error(`Clarity check failed. Missing markers: ${missingClarityMarkers.join(", ")}`);
  process.exit(1);
}

if (workshopSource.includes("KINGDOM</div>") || workshopSource.includes("MASTERCLASS")) {
  console.error("Workshop content check failed. /workshop appears to contain masterclass hero copy.");
  process.exit(1);
}

console.log(`Critical route and workshop content check passed: ${criticalRoutes.join(", ")}`);
