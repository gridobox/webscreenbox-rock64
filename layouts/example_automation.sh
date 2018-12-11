#!/bin/bash

sleep 5
$(node /opt/webscreenbox/puppeteer/example_scroll.js http://bbc.co.uk 500 1080 0 0 &> /tmp/noc.log ) &

sleep 5
$(/opt/webscreenbox/start_browser.sh https://play.grafana.org/?refresh=30s 1420 1080 500 0 &> /tmp/noc.log ) &
