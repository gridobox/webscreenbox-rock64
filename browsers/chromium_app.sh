#!/bin/bash

URL="$1"
window_width="$2"
window_height="$3"
window_position_x="$4"
window_position_y="$5"

APP_ARG="data:text/html,<html><body><script>\
window.resizeTo(200,200);\
window.moveTo(${window_position_x},${window_position_y});\
window.resizeTo(${window_width},${window_height});\
window.location='${URL}';\
</script></body></html>"

chromium-browser --app="${APP_ARG}"
