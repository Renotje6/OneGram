import { expect, test } from '@playwright/test';

test('Should be able to login', async ({ page }) => {
	await page.goto('http://localhost:3000/login');

	await page.fill('input[name="email"]', 'test@test.com');
	await page.fill('input[name="password"]', 'test1234');
	await page.click('button[name="submit"]');
	await page.waitForURL('http://localhost:3000/');
	await expect(page).toHaveURL('http://localhost:3000/');
});

test('Error should be shown when invalid credentials are used', async ({ page }) => {
	await page.goto('http://localhost:3000/login');

	await page.fill('input[name="email"]', 'test@test.com');
	await page.fill('input[name="password"]', 'invalidpassword');
	await page.click('button[name="submit"]');
	await page.waitForSelector('text=Invalid credentials');
});
