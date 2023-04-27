import { test, expect } from "@playwright/test";
import fs from "fs";

import type { Cookie } from "@playwright/test";

import { Platform } from "../src/utils/platform";

function setCookies(platform: Platform, cookie: Cookie[]) {
  let oldCookies: Record<Platform, Cookie[]> | Record<string, undefined>;

  try {
    oldCookies = JSON.parse(
      fs.readFileSync(`${__dirname}/admin-auth-platform-cookies.json`, {
        encoding: "utf-8",
      }),
    );
  } catch (error) {
    // Then its possible the file does not exist
    // We just assign empty object to oldCookie
    oldCookies = {};
  }

  const newCookies = { ...oldCookies, [platform]: cookie };
  fs.writeFileSync(
    `${__dirname}/admin-auth-platform-cookies.json`,
    JSON.stringify(newCookies),
  );
}

function getCookies(platform: Platform): Cookie[] {
  const cookies = JSON.parse(
    fs.readFileSync(`${__dirname}/admin-auth-platform-cookies.json`, {
      encoding: "utf-8",
    }),
  );

  return cookies[platform];
}

/**
 * ===========================================================
 * COOKIE EXTRACTION FOR STREAMING PLATFORMS
 * ===========================================================
 * Before we can obtain an admin auth token for any of our streaming platforms,
 * we need login on the streaming platform and obtain the necessary cookies.
 * These cookies will be used when obtaining the auth token since we will need
 * to be logged in.
 *
 * Also this code is extremely brittle. Since a change in the streaming platforms
 * selector breaks it
 *
 * N:B - We don't need to always login, so we might need to skip some
 * login tests
 */
test.skip("obtain cookies for spotify", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to main page and click on the login button
  await page.goto("http://spotify.com");
  await page.getByTestId("login-button").click();
  await page.waitForURL(/accounts\.spotify\.com\/de\/login/);

  // Fill the login form
  await page.getByTestId("login-username").fill("daveanifowoshe@gmail.com");
  await page.getByTestId("login-password").fill("ajf7utu0DBR*pza0mqt");
  await page.getByTestId("login-button").click();

  // After log in, we get redirected to the main page
  // hence we extract the cookies here
  await expect(page).not.toHaveURL(/accounts\.spotify\.com\/de\/login/);
  await page.reload();
  await expect(page).not.toHaveURL(/accounts\.spotify\.com\/de\/login/);
  const cookies = await context.cookies();
  setCookies(Platform.Spotify, cookies);

  await context.close();
});

test.skip("obtain cookies for deezer", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to the login page
  await page.goto("https://www.deezer.com/us/login");
  await page.waitForURL(/deezer\.com\/us\/login/);
  await page.getByTestId("gdpr-btn-accept-all").click();

  // Fill the login form
  await page.getByLabel("Email address").fill("daveanifowoshe@gmail.com");
  await page.getByLabel("Password").fill("wrj8krv3RDW!pmy-kxg");
  await page.getByRole("button", { name: /Log in/i }).click();

  // After log in, we get redirected to the main page
  // hence we extract the cookies here
  await page.waitForURL(/deezer\.com\/us\/$/);
  const cookies = await context.cookies();
  setCookies(Platform.Deezer, cookies);

  await context.close();
});

/**
 * ===========================================================
 * RETRIEVE AUTH TOKEN FOR STREAMING PLATFORMS
 * ===========================================================
 * We want to retrieve the admin auth tokens for the streaming platforms
 * and save them. This way, we act as third parties when converting playlists
 */

test("obtain auth token for spotify", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to the spotify main page and set the cookies
  await page.goto("https://open.spotify.com/");
  await page.waitForURL(/spotify/);
  await context.addCookies(getCookies(Platform.Spotify));
  await page.reload();
  await page.waitForURL(/spotify/);

  // Access the admin auth token generator route so we can save the token in DB
  await page.goto(
    `${process.env.FRONTEND_BASE_URL}/admin-auth-token-generator/spotify`,
  );
  const locator = page.locator("body");
  await expect(locator).toHaveText(/Token generated/);

  await context.close();
});

test("obtain auth token for deezer", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to the deezer main page and set the cookies
  await page.goto("https://www.deezer.com/us/");
  await page.waitForURL(/deezer/);
  await context.addCookies(getCookies(Platform.Deezer));
  await page.reload();
  await page.waitForURL(/deezer/);

  // Provide necessary permissions when redirected to the deezer permissions page
  await page.goto(
    `${process.env.FRONTEND_BASE_URL}/admin-auth-token-generator/deezer`,
  );
  await page.waitForURL(/deezer/);
  await page.getByRole("button", { name: /Continue/i }).click();

  await expect(page).not.toHaveURL(/deezer\.com/);
  const locator = page.locator("body");
  await expect(locator).toHaveText(/Token generated/);

  await context.close();
});
