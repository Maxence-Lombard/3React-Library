import {expect, test} from '@playwright/test';

test('last changes listing', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByRole('heading', { name: /last updates/i })).toBeVisible();

    const changes = page.locator('[data-testid="change-item"]');
    await expect(changes.first()).toBeVisible();
    const count = await changes.count();
    expect(count).toBeGreaterThan(0);
});