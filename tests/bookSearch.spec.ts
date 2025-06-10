import {expect, test} from '@playwright/test';

test('search book and redirect to listing with results', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const searchBox = page.getByPlaceholder('Search ...');
    await searchBox.waitFor();
    await searchBox.click();
    await searchBox.fill('harry potter');
    await searchBox.press('Enter');

    await expect(page).toHaveURL(/search/);
    const books = page.locator('[data-testid="book-card"]');
    await expect(books.first()).toBeVisible({ timeout: 5000 });
    const count = await books.count();
    expect(count).toBeGreaterThan(0);
});

test('quick search dropdown and result', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const searchBox = page.getByPlaceholder('Search ...');
    await searchBox.click();
    await searchBox.fill('shining');

    const dropdown = page.locator('ul[class*=quickSearchDropdown]');
    await expect(dropdown).toBeVisible({ timeout: 3000 });

    const items = dropdown.locator('li');
    await expect(items.first()).toBeVisible();
});
