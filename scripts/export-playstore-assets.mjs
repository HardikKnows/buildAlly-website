import { mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { chromium } from "playwright";

const BASE_URL = process.env.PLAYSTORE_ASSETS_URL || "http://localhost:3000";
const OUTPUT_DIR = resolve(process.cwd(), "playstore-assets");

function fileSafeId(id) {
  return id
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

await mkdir(OUTPUT_DIR, { recursive: true });

const browser = await chromium.launch({
  headless: true,
});

const page = await browser.newPage({
  viewport: { width: 1440, height: 1440 },
  deviceScaleFactor: 3,
});

try {
  await page.goto(`${BASE_URL}/playstore-assets`, {
    waitUntil: "networkidle",
  });

  await page.addStyleTag({
    content: `
      html,
      body,
      #__next {
        background: #FFFFFF !important;
      }
    `,
  });

  const targets = await page.locator("[data-export], [id^='export-']").elementHandles();

  if (targets.length === 0) {
    throw new Error("No export targets found. Add data-export or an id starting with export-.");
  }

  for (const [index, target] of targets.entries()) {
    const id = await target.evaluate((element) => element.id);

    if (!id) {
      throw new Error("Every export target must have an id for file naming.");
    }

    const fileName = `${String(index + 1).padStart(2, "0")}-${fileSafeId(id)}.png`;

    await target.scrollIntoViewIfNeeded();

    await target.screenshot({
      path: join(OUTPUT_DIR, fileName),
      type: "png",
      omitBackground: false,
    });

    console.log(`Exported ${fileName}`);
  }
} finally {
  await browser.close();
}
