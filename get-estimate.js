const puppeteer = require('puppeteer');

const findPrices = async (page) => {
  const date = await page.$eval('.secondary-info', (n) => n.textContent.split(" on ")[1].replace(",","")).catch(err => "?")
  const expand = await page.waitForSelector("div.historical-chart-entry", { timeout: 500 }).catch(err => null);
  if (expand == null) return "?, ?, " + date;
  await expand.click({ offset: { x: 83.0625, y: 10.5} });
  const saleMarker = await page.waitForSelector(".SaleMarker:last-of-type", { timeout: 500 }).catch(err => null);
  if (saleMarker == null) return "?, ?, " + date;
  const box = await saleMarker.boundingBox();
  await page.mouse.move(box.x + box.width/2, box.y + box.height/2);
  const popup = await page.waitForSelector("div.values > div.price", { timeout: 500 }).catch(err => null);
  if (popup == null) return "?, ?, " + date;
  const prices = await popup.evaluate(n => n.textContent);
  const cleanPrices = prices.replaceAll(",", "").replaceAll(/(.)\$/g, "$1, $");
  return cleanPrices + ", " + date
};

(async (urls) => {
  const browser = await puppeteer.launch();//{ headless: false, slowMo: 200 });
  const page = await browser.newPage();
  await page.setViewport({"width":1144,"height":1000});
  await page.setDefaultNavigationTimeout(0);
  
  for (let url of urls) {
    await page.goto(url);
    console.log(url + ", " + (await findPrices(page)));
  }
	await browser.close();
})( [ /* e.g. "https://bluetail.com/some-house" */ ]);
