#!/usr/bin/env node
'use strict'

var airplay = require('airplay-server')
var raop = require('raop-stub')
var patterns = require('patterns')()
var plist = require('plist')

patterns.add('PUT /photo', photo)

// This endpoint is used for video, but the iPhone will try and connect in case
// the user wants to use the video features
patterns.add('GET /server-info', serverInfo)

// The RAOP server needs to be running for the iPhone to accept this server as
// valid
raop('aircat', function (err) {
  if (err) throw err
})

var server = airplay('aircat', function (req, res) {
  var match = patterns.match(req.method + ' ' + req.url)

  if (!match) {
    res.writeHead(404)
    res.end()
    return
  }

  var fn = match.value
  req.params = match.params

  fn(req, res)
})

var airplayTxt
server.on('txt', function (txt) {
  airplayTxt = txt
})

server.listen(7000)

function serverInfo (req, res) {
  var txt = airplayTxt

  var opts = {
    deviceid: txt.deviceid,
    features: 268438015,
    vv: '1',
    rhd: '1.06.5',
    pw: '0',
    srcvers: '150.33',
    rmodel: 'MacBookair4,2',
    model: 'AppleTV3,1',
    protovers: '1.0'
  }

  var body = plist.build(opts)

  res.setHeader('Content-Type', 'text/x-apple-plist+xml')
  res.setHeader('Content-Length', body.length)
  res.end(body)
}

function photo (req, res) {
  req.pipe(process.stdout)
  req.on('end', function () {
    server.unref()
    process.exit() // the mDNS server is holding up the event loop - for now just force exit
  })
}
