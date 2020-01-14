# Bulletin board

## Description

Simple bulletin board application for showing content over an Electron based interface window. Web server is hosted to allow access to managing interface to add or remove slides and setup polls.
Visitors are able to vote for a given poll through the Electron interface if such slide contains a poll. Slides can have a background image supplied through an url or a plain background color.

## Configuration


```yaml
# config/config.cfg

PORT=3000              # web interface port         (required)
MBB_USER=admin         # web interface username     (required)
MBB_PASS=admin         # web interface password     (required)

DB_USER=admin          # database username          (required) 
DB_PASS=admin          # database password          (required)
DB_NAME=bulletin_board # database name              (required)
DB_IP=127.0.0.1       # ip of the database server  (required)

SECRET=secret          # secret used for hashing    (optional)
```

```yaml
# config/db.yaml
systemLog:                          # setup log file
  destination: file
  path: "bulletin-board.log"        # log file path
  logAppend: true                   # set to false to overwrite log file at start
storage:
  journal:
    enabled: true

net:
  bindIp: 127.0.0.1                 # ip that db server listens on
  port: 27017                       # default port
setParameter:
  enableLocalhostAuthBypass: false  # set to true to allow localhost only access for initial setup

```
## Usage

#### Setup 

`npm run install-all` - Installs all dependencies

`npm run build` - Builds the project

#### Running

`npm run start` - Starts the Electron interface that also runs the server

`npm run start-server` - Starts only the API server.

#### Utility

`npm run clean` - Deletes respective `node_modules` folders and `dist` folder.

`npm run deploy` - Deploys project and installs project dependencies to the ip specified in `./scripts/rc` file.

`npm run start-remote` - Runs remote project (after exiting remote app remains running)

