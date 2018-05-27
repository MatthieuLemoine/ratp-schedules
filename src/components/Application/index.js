import PropTypes from 'prop-types';
import styled from 'styled-components';
import Search from '../../containers/Search';
import Schedules from '../Schedules';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100vh;
`;

const Spacer = styled.div`
  min-height: 30vh;
`;

const Application = ({ onStopSelect, schedules, stop }) => (
  <Container>
    <Spacer />
    <Search onStopSelect={onStopSelect} />
    {stop ? <Schedules stop={stop} schedules={schedules} /> : null}
  </Container>
);

Application.defaultProps = {
  stop: null,
};

Application.propTypes = {
  onStopSelect: PropTypes.func.isRequired,
  schedules: PropTypes.arrayOf(PropTypes.shape({
    destination: PropTypes.string.isRequired,
    times: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  stop: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    line: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

export default Application;
