#!/usr/bin/env sh

. ./scripts/rc

ssh "$PI_USER"@"$PI_IP" "mkdir -p /home/pi/Code/isum/met-bulletin-board"
ssh "$PI_USER"@"$PI_IP" "rm -rf /home/pi/Code/isum/met-bulletin-board/dist/node_modules"
rsync --progress -avhe ssh ./dist "$PI_USER"@"$PI_IP":/home/pi/Code/isum/met-bulletin-board/
ssh "$PI_USER"@"$PI_IP" "rm -rf /home/pi/Code/isum/met-bulletin-board/dist/node_modules"
ssh "$PI_USER"@"$PI_IP" "cd /home/pi/Code/isum/met-bulletin-board/dist && npm install"
