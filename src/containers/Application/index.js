import { compose, withState, withStateHandlers } from 'recompose';
import Application from 'components/Application';
import fetch from 'fetch';

export default compose(
  withState('schedules', 'setSchedules', []),
  withStateHandlers(
    {},
    {
      onStopSelect: (state, props) => async (stop) => {
        const { schedules } = await fetch('/api/transportation/schedule', {
          method: 'GET',
          qs: {
            type: stop.type,
            code: stop.line,
            // FIXME replace can be removed once ratp stops are reindexed
            station: stop.name.replace(/"/g, ''),
          },
        });
        console.log(schedules);
        props.setSchedules(schedules);
      },
    },
  ),
)(Application);
