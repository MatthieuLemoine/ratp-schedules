import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Search from 'containers/Search';
import Schedules from 'components/Schedules';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Application = ({ onStopSelect, schedules }) => (
  <Container>
    <Search onStopSelect={onStopSelect} />
    <Schedules schedules={schedules} />
  </Container>
);

Application.propTypes = {
  onStopSelect: PropTypes.func.isRequired,
  schedules: PropTypes.arrayOf(PropTypes.shape({
    destination: PropTypes.string.isRequired,
    times: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
};

export default Application;
