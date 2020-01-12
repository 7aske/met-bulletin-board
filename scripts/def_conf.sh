#!/usr/bin/env sh

# Script that sets up the default configuration files required for the application

# default app config
CONFIG_CFG="PORT=3000
DB_USER=admin
DB_PASS=admin
MBB_USER=admin
MBB_PASS=admin
DB_URL=127.0.0.1
SECRET=secret"
CONFIG_CFG_PATH="config/config.cfg"

# default db config
DB_YAML="systemLog:
  destination: file
  path: \"bulletin-board.log\"
  logAppend: true
storage:
  journal:
    enabled: true

net:
  bindIp: 127.0.0.1
  port: 27017
setParameter:
  enableLocalhostAuthBypass: false
"
DB_YAML_PATH="config/db.yaml"

if [ ! -d "config" ]; then
  mkdir "config"
else
  echo "Config folder already exists."
  exit 0
fi

[ -f "$CONFIG_CFG_PATH" ] || echo "$CONFIG_CFG" >"$CONFIG_CFG_PATH"
[ -f "$DB_YAML_PATH" ] || echo "$DB_YAML" >"$DB_YAML_PATH"
