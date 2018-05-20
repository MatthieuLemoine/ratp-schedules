import React from 'react';
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

const Stop = styled.div`
  margin-bottom: 15px;
`;

const StopName = styled.div``;

const Line = styled.div`
  margin-bottom: 5px;
`;

const Schedules = ({ schedules, stop }) => (
  <Container>
    <SchedulesContainer>
      <Stop>
        <Line>{`${getEmoji(stop.type)} ${stop.line}`}</Line>
        <StopName>{stop.name.replace(/"/g, '')}</StopName>
      </Stop>
      {schedules.map(schedule => (
        <Destination key={schedule.destination}>
          <Name>{schedule.destination}</Name>
          <Times>{schedule.times.map(time => <Time key={time}>{time}</Time>)}</Times>
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
};

export default Schedules;
