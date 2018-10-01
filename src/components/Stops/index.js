import PropTypes from 'prop-types';
import styled from 'styled-components';
import HighlightText from '../HighlightText';
import { getEmoji } from '../../utils';

const Relative = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 9px 0;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08);
  position: relative;
  width: 100%;
  top: -25px;
  z-index: 999;
  background-color: white;
  max-height: 30vh;
  overflow-y: scroll;
`;

const Stop = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 22px;
  cursor: default;
  margin-left: -9px;
  margin-right: -9px;
  padding-left: 15px;
  flex-shrink: 0;
  &:hover {
    background-color: #eee;
  }
`;

const Stops = ({ stops, onSelect }) =>
  (stops.length ? (
    <Relative>
      <Container>
        {stops.map(stop => (
          <Stop key={stop.id} onClick={() => onSelect(stop)}>
            <HighlightText>
              {`${getEmoji(stop.type)} ${
                stop._highlightResult.line.value
              } ${stop._highlightResult.name.value.replace(/"/g, '')}`}
            </HighlightText>
          </Stop>
        ))}
      </Container>
    </Relative>
  ) : null);

Stops.propTypes = {
  stops: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    line: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Stops;
