#!/usr/bin/env node
'use strict'

var airplay = require('airplay-photos')('aircat')

airplay.on('photo', function (req) {
  req.pipe(process.stdout)
  req.on('end', function () {
    airplay.unref()
    process.exit() // the mDNS servers are holding up the event loop - for now just force exit
  })
})
