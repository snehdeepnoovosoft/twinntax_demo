import { test, expect } from '../../fixtures/testFixtures';
import { getUiCredentials } from '../../utils/credentials';
import { getRequiredUrlEnv } from '../../utils/env';
import { Logger } from '../../utils/logger';

test.describe('Login UI', () => {
  test('should allow user to submit login details from the login page', async ({ page, loginPage }) => {
    const credentials = getUiCredentials();
    const baseUrl = getRequiredUrlEnv('BASE_URL', 'https://app.dev.twinntax.com');

    Logger.info('Opening the login page');
    await loginPage.navigate();

    await expect(loginPage.forgotPasswordLink).toBeVisible();

    const responsePromise = page.waitForResponse(
      (response) => response.request().method() === 'POST' && /login|auth|signin/i.test(response.url()),
      { timeout: 15000 }
    );

    Logger.info('Submitting login details');
    await loginPage.login(credentials.email, credentials.password);

    const loginResponse = await responsePromise;
    const status = loginResponse.status();

    Logger.info(`Observed login API response with status ${status}`);
    expect(status).toBeLessThan(500);

    await page.waitForLoadState('networkidle');

    const currentUrl = page.url();
    const captchaVisible = await loginPage.captchaWidget.isVisible().catch(() => false);
    const twoFactorVisible = await loginPage.twoFactorDialog.isVisible().catch(() => false);

    expect(
      currentUrl !== `${baseUrl}/login` ||
        captchaVisible ||
        twoFactorVisible ||
        status === 200 ||
        status === 201
    ).toBeTruthy();
  });
});
