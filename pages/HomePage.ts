import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly moreInfoLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h1');
    this.moreInfoLink = page.getByRole('link', { name: 'More information...' });
  }

  async navigate() {
    await this.page.goto('https://example.com');
  }

  async getHeadingText() {
    return this.heading.textContent();
  }
}
