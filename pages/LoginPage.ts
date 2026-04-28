import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly twoFactorDialog: Locator;
  readonly captchaWidget: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('#loginButton');
    this.forgotPasswordLink = page.getByRole('link').filter({ hasText: /forgot/i });
    this.twoFactorDialog = page.locator('text=/two.factor|verification code|otp/i');
    this.captchaWidget = page.locator('.captcha iframe, .captcha');
  }

  async navigate() {
    await this.page.goto('/login');
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
