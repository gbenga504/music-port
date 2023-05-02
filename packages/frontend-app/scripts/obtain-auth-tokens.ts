import { chromium } from "playwright";
import fs from "fs";
import assert from "node:assert";

import { Platform } from "../src/utils/platform";

import type { Cookie } from "playwright";

/**
 * ===========================================================
 * RETRIEVE AUTH TOKEN FOR STREAMING PLATFORMS
 * ===========================================================
 * We want to retrieve the admin auth tokens for the streaming platforms
 * and save them. This way, we act as third parties when converting playlists
 */

function getCookies(platform: Platform): Cookie[] {
  const cookies = JSON.parse(
    fs.readFileSync(`${__dirname}/admin-auth-platform-cookies.json`, {
      encoding: "utf-8",
    }),
  );

  return cookies[platform];
}

async function obtainSpotifyAuthToken() {
  // Setup
  const browser = await chromium.launch();
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
  assert(
    (await locator.textContent()) === "Token generated",
    "Cannot find 'Token generated' text in body",
  );

  // Tear down
  await context.close();
  await browser.close();
}

async function obtainDeezerAuthToken() {
  // Setup
  const browser = await chromium.launch();
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

  await page.waitForURL(/musicport.io/);
  const locator = page.locator("body");
  assert(
    (await locator.textContent()) === "Token generated",
    "Cannot find 'Token generated' text in body",
  );

  // Tear down
  await context.close();
  await browser.close();
}

async function obtainAuthToken() {
  try {
    console.log(
      "================ START PROCESS TO OBTAIN AUTH TOKENS ==============",
    );
    console.log(
      "=============== OBTAINING TOKEN FOR SPOTIFY =================",
    );
    await obtainSpotifyAuthToken();
    console.log("=============== TOKEN FOR SPOTIFY OBTAINED =================");
    console.log("=============== OBTAINING TOKEN FOR DEEZER =================");
    await obtainDeezerAuthToken();
    console.log("=============== TOKEN FOR DEEZER OBTAINED =================");
    console.log(
      "================ ENDED PROCESS TO OBTAIN AUTH TOKENS ==============",
    );
  } catch (error) {
    console.log("================ Error occurred ================");
    console.log(error);
  }
}

obtainAuthToken();
