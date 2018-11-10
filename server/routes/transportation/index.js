const express = require('express');
const slugify = require('@sindresorhus/slugify');
const { getNextTwoPassages } = require('../../api/ratp');

const router = express.Router();

const toType = (type) => {
  switch (type) {
    case 'RER':
      return 'rers';
    case 'METRO':
      return 'metros';
    case 'TRAM':
      return 'tramways';
    case 'NOCTILIEN':
      return 'noctiliens';
    case 'BUS':
      return 'bus';
    default:
      return type;
  }
};

const toCode = (type, code) => {
  switch (type) {
    case 'TRAM':
      return code.slice(1);
    default:
      return code;
  }
};

router.get('/schedule', async (req, res, next) => {
  try {
    const {
      type = 'bus', code, station, way = 'A+R',
    } = req.query;
    const schedules = await getNextTwoPassages({
      type: toType(type),
      code: toCode(type, code),
      station: slugify(station),
      way,
    });
    res.json({ schedules });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
