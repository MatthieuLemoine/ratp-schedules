import PropTypes from 'prop-types';
import styled from 'styled-components';
import StopName from '../StopName';
import { stopType, scheduleType } from '../../utils/types';
import Button from '../Button';

const Container = styled.div`
  margin: 16px 0;
  border-radius: 8px;
  padding: 16px;
  flex: 1;
  box-shadow: 0 -1px 0 #e0e0e0, 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
`;

const Destination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-style: solid;
  border-color: #eeeeee;
  border-radius: 8px;
  border-width: 0;
  border-bottom-width: ${props => (props.isLast ? 0 : 1)}px;
  padding: 8px;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const Times = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Time = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const OtherTimes = styled.div``;

const StopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

const Schedules = ({
  schedules, stop, refresh, addBookmark,
}) => (
  <Container>
    <StopContainer>
      <StopName stop={stop} />
      <Actions>
        <Button onClick={() => addBookmark(stop)}>🔖</Button>
        <Button onClick={refresh}>{schedules.length ? '🔄' : '👁'}</Button>
      </Actions>
    </StopContainer>
    {schedules.map((schedule, index) => (
      <Destination key={schedule.destination} isLast={index === schedules.length - 1}>
        <Name>{schedule.destination}</Name>
        <Times>
          <Time>{schedule.times[0]}</Time>
          {schedule.times.length > 1 && (
            <OtherTimes>{schedule.times.slice(1).join(', ')}</OtherTimes>
          )}
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
  addBookmark: PropTypes.func.isRequired,
};

export default Schedules;
