const puppeteer = require('puppeteer');

console.log(new Date().toISOString() + ' puppeteer: ====== START ======');

// --------- defaults ----------

const path_to_chrome = '/usr/bin/chromium-browser';
const width = 1000
const height = 600

// --------- pre-flight setup ----------

// detect user breaks
process.on ('SIGINT',() => {
  console.log('Interrupted by SIGINT (Ctrl+C pressed), exiting.');
  process.exit(0);
});

// --------- run the scenario --------

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: path_to_chrome,
      headless: false,
      // slowMo: 0.25,
      args: [
        // '--incognito',
        '--disable-infobars',
        // '--start-maximized',
        // '--start-fullscreen',
        `--window-size=${ width },${ height }`
      ]
    });

    // const page = await browser.newPage();
    const pages = await browser.pages();
    const page = pages[0];

    // if not fullscreen
    await page.setViewport({ width, height })

    // propagate logs from page to terminal
    page.on('console', msg => {
      for (let i = 0; i < msg.args().length; ++i)
        console.log(`${i}: ${msg.args()[i]}`);
    });


    {% block content %}
    {% endblock %}

    console.log(new Date().toISOString() + ' puppeteer: Scenario completed');
  }
  catch (error) {
    console.error(new Date().toISOString() + error);
  }

  console.log(new Date().toISOString() + ' puppeteer: ----- END -----');
  // await browser.close();
})();
