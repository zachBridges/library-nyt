import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const creds = {
    cardNumber: "",
    pin: "",
    nyt: {
      email: "",
      password: "",
    },
  };

  await page.goto(
    "https://resources.dearbornlibrary.org/login?url=https://ezmyaccount.nytimes.com/grouppass/redir"
  );

  await page.type("input#user", creds.cardNumber);
  await page.type("input#pass", creds.pin);
  await page.click("input[type='submit']");

  // managed challenge - bomb out

  const loginSelector = "[data-testid='login-lnk']";
  await page.waitForSelector(loginSelector);

  await page.evaluate((loginSelector) => {
    console.log(loginSelector);

    const loginLink = document.querySelector("[data-testid='login-lnk']");
    loginLink.setAttribute("target", "_self");
  });

  await page.click(loginSelector);

  await page.waitForSelector("input#email");
  await page.type("input#email", creds.nyt.email);
  await page.click("button[type='submit']");

  await page.waitForSelector("input#password");
  await page.type("input#password", creds.nyt.email);
  await page.click("button[type='submit']");

  await browser.close();
})();
