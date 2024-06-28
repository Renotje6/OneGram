import { expect, test } from '@playwright/test';

test.describe.configure({
	timeout: 1000000,
});

test('Post a test post', async ({ page }) => {
	const randomNumber = Math.floor(Math.random() * 1000000);

	await page.goto('http://localhost:3000/login');
	await page.waitForURL('http://localhost:3000/login');
	await page.getByPlaceholder('Email').click();
	await page.getByPlaceholder('Email').fill('test@test.com');
	await page.getByPlaceholder('Password').click();
	await page.getByPlaceholder('Password').fill('test1234');
	await page.getByRole('button', { name: 'Login' }).click();
	await page.getByRole('button', { name: 'Profile' }).click();
	await page.locator('button[name="createPost"]').click();
	await page.getByLabel('Title').click();
	await page.getByLabel('Title').fill(`test post ${randomNumber}`);
	await page.getByLabel('Description').click();
	await page.getByLabel('Description').fill('This is a test post');

	await page.locator('input[name="image"]').click();
	await page.locator('input[name="image"]').setInputFiles('./__tests__/e2e/assets/test_post.jpg');
	await page.locator('input[name="image"]').click();
	await page.locator('input[name="image"]').setInputFiles('./__tests__/e2e/assets/test_post.jpg');

	page.once('dialog', (dialog) => {
		console.log(`Dialog message: ${dialog.message()}`);
		dialog.dismiss().catch(() => {});
	});
	await page.getByRole('button', { name: 'Create' }).click();
	await page.goto('http://localhost:3000/profile');
	await expect(page.getByRole('img', { name: `test post ${randomNumber}` })).toBeVisible();
});
