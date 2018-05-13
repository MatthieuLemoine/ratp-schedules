const express = require('express');
const slugify = require('@sindresorhus/slugify');
const { getNextTwoPassages } = require('../../api/ratp');

const router = express.Router();

const toType = type =>
  (type[type.length - 1].toLowerCase() !== 's' ? `${type}s` : type).toLowerCase();

router.get('/schedule', async (req, res, next) => {
  try {
    const {
      type = 'bus', code, station, way = 'A+R',
    } = req.query;
    const schedules = await getNextTwoPassages({
      type: toType(type),
      code,
      station: slugify(station),
      way,
    });
    res.json({ schedules });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
