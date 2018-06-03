const path = require('path');
const next = require('next');
const express = require('express');
const logger = require('./logger');
const transportation = require('./routes/transportation');

const PORT = process.env.PORT || 8765;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use('/api/transportation', transportation);

  server.get('/service-worker.js', (req, res) =>
    app.serveStatic(req, res, path.join(__dirname, '..', '.next', 'service-worker.js')));

  server.get('*', (req, res) => handle(req, res));

  server.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
});
