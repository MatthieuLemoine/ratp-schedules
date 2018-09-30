import PropTypes from 'prop-types';
import styled from 'styled-components';
import Search from '../../containers/Search';
import Schedules from '../Schedules';
import { itemType } from '../../utils/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100vh;
`;

const Spacer = styled.div`
  min-height: 25vh;
`;

const SchedulesContainer = styled.div`
  max-width: 584px;
  width: 50%;
  align-self: center;
`;

const Row = styled(SchedulesContainer)`
  display: flex;
  flex-wrap: wrap;
`;

const RowSpaced = styled(SchedulesContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.div`
  font-weight: bold;
  padding-left: 16px;
`;

const Refresh = styled.div`
  padding: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Application = ({
  onStopSelect, selected, refresh, others, refreshAll,
}) => (
  <Container>
    {selected.stop ? null : <Spacer />}
    <Search onStopSelect={onStopSelect} />
    {selected.stop ? (
      <SchedulesContainer>
        <Schedules
          stop={selected.stop}
          schedules={selected.schedules}
          refresh={refresh(selected.stop)}
        />
      </SchedulesContainer>
    ) : null}
    {others.length ? (
      <RowSpaced>
        <Label>Other lines:</Label>
        <Refresh onClick={refreshAll}>
          <span style={{ fontSize: 25 }} role="img" aria-label="refresh">
            🔄
          </span>
        </Refresh>
      </RowSpaced>
    ) : null}
    <Row>
      {others.map((other, index) => (
        <Schedules
          key={other.stop.id}
          stop={other.stop}
          schedules={other.schedules}
          refresh={refresh(other.stop, index)}
        />
      ))}
    </Row>
  </Container>
);

Application.propTypes = {
  onStopSelect: PropTypes.func.isRequired,
  selected: itemType.isRequired,
  others: PropTypes.arrayOf(itemType).isRequired,
  refresh: PropTypes.func.isRequired,
  refreshAll: PropTypes.func.isRequired,
};

export default Application;
