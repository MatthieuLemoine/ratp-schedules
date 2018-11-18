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
  // Noctilien
  if (/^N/.test(line)) {
    return `${PICTO_PATH}/Noct-${line.slice(1)}-genRVB.svg`;
  }
  if (line === 'Tuc') {
    return `${PICTO_PATH}/574genRVB.svg`;
  }
  if (line === 'V5') {
    return `${PICTO_PATH}/584genRVB.svg`;
  }
  if (line === 'Tuvim') {
    return `${PICTO_PATH}/589genRVB.svg`;
  }
  if (line === 'Orlybus') {
    return `${PICTO_PATH}/283genRVB.svg`;
  }
  return `${PICTO_PATH}/${line}genRVB.svg`;
};
