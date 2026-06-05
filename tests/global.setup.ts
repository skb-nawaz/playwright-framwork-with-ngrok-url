import { test } from "../fixtures/common-fixture";
import { expect } from "@playwright/test";

test("global setup for auto login", async ({
  page,
  loginPageFixture,
  commonUtilsFixture,
  dashBoardFixture,
}) => {
  const encryptedUserName = process.env.USER_NAME ?? "";
  const encryptedPassword = process.env.PASSWORD ?? "";

  const userName = commonUtilsFixture.decryptData(encryptedUserName);
  const password = commonUtilsFixture.decryptData(encryptedPassword);

  await loginPageFixture.gotoOrangeHrm();

  await loginPageFixture.loginOrangeHrm(userName, password);

  await expect(dashBoardFixture.dashBoardText).toBeVisible();

  await page.context().storageState({
    path: "./PlaywrightAuthFile/.auth/auth.json",
  });
});
