{# This is web automation script for GoogleChrome/puppeteer #}
{% extends "base.js" %}
{% block content %}
{# environment: nodejs 9 #}
{# available variables: page, url #}

console.log(new Date().toISOString() + ' Loading ' + url);
await page.goto(url);

// examples of waiting
// await page.waitForNavigation();
await page.waitFor(2000);

console.log(new Date().toISOString() + ' Taking screenshot');
await page.screenshot({path: 'example.png'});

console.log(new Date().toISOString() + ' Shutdown browser');
await browser.close();


{% endblock %}
