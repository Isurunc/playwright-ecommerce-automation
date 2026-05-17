// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries: 1, 
  timeout: 40 * 1000, // override default 30 secs timeout for each test
  expect: {
    timeout: 30 * 1000, // timeout for expect/assertions
  },
  reporter: 'html',

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        ignoreHTTPSErrors: true, // proceed unsafe websites
        permissions: ['geolocation'], // allow location permissions
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
        //viewport: { width: 800, height: 420 },
       //viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'off',
        trace: 'on',
        ...devices['ihone 14'],
      },
    },
  ],
});
