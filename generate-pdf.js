const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();

  // Use the cv-doc.html (document format)
  const htmlPath = path.resolve("cv-doc.html");
  await page.goto("file://" + htmlPath, { waitUntil: "networkidle0", timeout: 30000 });

  // Hide toolbar for PDF
  await page.evaluate(() => {
    const toolbar = document.querySelector(".toolbar");
    if (toolbar) toolbar.style.display = "none";
    const wrap = document.querySelector(".page-wrap");
    if (wrap) { wrap.style.padding = "0"; wrap.style.background = "#fff"; }
    document.body.style.background = "#fff";
  });

  const pdfBuffer = await page.pdf({
    path: "Jay_Kaneriya_CV_2026.pdf",
    format: "A4",
    printBackground: true,
    margin: { top: "0", bottom: "0", left: "0", right: "0" },
  });

  await browser.close();
  const size = fs.statSync("Jay_Kaneriya_CV_2026.pdf").size;
  console.log("SUCCESS: Jay_Kaneriya_CV_2026.pdf created (" + Math.round(size/1024) + " KB)");
})().catch(e => { console.error("ERROR:", e.message); process.exit(1); });
