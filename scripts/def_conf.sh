#!/usr/bin/env sh

# Script that sets up the default configuration files required for the application

CFG_PATH="config"

# default app config
CONFIG_CFG="PORT=3000
DB_USER=admin
DB_PASS=admin
MBB_USER=admin
MBB_PASS=admin
DB_URL=127.0.0.1
SECRET=secret"
CONFIG_CFG_PATH="$CFG_PATH/config.cfg"

if [ ! -d "$CFG_PATH" ]; then
  mkdir "$CFG_PATH"
else
  echo "Config folder already exists."
  exit 0
fi

[ -f "$CONFIG_CFG_PATH" ] || echo "$CONFIG_CFG" >"$CONFIG_CFG_PATH"

