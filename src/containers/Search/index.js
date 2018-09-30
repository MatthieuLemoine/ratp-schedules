import { compose, withState, withStateHandlers, mapProps } from 'recompose';
import Search from '../../components/Search';
import index from '../../utils/algolia';

export default compose(
  withState('stops', 'setStops', []),
  withState('query', 'setQuery', ''),
  withStateHandlers(
    {},
    {
      onQueryUpdate: (state, props) => async (query) => {
        props.setQuery(query);
        if (query.length > 2) {
          const { hits } = await index.search({ query });
          props.setStops(hits);
        } else {
          props.setStops([]);
        }
      },
    },
  ),
  mapProps(props => ({
    ...props,
    onStopSelect: (stop) => {
      props.setStops([]);
      props.onStopSelect(stop);
    },
  })),
)(Search);
