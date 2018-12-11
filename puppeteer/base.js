const puppeteer = require('puppeteer');
const screenres = require('screenres');

console.log(new Date().toISOString() + ' puppeteer: ====== START ======');

// to debug arguments
// console.log(process.argv.length);
// console.log(process.argv);

// --------- defaults ----------

const var_path_to_chrome = '/usr/bin/chromium-browser';
const var_timeout = 60 * 1000; // increasing default 30s to 1 minute
const var_slowmo = 0.01; // false to disable
var url = "http://example.com";
// env PUPPETEER_MODE=default
var window_width = 1000;
var window_height = 1000;
var window_position_x = 100;
var window_position_y = 100;


// --------- pre-flight setup ----------

// detect user breaks
process.on ('SIGINT',() => {
  console.log('Interrupted by SIGINT (Ctrl+C pressed), exiting.');
  process.exit(0);
});

// --------- parse input ----------
// warning: unicorns and magic constants ahead

// check number of arguments
if (process.env.PUPPETEER_MODE != 'default') {
  // in production by default start fullscreen
  window_width = screenres.get()[0];
  window_height = screenres.get()[1];
  window_position_x = 0;
  window_position_y = 0;

}
if ((process.argv.length != 3) && (process.argv.length != 7)) {
  console.log(process.argv[1] + ' needs one or five arguments, first URL, then optional four integers - window attributes (width, height, x-position, y-position)');
  process.exit(10);
}
else {
  url = process.argv[2];
  if (process.argv.length == 7) {
    // check last 4 arguments are numbers only
    // (first argument is node binary, second is script name, so start with 3rd item)
    const patt = new RegExp("[0-9]+");
    for (var i=3; i <= 6; i++) {
      if (!patt.test(process.argv[i])) {
        console.error(new Date().toISOString() + ' Argument no. ' + i + ' `'+ process.argv[i] + '` is not an integer');
        process.exit(11);
      }
    }
    // parse arguments into values
    window_width = parseInt(process.argv[3]);
    window_height = parseInt(process.argv[4]);
    window_position_x = parseInt(process.argv[5]);
    window_position_y = parseInt(process.argv[6]);
  }
}

// --------- run the scenario --------

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: var_path_to_chrome,
    args: [
      // '--app=http://example.com/',
      // '--app=data:text/html,<html><body><script>window.resizeTo(400,400);window.moveTo('+window_position_x+','+window_position_y+');window.resizeTo('+window_width+','+window_height+');</script></body></html>'
      '--app=data:text/html,<html><body></body></html>',
      '--window-size='+ window_width +','+ window_height,
      '--window-position='+ window_position_x +','+ window_position_y
    ],
    slowMo: var_slowmo
  });

  try {
    // get reference to default page from launch
    const pages = await browser.pages();
    const page = pages[0];

    // set viewport manually (in future this should follow window size)
    console.log(new Date().toISOString() + ' puppeteer: Setting view port to ' + window_width + 'x' + window_height + '.');
    page.setViewport({
      width: window_width,
      height: window_height
    })

    // propagate logs from page to terminal
    page.on('console', msg => {
      for (let i = 0; i < msg.args().length; ++i)
        console.log(`${i}: ${msg.args()[i]}`);
    });

    page.setDefaultNavigationTimeout(var_timeout);

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
