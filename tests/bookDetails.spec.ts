import {expect, test} from '@playwright/test';

test('book details', async ({ page }) => {
    await page.goto('http://localhost:5173/search');
    const searchBox = page.getByPlaceholder('Search ...');
    await searchBox.fill('harry potter');

    const firstBook = page.locator('[data-testid="book-card"]').first();
    await expect(firstBook).toBeVisible({ timeout: 5000 });
    await firstBook.click();

    await expect(page.getByRole('heading', { name: /Harry Potter and the Order of the Phoenix/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /J\. K\. Rowling/i })).toBeVisible();
    await expect(page.getByText(/description/i)).toBeVisible();
    await expect(page.getByText(/Subjects?/i)).toBeVisible();
    const wikipediaSection = page.getByText(/Wikipedia description/i);
    if (await wikipediaSection.count()) {
        await expect(wikipediaSection).toBeVisible();
    }
});