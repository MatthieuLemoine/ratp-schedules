import { compose, withState, withStateHandlers, mapProps } from 'recompose';
import algolia from 'algoliasearch';
import Search from '../../components/Search';

const ALGOLIA_APP_ID = '7K6KAWO1TH';
const ALGOLIA_SEARCH_KEY = 'ccdeb52de7e362edc0203c991901d847';
const INDEX = 'ratp_stops';

const client = algolia(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
const index = client.initIndex(INDEX);

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
