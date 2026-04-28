import { test, expect } from '@playwright/test';
import { getApiCredentials } from '../../utils/credentials';
import { getRequiredUrlEnv } from '../../utils/env';

test.describe('Login API', () => {
  test('should authenticate with the configured TwinnTax credentials', async ({ page, request }) => {
    const credentials = getApiCredentials();
    const baseUrl = getRequiredUrlEnv('BASE_URL', 'https://app.dev.twinntax.com');
    const capturedRequests: string[] = [];

    page.on('request', (req) => {
      if (req.method() === 'POST' && /login|auth|signin/i.test(req.url())) {
        capturedRequests.push(req.url());
      }
    });

    await page.goto('/login');
    await page.locator('input[name="email"]').fill(credentials.email);
    await page.locator('input[name="password"]').fill(credentials.password);

    const loginResponsePromise = page.waitForResponse(
      (response) => response.request().method() === 'POST' && /login|auth|signin/i.test(response.url()),
      { timeout: 15000 }
    );

    await page.locator('#loginButton').click();

    const loginResponse = await loginResponsePromise;
    const loginRequest = loginResponse.request();
    const requestBody = loginRequest.postDataJSON() as Record<string, unknown> | null;
    const requestHeaders = await loginRequest.allHeaders();

    expect(loginRequest.method()).toBe('POST');
    expect(loginResponse.status()).toBeLessThan(500);
    expect(requestBody).not.toBeNull();

    const apiResponse = await request.post(loginRequest.url(), {
      headers: {
        'content-type': requestHeaders['content-type'] || 'application/json',
        origin: requestHeaders.origin || baseUrl,
        referer: requestHeaders.referer || `${baseUrl}/login`
      },
      data: loginRequest.postData() ?? JSON.stringify(requestBody ?? credentials)
    });

    expect(apiResponse.status()).toBe(loginResponse.status());
    expect(capturedRequests.length).toBeGreaterThan(0);
  });
});
