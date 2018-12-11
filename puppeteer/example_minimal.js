{% extends "base_minimal.js" %}
{% block content %}

url = 'http://google.com';

await page.goto(url);

await page.type('[name="q"]', 'xkcd');
await page.keyboard.press('Tab');
await page.click('[name="btnK"]');
await page.waitForNavigation();
page.evaluate(_ => {
  window.scrollBy(0, 250);
});

{% endblock %}
