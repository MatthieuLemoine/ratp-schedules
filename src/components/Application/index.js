import PropTypes from 'prop-types';
import styled from 'styled-components';
import Search from '../../containers/Search';
import Schedules from '../Schedules';
import Bookmarks from '../Bookmarks';
import { itemType, stopType } from '../../utils/types';
import Button from '../Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  margin: 0 16px;
`;

const Spacer = styled.div`
  min-height: 25vh;
`;

const CenterColumn = styled.div`
  width: 584px;
  max-width: 100%;
`;

const RowSpaced = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.div`
  font-weight: bold;
`;

const Application = ({
  onStopSelect,
  selected,
  refresh,
  others,
  refreshAll,
  bookmarks,
  addBookmark,
  removeBookmark,
}) => (
  <Container>
    <CenterColumn>
      {selected.stop || bookmarks.length ? null : <Spacer />}
      {bookmarks.length ? (
        <Bookmarks
          bookmarks={bookmarks}
          onBookmarkSelect={onStopSelect}
          onRemove={removeBookmark}
        />
      ) : null}
      <Search onStopSelect={onStopSelect} />
      {selected.stop ? (
        <Schedules
          stop={selected.stop}
          schedules={selected.schedules}
          refresh={refresh(selected.stop)}
          addBookmark={addBookmark}
        />
      ) : null}
      {others.length ? (
        <RowSpaced>
          <Label>Other lines:</Label>
          <Button onClick={refreshAll}>🔄</Button>
        </RowSpaced>
      ) : null}
      {others.map((other, index) => (
        <Schedules
          key={other.stop.id}
          stop={other.stop}
          schedules={other.schedules}
          refresh={refresh(other.stop, index)}
          addBookmark={addBookmark}
        />
      ))}
    </CenterColumn>
  </Container>
);

Application.propTypes = {
  onStopSelect: PropTypes.func.isRequired,
  selected: itemType.isRequired,
  others: PropTypes.arrayOf(itemType).isRequired,
  refresh: PropTypes.func.isRequired,
  refreshAll: PropTypes.func.isRequired,
  bookmarks: PropTypes.arrayOf(stopType).isRequired,
  addBookmark: PropTypes.func.isRequired,
  removeBookmark: PropTypes.func.isRequired,
};

export default Application;
