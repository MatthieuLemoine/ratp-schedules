import { compose, withState, withStateHandlers } from 'recompose';
import Application from '../../components/Application';
import fetch from '../../fetch';

const getSchedule = stop =>
  fetch('/api/transportation/schedule', {
    method: 'GET',
    qs: {
      type: stop.type,
      code: stop.line,
      // FIXME replace can be removed once ratp stops are reindexed
      station: stop.name.replace(/"/g, ''),
    },
  }).then(({ schedules }) => schedules);

export default compose(
  withState('schedules', 'setSchedules', []),
  withState('stop', 'setStop', null),
  withStateHandlers(
    {},
    {
      onStopSelect: (state, props) => async (stop) => {
        props.setStop(stop);
        props.setSchedules(await getSchedule(stop));
      },
      refresh: (state, props) => async () => props.setSchedules(await getSchedule(props.stop)),
    },
  ),
)(Application);
