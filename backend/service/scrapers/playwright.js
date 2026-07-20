import { chromium } from "playwright";

export const getFromPlaywright = async (link) => {
    const browser = await chromium.launch({
        headless: true
    });

    const page = await browser.newPage();

    try {
        await page.goto(link, {
            waitUntil: "networkidle",
            timeout: 10000
        });

        return (await page.title()).trim();
    } finally {
        await browser.close();
    }
};