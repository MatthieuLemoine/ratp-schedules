export const getEmoji = (type) => {
  switch (type) {
    case 'BUS':
      return '🚌';
    case 'METRO':
      return '🚇';
    case 'RER':
      return '🚆';
    case 'TRAM':
      return '🚊';
    default:
      return '🚌';
  }
};

const PICTO_PATH = '/static/pictos';
export const getPicto = ({ line, type }) => {
  if (type === 'METRO') {
    return `${PICTO_PATH}/M${line}genRVB.svg`;
  }
  if (type === 'RER') {
    return `${PICTO_PATH}/RER${line}genRVB.svg`;
  }
  return `${PICTO_PATH}/${line}genRVB.svg`;
};
