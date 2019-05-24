#!/usr/bin/node
const fs = require("fs");
const dir = process.cwd() + "/templates";
fs.readdirSync(dir).forEach(f => {
    fs.unlink(dir + "/" + f, err => {
        if(err)
            throw err
    });        
});
