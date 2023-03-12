import { test, expect } from "@playwright/test";
import fs from "fs";
import cookies from "./cookie.json";

// test("obtain token for spotify", async ({ browser }) => {
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   await page.goto("http://localhost:9999/token-generator/spotify");
//   await page.waitForURL(/spotify/);

//   //Fill the login form on spotify
//   await page.getByTestId("login-username").fill("daveanifowoshe@gmail.com");
//   await page.getByTestId("login-password").fill("ajf7utu0DBR*pza0mqt");
//   await page.getByTestId("login-button").click();

//   //Check that token was generated
//   const locator = page.locator("body");
//   await expect(locator).toHaveText(/Token generated/);

//   //Go to spotify again and copy cookie
//   await page.goto("https://open.spotify.com/");
//   await page.waitForURL(/spotify/);
//   const cookies = await context.cookies();
//   fs.writeFileSync(`${__dirname}/cookie.json`, JSON.stringify(cookies));

//   await context.close();
// });

test("get spotify token", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  // Listen for all console logs
  page.on("console", (msg) => console.log(msg.text()));

  // Go on spotify and set cookies
  await page.goto("https://open.spotify.com/");
  await page.waitForURL(/spotify/);
  //@ts-ignore
  await context.addCookies(cookies);

  // Go to token generator and obtain token
  await page.goto("http://localhost:9999/token-generator/spotify");
  const locator = page.locator("body");
  await expect(locator).toHaveText(/Token generated/);

  await context.close();
});
