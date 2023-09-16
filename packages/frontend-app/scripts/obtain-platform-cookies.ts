import assert from "node:assert";
import fs from "node:fs";

import { chromium } from "playwright";

import { Platform } from "../src/utils/platform";

import type { Cookie } from "playwright";

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

function setCookies(platform: Platform, cookie: Cookie[]) {
  let oldCookies: Record<Platform, Cookie[]> | Record<string, undefined>;

  try {
    oldCookies = JSON.parse(
      fs.readFileSync(`${__dirname}/admin-auth-platform-cookies.json`, {
        encoding: "utf8",
      }),
    );
  } catch {
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

async function sleep(duration: number | undefined = 500): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

async function obtainSpotifyCookies() {
  // Setup
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to main page and click on the login button
  await page.goto("http://spotify.com");
  await page.getByTestId("login-button").click();
  await page.waitForURL(/accounts\.spotify\.com\/[a-z]{2,3}\/login/);

  // Fill the login form
  await page.getByTestId("login-username").fill(process.env.SPOTIFY_USERNAME!);
  await page.getByTestId("login-password").fill(process.env.SPOTIFY_PASSWORD!);
  await page.getByTestId("login-button").click();

  // After log in, we get redirected to the main page
  // hence we extract the cookies here
  await sleep(2000);
  assert.doesNotMatch(page.url(), /accounts\.spotify\.com\/[a-z]{2,3}\/login/);
  await page.reload();
  await sleep(300);
  assert.doesNotMatch(page.url(), /accounts\.spotify\.com\/[a-z]{2,3}\/login/);
  const cookies = await context.cookies();
  setCookies(Platform.Spotify, cookies);

  // Tear down
  await context.close();
  await browser.close();
}

async function obtainDeezerCookies() {
  // Setup
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to the login page
  await page.goto("https://www.deezer.com/us/login");
  await page.waitForURL(/deezer\.com\/us\/login/);
  await page.getByTestId("gdpr-btn-accept-all").click();

  // Fill the login form
  await page.getByLabel("Email address").fill(process.env.DEEZER_USERNAME!);
  await page.getByLabel("Password").fill(process.env.DEEZER_PASSWORD!);
  await page.getByRole("button", { name: /log in/i }).click();

  // After log in, we get redirected to the main page
  // hence we extract the cookies here
  await sleep(2000);
  await page.waitForURL(/deezer\.com\/us\/$/);
  const cookies = await context.cookies();
  setCookies(Platform.Deezer, cookies);

  // Tear down
  await context.close();
  await browser.close();
}

async function obtainPlatformCookies() {
  try {
    console.log(
      "================ START PROCESS TO OBTAIN PLATFORM COOKIES ==============",
    );

    console.log(
      "=============== OBTAINING COOKIES FOR SPOTIFY =================",
    );
    await obtainSpotifyCookies();
    console.log(
      "=============== COOKIES FOR SPOTIFY OBTAINED =================",
    );

    console.log(
      "=============== OBTAINING COOKIES FOR DEEZER =================",
    );
    await obtainDeezerCookies();
    console.log(
      "=============== COOKIES FOR DEEZER OBTAINED =================",
    );

    console.log(
      "================ ENDED PROCESS TO OBTAIN PLATFORM COOKIES ==============",
    );
  } catch (error) {
    console.log("================ Error occurred ================");
    console.log(error);
  }
}

obtainPlatformCookies();
