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
