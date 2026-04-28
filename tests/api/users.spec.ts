import { test, expect } from '@playwright/test';
import { getRequiredUrlEnv } from '../../utils/env';

test.describe('Users API', () => {
  test('should fetch user list successfully', async ({ request }) => {
    const apiBaseUrl = getRequiredUrlEnv('API_BASE_URL', 'https://jsonplaceholder.typicode.com');
    const response = await request.get(`${apiBaseUrl}/users`);

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBeGreaterThan(0);
  });
});
