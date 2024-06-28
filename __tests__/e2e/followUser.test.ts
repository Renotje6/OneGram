import { expect, test } from '@playwright/test';

test.describe.configure({
	timeout: 1000000,
});

test('should be able to follow a user', async ({ page }) => {
	await page.goto('http://localhost:3000/login');
	await page.waitForURL('http://localhost:3000/login');
	await page.getByPlaceholder('Email').click();
	await page.getByPlaceholder('Email').fill('test@test.com');
	await page.getByPlaceholder('Password').click();
	await page.getByPlaceholder('Password').fill('test1234');
	await page.getByRole('button', { name: 'Login' }).click();
	await page.waitForURL('http://localhost:3000/');
	await page.getByRole('button', { name: 'SEARCH' }).click();
	await page.waitForURL('http://localhost:3000/search');
	await expect(page.getByRole('main')).toContainText('test2');
	await page.locator('a').filter({ hasText: /test2/ }).locator('button').click();
	await expect(page.getByRole('main')).toContainText('test2');
	await page.getByPlaceholder('Search users...').click();
	await page.getByPlaceholder('Search users...').fill('test2');
	await page.locator('button').filter({ hasText: 'Unfollow' }).click();
	await expect(page.getByRole('main')).toContainText('test2');
});
