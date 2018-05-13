const request = require('request-promise-native');
const { reduce, path, compose } = require('ramda');

const HOST = 'https://api-ratp.pierre-grimaud.fr/v3';

const getPath = (...args) => args.join('/');
const get = uri =>
  request({
    method: 'GET',
    uri,
    json: true,
  }).then(data => data.result);

// type string Type of transport (rers, metros, bus, tramways, noctiliens)
// code string Code of transport line (e.g. 8)
const getLines = ({ type, code }) => get(`${HOST}/lines/${getPath(type, code)}`);

// type string Type of transport (rers, metros, bus, tramways, noctiliens)
// code string Code of transport line (e.g. 8)
const getStations = ({ type, code }) => get(`${HOST}/stations/${getPath(type, code)}`);

// type string Type of transport (rers, metros, bus, tramways, noctiliens)
// code string Code of transport line (e.g. 8)
const getDestinations = ({ type, code }) => get(`${HOST}/destinations/${getPath(type, code)}`);

// type string Type of transport (rers, metros, bus, tramways, noctiliens)
// code string Code of transport line (e.g. 8)
// station string Slug of the station (e.g. bonne+nouvelle)
// way string Way on the line (A, R or A+R)
const getNextTwoPassages = ({
  type, code, station, way,
}) =>
  get(`${HOST}/schedules/${getPath(type, code, station, way)}`).then(compose(
    reduce((acc, item) => {
      const schedule = acc.find(_ => _.destination === item.destination);
      if (schedule) {
        schedule.times.push(item.message);
        return acc;
      }
      return acc.concat({
        destination: item.destination,
        times: [item.message],
      });
    }, []),
    path(['schedules']),
  ));

// type string Type of transport (rers, metros, bus, tramways, noctiliens)
// code string Code of transport line (e.g. 8)
const getTrafic = ({ type, code }) => get(`${HOST}/${getPath(type, code)}`);

module.exports = {
  getLines,
  getStations,
  getDestinations,
  getNextTwoPassages,
  getTrafic,
};
