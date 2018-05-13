import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
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

const Schedules = ({ schedules }) => (
  <Container>
    {schedules.map(schedule => (
      <Destination key={schedule.destination}>
        <Name>{schedule.destination}</Name>
        <Times>{schedule.times.map(time => <Time key={time}>{time}</Time>)}</Times>
      </Destination>
    ))}
  </Container>
);

Schedules.propTypes = {
  schedules: PropTypes.arrayOf(PropTypes.shape({
    destination: PropTypes.string.isRequired,
    times: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
};

export default Schedules;
