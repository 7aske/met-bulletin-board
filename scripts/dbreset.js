#!/usr/bin/node
require("fs").writeFileSync("database/db.json", JSON.stringify({polls: []}),{encoding:"utf8"});

