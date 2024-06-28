import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

const randomNumber = Math.floor(Math.random() * 1000000);

test('Should be able to register', async ({ page }) => {
	await page.goto('http://localhost:3000/register');

	await page.fill('input[name="name"]', `John Doe ${randomNumber}`);
	await page.fill('input[name="email"]', `john.doe${randomNumber}@mail.com`);
	await page.fill('input[name="password"]', 'password');
	await page.click('button[name="submit"]');

	await page.waitForURL('http://localhost:3000/');
	await expect(page).toHaveURL('http://localhost:3000/');
});

test('Error should be shown when email is already in use', async ({ page }) => {
	await page.goto('http://localhost:3000/register');

	await page.fill('input[name="name"]', 'John Doe');
	await page.fill('input[name="email"]', `john.doe${randomNumber}@mail.com`);
	await page.fill('input[name="password"]', 'password');

	await page.click('button[name="submit"]');
	await page.waitForSelector('text=Email already in use');
});
