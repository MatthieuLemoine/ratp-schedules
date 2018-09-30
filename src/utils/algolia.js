import algolia from 'algoliasearch';

const ALGOLIA_APP_ID = '7K6KAWO1TH';
const ALGOLIA_SEARCH_KEY = 'ccdeb52de7e362edc0203c991901d847';
export const INDEX = 'ratp_stops';

export const client = algolia(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
const index = client.initIndex(INDEX);

export default index;
