import PropTypes from 'prop-types';

export const stopType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  line: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});

export const scheduleType = PropTypes.shape({
  destination: PropTypes.string.isRequired,
  times: PropTypes.arrayOf(PropTypes.string).isRequired,
});

export const itemType = PropTypes.shape({
  schedules: PropTypes.arrayOf(scheduleType),
  stop: stopType,
});
