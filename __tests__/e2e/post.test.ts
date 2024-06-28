import { test } from '@playwright/test';

test.describe.configure({
	timeout: 1000000,
});

test('should be able to create a post', async ({ page }) => {
	await page.goto('http://localhost:3000/login');
	await page.fill('input[name="email"]', 'test@test.com');
	await page.fill('input[name="password"]', 'test1234');
	await page.click('button[name="submit"]');
	await page.waitForURL('http://localhost:3000/');
	await page.goto('http://localhost:3000/profile');
	await page.waitForURL('http://localhost:3000/profile');

	await page.click('button[name="createPost"]');
	await page.waitForSelector('text=Add post');

	await page.fill('input[name="title"]', 'Test post');
	await page.fill('textarea[name="description"]', 'Test description');
	await page.setInputFiles('input[type="file"]', './__tests__/e2e/assets/test_post.jpg');
	// const fileChooserPromise = page.waitForEvent('filechooser');
	// await page.click('input[type="file"]');

	// let fileChooser = await fileChooserPromise;
	// await fileChooser.setFiles('./__tests__/e2e/assets/test_post.jpg');
	// // sleep for 1 second to allow the image to be uploaded
	// await waitFor(
	// 	() => {
	// 		return;
	// 	},
	// 	{ timeout: 1000 }
	// );

	// await page.click('input[type="file"]');

	// fileChooser = await page.waitForEvent('filechooser');
	// await fileChooser.setFiles('./__tests__/e2e/assets/test_post.jpg');
	// await waitFor(
	// 	() => {
	// 		return;
	// 	},
	// 	{ timeout: 1000 }
	// );

	// sleep for 1 second to allow the image to be uploaded

	await page.click('button[name="submit"]');
	await page.waitForSelector('text=Post created successfully');
});
