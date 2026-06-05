import type { Locator, Page } from "@playwright/test";

class LoginPage {
  readonly page: Page;
  readonly userName: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly invalidCredentailsError: Locator;

  constructor(page: Page) {
    this.page = page;

    this.userName = page.locator('input[name="username"]');

    this.password = page.locator('input[name="password"]');

    // Login button locator
    this.loginButton = page.getByRole("button", { name: "Login" });

    //invalid password validator
    this.invalidCredentailsError = page.getByRole("alert");
  }

  /**
   * To open OrangeHRM URL in browser
   */
async gotoOrangeHrm() {
  await this.page.goto(process.env.BASE_URL!, {
    timeout: 120000,
    waitUntil: "networkidle",
  });

  console.log("Current URL:", this.page.url());
  console.log("Title:", await this.page.title());

  await this.page.screenshot({
    path: "github-page.png",
    fullPage: true,
  });
}

  /**
   * To Login into OrangeHRM Application
   * @param username
   * @param password
   */
  async loginOrangeHrm(username: string, password: string) {
    // Fill username
    await this.userName.waitFor({
      state: "visible",
      timeout: 120000,
    });
    await this.userName.fill(username, {
      timeout: 120000,
    });
    await this.password.waitFor({
      state: "visible",
      timeout: 120000,
    });
    // Fill password
    await this.password.fill(password, {
      timeout: 120000,
    });

    /*  // Click login and wait for dashboard URL
    await Promise.all([
      this.page.waitForURL("**/ /**", {
        //dashboard
        timeout: 150000,
      }), */

    await this.loginButton.click({
      timeout: 120000,
    });
    // ]);
  }
}

export default LoginPage;
