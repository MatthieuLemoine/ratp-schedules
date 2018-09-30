import PropTypes from 'prop-types';
import styled from 'styled-components';
import StopName from '../StopName';
import { stopType, scheduleType } from '../../utils/types';

const Container = styled.div`
  margin: 16px;
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
    <StopContainer>
      <StopName stop={stop} />
      <Refresh onClick={refresh}>
        <span style={{ fontSize: 25 }} role="img" aria-label="refresh">
          {schedules.length ? '🔄' : '👁'}
        </span>
      </Refresh>
    </StopContainer>
    {schedules.map(schedule => (
      <Destination key={schedule.destination}>
        <Name>{schedule.destination}</Name>
        <Times>
          {schedule.times.map((time, index) => (
            <Time key={index}>{time}</Time>
          ))}
        </Times>
      </Destination>
    ))}
  </Container>
);

Schedules.defaultProps = {
  schedules: [],
};

Schedules.propTypes = {
  schedules: PropTypes.arrayOf(scheduleType),
  stop: stopType.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default Schedules;
