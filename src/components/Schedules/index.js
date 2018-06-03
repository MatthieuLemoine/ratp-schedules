import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getEmoji } from '../../utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SchedulesContainer = styled.div`
  max-width: 584px;
  width: 50%;
`;

const Destination = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div``;

const Times = styled.div`
  display: flex;
  flex-direction: column;
`;

const Time = styled.div``;

const StopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Stop = styled.div`
  margin-bottom: 15px;
`;

const StopName = styled.div``;

const Line = styled.div`
  margin-bottom: 5px;
`;

const Refresh = styled.div`
  padding: 15px;
  padding-right: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Schedules = ({ schedules, stop, refresh }) => (
  <Container>
    <SchedulesContainer>
      <StopContainer>
        <Stop>
          <Line>{`${getEmoji(stop.type)} ${stop.line}`}</Line>
          <StopName>{stop.name.replace(/"/g, '')}</StopName>
        </Stop>
        <Refresh onClick={refresh}>
          <span style={{ fontSize: 25 }} role="img" aria-label="refresh">
            🔄
          </span>
        </Refresh>
      </StopContainer>
      {schedules.map(schedule => (
        <Destination key={schedule.destination}>
          <Name>{schedule.destination}</Name>
          <Times>{schedule.times.map((time, index) => <Time key={index}>{time}</Time>)}</Times>
        </Destination>
      ))}
    </SchedulesContainer>
  </Container>
);

Schedules.propTypes = {
  schedules: PropTypes.arrayOf(PropTypes.shape({
    destination: PropTypes.string.isRequired,
    times: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  stop: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    line: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  refresh: PropTypes.func.isRequired,
};

export default Schedules;
