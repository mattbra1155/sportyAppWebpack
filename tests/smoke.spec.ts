import { test, expect } from '@playwright/test';

const leaguesFixture = {
  leagues: [
    { idLeague: '4328', strLeague: 'English Premier League', strSport: 'Soccer', strLeagueAlternate: 'EPL' },
    { idLeague: '4329', strLeague: 'English League Championship', strSport: 'Soccer', strLeagueAlternate: null },
    { idLeague: '4387', strLeague: 'NBA', strSport: 'Basketball', strLeagueAlternate: 'National Basketball Association' },
  ],
};

const badgeFixture = {
  seasons: [
    { strSeason: '2023-2024', strBadge: 'https://example.com/badge.png' },
  ],
};

test('search, filter, and view a season badge', async ({ page }) => {
  await page.route('**/all_leagues.php', (route) => route.fulfill({ json: leaguesFixture }));
  await page.route('**/search_all_seasons.php*', (route) => route.fulfill({ json: badgeFixture }));

  await page.goto('/');

  const cards = page.locator('.league-card');
  await expect(cards).toHaveCount(leaguesFixture.leagues.length);

  // search bar narrows the list
  await page.getByPlaceholder('Search leagues by name...').fill('Premier');
  await expect(cards).toHaveCount(1);
  await expect(cards).toContainText('English Premier League');

  // clear search, filter by sport instead
  await page.getByPlaceholder('Search leagues by name...').fill('');
  await page.locator('.sport-filter').click();
  await page.getByRole('option', { name: 'Basketball' }).click();
  await expect(cards).toHaveCount(1);
  await expect(cards).toContainText('NBA');

  // clicking a league fetches and shows its season badge
  await cards.first().click();
  await expect(page.locator('.badge-modal__image')).toHaveAttribute('src', badgeFixture.seasons[0].strBadge);
});
