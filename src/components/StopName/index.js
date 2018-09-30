import styled from 'styled-components';
import { getEmoji, getPicto } from '../../utils';
import { stopType } from '../../utils/types';

const Stop = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Name = styled.div`
  margin-left: 10px;
`;

const Picto = styled.img`
  width: 30px;
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
