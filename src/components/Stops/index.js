import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Stop = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div``;

const Stops = ({ stops, onSelect }) => (
  <Container>
    {stops.map(stop => (
      <Stop key={stop.id} onClick={() => onSelect(stop)}>
        <Name>{`${stop.type} ${stop.line} ${stop.name}`}</Name>
      </Stop>
    ))}
  </Container>
);

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
