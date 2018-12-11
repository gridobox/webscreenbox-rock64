{% extends "base.js" %}
{% block content %}

await page.goto(url);

await page.type('[name="q"]', 'xkcd');
await page.keyboard.press('Tab');
await page.click('[name="btnK"]');
// await page.waitForNavigation();
// await page.waitFor(2000);
await page.waitFor('#rso > div > div > div > div > div > h3 > a');
await page.click('#rso > div > div > div > div > div > h3 > a');

{% endblock %}
