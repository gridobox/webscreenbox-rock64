{# This is web automation script for GoogleChrome/puppeteer #}
{% extends "base.js" %}
{% block content %}
{# environment: nodejs 9 #}
{# available variables: page, url #}

console.log(new Date().toISOString() + ' Loading ' + url);
await page.goto(url);

console.log(new Date().toISOString() + ' Page loaded');


// refresh snippet - repeatadely execute page reload
// this is useful to prevent session expire
const var_refresh = 120 * 1000;  // in ms, false or 0 to disable
if (var_refresh) {
  function refresh() {
    console.log(new Date().toISOString() + ' Refresh called');
    page.reload();
  }

  // TODO this is stupid, leaving hanging processes and crashing in the log
  console.log(new Date().toISOString() + ' Setting refresh interval to ' + var_refresh + 'ms');
  setInterval(refresh, var_refresh);
}

{% endblock %}
