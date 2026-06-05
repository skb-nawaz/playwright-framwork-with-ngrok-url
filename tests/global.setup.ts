import { test } from "../fixtures/common-fixture";
import { expect } from "@playwright/test";

test("global setup for auto login", async ({
  page,
  loginPageFixture,
  commonUtilsFixture,
  dashBoardFixture,
}) => {
  console.log("========== ENVIRONMENT DEBUG ==========");

  console.log("Base URL:", process.env.BASE_URL);
  console.log("Running on CI:", process.env.CI);

  console.log("USER_NAME exists:", !!process.env.USER_NAME);
  console.log("PASSWORD exists:", !!process.env.PASSWORD);
  console.log("SECRET_KEY exists:", !!process.env.SECRET_KEY);

  const userName = process.env.USER_NAME ? process.env.USER_NAME : "";
  const password = process.env.PASSWORD ? process.env.PASSWORD : "";

  console.log("========== ENCRYPTED VALUES ==========");
  console.log("Encrypted USER_NAME:", userName);
  console.log("Encrypted PASSWORD:", password);

  const dec_userName_data = commonUtilsFixture.decryptData(userName);
  const dec_password_data = commonUtilsFixture.decryptData(password);

  console.log("========== DECRYPTED VALUES ==========");
  console.log("Decrypted USER_NAME:", dec_userName_data);
  console.log("Decrypted PASSWORD:", dec_password_data);

  console.log("SECRET_KEY:", process.env.SECRET_KEY);

  await loginPageFixture.gotoOrangeHrm();

  console.log("========== PAGE DEBUG ==========");
  console.log("Current URL:", page.url());
  console.log("Page Title:", await page.title());

  console.log(
    "Username input count:",
    await page.locator('input[name="username"]').count(),
  );

  console.log(
    "Password input count:",
    await page.locator('input[name="password"]').count(),
  );

  await loginPageFixture.loginOrangeHrm(dec_userName_data, dec_password_data);

  console.log("========== AFTER LOGIN METHOD ==========");

  console.log(
    "Username field value:",
    await page.locator('input[name="username"]').inputValue(),
  );

  console.log(
    "Password field value:",
    await page.locator('input[name="password"]').inputValue(),
  );

  await page.screenshot({
    path: "after-login.png",
    fullPage: true,
  });

  console.log("After Login URL:", page.url());

  const invalidMessage = page.locator(".oxd-alert-content-text");

  if (await invalidMessage.isVisible().catch(() => false)) {
    console.log("LOGIN ERROR:", await invalidMessage.textContent());
  }

  await expect(dashBoardFixture.dashBoardText).toBeVisible();

  await page.context().storageState({
    path: "./PlaywrightAuthFile/.auth/auth.json",
  });
});
