import { test, expect } from '../../fixtures/testFixtures';
import { Logger } from '../../utils/logger';

test.describe('Home page', () => {
  test('should load the example home page', async ({ homePage }) => {
    Logger.info('Navigating to the home page');

    await homePage.navigate();

    await expect(homePage.heading).toContainText('Example Domain');
  });
});
