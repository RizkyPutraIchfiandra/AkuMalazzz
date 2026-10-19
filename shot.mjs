import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:4173", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

// scroll bertahap agar IntersectionObserver reveal kepicu
const height = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < height; y += 600) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(220);
}
await page.waitForTimeout(800);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(600);

await page.screenshot({ path: "docs/preview-full.png", fullPage: true });

// viewport 1280x630 buat og:image / banner README
await page.setViewportSize({ width: 1280, height: 630 });
await page.waitForTimeout(400);
await page.screenshot({ path: "public/og.png" });

await browser.close();
console.log("done, scrollHeight:", height);
