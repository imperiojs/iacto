"use strict"; // eslint-disable-line
const express = require('express');
const app = express();
const server = require('http').Server(app); // eslint-disable-line
const port = process.env.PORT || 3000;
const path = require('path');
const imperio = require('imperio')(server);
// const imperio = require('./../../imperioDev/index.js')(server);

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
    if (req.imperio.userAgent && req.imperio.userAgent.isDesktop) {
      res.render('./../client/index.ejs');
    } else if (req.imperio.userAgent && req.imperio.userAgent.isMobile) {
      // res.render(`${__dirname}/../client/rootmobile`, { error: null });
      res.render('./../client/index.ejs');
    } else {
      res.render('./../client/index.ejs');
    }
  }
);
// 404 error on invalid endpoint
app.get('*', (req, res) => {
  res.status(404)
     .render(`${__dirname}/../client/rootmobile`,
            { error: 'Please enter code to connect to browser' });
});

/* ----------------------------------
 * --------      Server      --------
 * ---------------------------------- */

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
