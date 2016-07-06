"use strict"; // eslint-disable-line
const express = require('express');
const app = express();
const server = require('http').Server(app); // eslint-disable-line
const port = process.env.PORT || 3000;
const path = require('path');
// const imperio = require('imperio')(server);
const imperio = require('./../../imperioDev/index.js')(server);

app.use(express.static(path.join(`${__dirname}/../client`)));
app.use(express.static(path.join(`${__dirname}/../node_modules/imperio`)));
app.set('view engine', 'ejs');
app.use(imperio.init());

/* ----------------------------------
 * --------      Routes      --------
 * ---------------------------------- */

 // App will serve up different pages for client & desktop
app.get('/',
  (req, res) => {
    console.log('loading root page');
    if (req.imperio.isDesktop) {
      const data = {
        agentMsg: 'This is a desktop',
        nonce: null,
      };
      res.render('./../client/index.ejs', data);
    } else if (req.imperio.isMobile) {
      const data = {
        agentMsg: 'This is a mobile',
        nonce: null,
      };
      res.render('./../client/mobile.ejs', data);
    }
  }
);
// handle nonce in URL
app.get('/:nonce',
  (req, res) => {
    console.log('loading nonce page');
    if (req.imperio.isDesktop) {
      const data = {
        agentMsg: 'This is a desktop',
        nonce: req.params.nonce,
      };
      res.render('./../client/index.ejs', data);
    } else if (req.imperio.isMobile) {
      const data = {
        agentMsg: 'This is a mobile',
        nonce: req.params.nonce,
      };
      res.render('./../client/mobile.ejs', data);
    }
  }
);
// 404 error on invalid endpoint
app.get('*', (req, res) => {
  res.status(404)
     .render('./../client/404.html');
});

/* ----------------------------------
 * --------      Server      --------
 * ---------------------------------- */

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
