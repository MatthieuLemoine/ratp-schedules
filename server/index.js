const express = require('express');
const path = require('path');
const logger = require('./logger');
const transportation = require('./routes/transportation');

const app = express();
const PORT = process.env.PORT || 8765;

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use('/api/transportation', transportation);

app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
