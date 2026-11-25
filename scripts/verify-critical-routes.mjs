import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const manifestPath = join(process.cwd(), ".next", "app-path-routes-manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const generatedRoutes = new Set(Object.values(manifest));

const criticalRoutes = [
  "/",
  "/workshop",
  "/workshop/thank-you",
  "/api/workshop/register",
  "/api/register",
  "/api/fbf-registration",
  "/thank-you",
  "/vip",
  "/dashboard",
  "/dashboard/calendar.ics",
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
const rootPage = readFileSync(join(process.cwd(), "app", "page.tsx"), "utf8");
const thankYouPage = readFileSync(join(process.cwd(), "app", "thank-you", "page.tsx"), "utf8");
const vipUpsellPage = readFileSync(join(process.cwd(), "app", "vip", "VIPUpsellPage.tsx"), "utf8");
const shareMasterclassSection = readFileSync(join(process.cwd(), "app", "components", "ShareMasterclassSection.tsx"), "utf8");
const dashboardPage = readFileSync(join(process.cwd(), "app", "dashboard", "page.tsx"), "utf8");
const dashboardShareButton = readFileSync(join(process.cwd(), "app", "dashboard", "ShareMasterclassButton.tsx"), "utf8");
const workbookThankYouPage = readFileSync(join(process.cwd(), "app", "workbook-thank-you", "page.tsx"), "utf8");
const rootLayout = readFileSync(join(process.cwd(), "app", "layout.tsx"), "utf8");
const clarityTracker = readFileSync(join(process.cwd(), "app", "components", "MicrosoftClarity.tsx"), "utf8");

const requiredWorkshopMarkers = ["Build Without Borrowing", "WorkshopRegistration", "OPM vs ?"];
const requiredWorkshopMetadata = ["https://www.kingdomintel.com/workshop", "Build Without Borrowing", "robots: { index: false, follow: false }"];

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

const displaySource = readFileSync(join(process.cwd(), "app", "lib", "event-time.ts"), "utf8");
for (const instant of ['2027-01-05T18:00:00Z', '2027-01-06T18:00:00Z', '2027-01-07T18:00:00Z', '2027-01-07T01:00:00Z', '2027-01-08T01:00:00Z']) {
  if (!displaySource.includes(instant)) throw new Error(`Missing canonical event instant: ${instant}`);
}
const homeCandidates = ['.next/server/app/index.html', '.vercel/output/static/index.html'];
const homePath = homeCandidates.map(p => join(process.cwd(), p)).find(p => existsSync(p));
if (!homePath) throw new Error('Missing built homepage in Next or Vercel output');
const homeHtml = readFileSync(homePath, 'utf8');
for (const marker of ['January 5–7, 2027', '12:00 PM CST', 'data-time-zone="America/Chicago"']) {
  if (!homeHtml.includes(marker)) throw new Error(`Missing deterministic server fallback: ${marker}`);
}

const requiredRegistrationPageMarkers = [
  '<EventTime variant="dates" />',
  '<EventTime />',
  "/api/register",
  "SAVE MY SEAT",
];

const missingRegistrationPageMarkers = requiredRegistrationPageMarkers.filter((marker) => !rootPage.includes(marker));

if (missingRegistrationPageMarkers.length > 0 || /July\s*28|August\s*18/i.test(rootPage)) {
  const missingRegistrationPageContent = missingRegistrationPageMarkers.length
    ? ` Missing markers: ${missingRegistrationPageMarkers.join(", ")}`
    : "";
  console.error(`Registration page content check failed.${missingRegistrationPageContent}`);
  process.exit(1);
}

const requiredThankYouMarkers = [
  "1194072208",
  "KIM Final Registration Welcome",
  "A message from Staci",
  "Share the masterclass with a friend.",
  "Masterclass share link",
  "data-copy-share-link",
];

const thankYouContent = `${thankYouPage}\n${shareMasterclassSection}`;
const missingThankYouMarkers = requiredThankYouMarkers.filter((marker) => !thankYouContent.includes(marker));

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
  '<EventTime />',
  "VIP",
  "action-date",
  '<EventTime event="vip" />',
  "ShareMasterclassButton",
  "Join the Community",
  "Priority dashboard workflow",
  "<AddToCalendar />",
  "Your seat is ready. Join us live for three days of Kingdom-centered strategy",
  "Enter the Live Room",
  "Say hello, meet the other business owners in the room",
];

const requiredDashboardShareMarkers = [
  "Share the masterclass",
  "Copy Blurb",
  "https://www.kingdomintel.com/",
  "Larry and Staci Wallace are hosting the free Kingdom Intelligence Masterclass",
];

const missingDashboardMarkers = requiredDashboardMarkers.filter((marker) => !dashboardPage.includes(marker));
const missingDashboardShareMarkers = requiredDashboardShareMarkers.filter((marker) => !dashboardShareButton.includes(marker));

if (missingDashboardMarkers.length > 0 || missingDashboardShareMarkers.length > 0) {
  const missingDashboardContent = [...missingDashboardMarkers, ...missingDashboardShareMarkers];
  console.error(`Dashboard content check failed. Missing markers: ${missingDashboardContent.join(", ")}`);
  process.exit(1);
}

const requiredWorkbookThankYouMarkers = [
  'const DASHBOARD_URL = "/dashboard"',
  "Open the event dashboard",
  "Your workbook is ready.",
];

const missingWorkbookThankYouMarkers = requiredWorkbookThankYouMarkers.filter((marker) => !workbookThankYouPage.includes(marker));

if (missingWorkbookThankYouMarkers.length > 0 || workbookThankYouPage.includes("vault.fbfmastery.com/join")) {
  const missingWorkbookThankYouContent = missingWorkbookThankYouMarkers.length
    ? ` Missing markers: ${missingWorkbookThankYouMarkers.join(", ")}`
    : "";
  console.error(`Workbook thank-you content check failed.${missingWorkbookThankYouContent}`);
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
