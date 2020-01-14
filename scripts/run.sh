#!/usr/bin/env sh

. ./scripts/rc

if [ "$1" = "dev" ]; then
  ssh "$PI_USER"@"$PI_IP" "export DISPLAY=:0; NODE_ENV=dev cd /home/pi/Code/isum/met-bulletin-board/dist && npm start"
else
  ssh "$PI_USER"@"$PI_IP" "DISPLAY=:0 cd /home/pi/Code/isum/met-bulletin-board/dist && npm start"
fi
