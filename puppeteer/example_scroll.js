{# This is web automation script for GoogleChrome/puppeteer #}
{% extends "base.js" %}
{% block content %}
{# environment: nodejs 9 #}
{# available variables: page, url #}

console.log(new Date().toISOString() + ' Loading ' + url);
await page.goto(url);

page.once('load', () => console.log('Page loaded!'));

console.log(new Date().toISOString() + ' Scrolling to 2000px');
page.evaluate(_ => {
  window.scrollBy(0, 2000);
});

{% endblock %}
