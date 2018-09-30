import { compose, withState, withHandlers, withStateHandlers, lifecycle } from 'recompose';
import Application from '../../components/Application';
import fetch from '../../fetch';
import index from '../../utils/algolia';

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

const sortByType = bestType => (stop1, stop2) => {
  if (stop1.type === bestType) {
    return -1;
  }
  if (stop2.type === bestType) {
    return +1;
  }
  if (stop1.type === 'METRO') {
    return -1;
  }
  if (stop2.type === 'METRO') {
    return +1;
  }
  return stop1.type.localeCompare(stop2.type);
};

export default compose(
  withState('selected', 'setSelected', {}),
  withState('others', 'setOthers', []),
  withStateHandlers(
    {
      bookmarks: [],
    },
    {
      setBookmarks: () => (value = []) => {
        try {
          window.localStorage.setItem('bookmarks', JSON.stringify(value));
        } catch (e) {
          console.error(e);
        }
        return { bookmarks: value };
      },
    },
  ),
  lifecycle({
    componentDidMount() {
      const bookmarks = window.localStorage.getItem('bookmarks');
      if (bookmarks) {
        this.props.setBookmarks(JSON.parse(bookmarks));
      }
    },
  }),
  withHandlers({
    updateOthers: props => (value, i) =>
      props.setOthers([...props.others.slice(0, i), value, ...props.others.slice(i + 1)]),
    addBookmark: ({ bookmarks, setBookmarks }) => (value) => {
      const found = bookmarks.find(bookmark => bookmark.id === value.id);
      if (!found) {
        return setBookmarks([...bookmarks, value]);
      }
      return setBookmarks(bookmarks);
    },
    removeBookmark: ({ bookmarks, setBookmarks }) => (value) => {
      const foundIndex = bookmarks.findIndex(bookmark => bookmark.id === value.id);
      if (foundIndex > -1) {
        return setBookmarks([
          ...bookmarks.slice(0, foundIndex),
          ...bookmarks.slice(foundIndex + 1),
        ]);
      }
      return setBookmarks(bookmarks);
    },
  }),
  withHandlers({
    onStopSelect: props => async (stop) => {
      props.setSelected({ stop });
      props.setOthers([]);
      props.setSelected({ stop, schedules: await getSchedule(stop) });
      if (stop.transfers && stop.transfers.length) {
        const { results } = await index.getObjects(stop.transfers);
        const otherStops = results.filter(result => !!result).sort(sortByType(stop.type));
        // Filter out null values
        props.setOthers(otherStops.map(s => ({ stop: s })));
        await Promise.all(otherStops.map(async (s, i) => {
          // Only fetch schedules for if same type by default
          if (s.type === stop.type) {
            const schedules = await getSchedule(s);
            props.updateOthers({ stop: s, schedules }, i);
          }
        }));
      }
    },
    refresh: props => (stop, i) => async () => {
      const schedules = await getSchedule(stop);
      if (i !== undefined) {
        props.updateOthers({ stop, schedules }, i);
      } else {
        props.setSelected({ stop, schedules });
      }
    },
    refreshAll: props => async () => {
      await Promise.all(props.others.map(async ({ stop, schedules: s }, i) => {
        // Only refetch schedules if already fetched once
        if (s) {
          const schedules = await getSchedule(stop);
          props.updateOthers({ stop, schedules }, i);
        }
      }));
    },
  }),
)(Application);
