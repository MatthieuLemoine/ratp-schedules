import styled from 'styled-components';
import { getEmoji, getPicto } from '../../utils';
import { stopType } from '../../utils/types';

const Stop = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.div`
  margin-left: 10px;
  font-size: 18px;
`;

const Picto = styled.img`
  width: 30px;
  min-width: 30px;
`;

const StopName = ({ stop }) => (
  <Stop>
    <Picto src={getPicto(stop)} alt={`${getEmoji(stop.type)} ${stop.line}`} />
    <Name>{stop.name.replace(/"/g, '')}</Name>
  </Stop>
);

StopName.propTypes = {
  stop: stopType.isRequired,
};

export default StopName;
