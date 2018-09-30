import PropTypes from 'prop-types';
import styled from 'styled-components';
import { stopType } from '../../utils/types';
import StopName from '../StopName';
import Button from '../Button';

const Container = styled.div`
  margin-top: 5vh;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 -16px;
`;

const Bookmark = styled.div`
  cursor: pointer;
  border-radius: 4px;
  padding: 16px;
  box-shadow: 0 -1px 0 #e0e0e0, 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
  flex: 1;
  margin: 0 16px 16px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Bookmarks = ({ bookmarks, onBookmarkSelect, onRemove }) => (
  <Container>
    <Row>
      {bookmarks.map(bookmark => (
        <Bookmark key={bookmark.id} onClick={() => onBookmarkSelect(bookmark)}>
          <StopName stop={bookmark} />
          <Button onClick={() => onRemove(bookmark)}>🗑</Button>
        </Bookmark>
      ))}
    </Row>
  </Container>
);

Bookmarks.propTypes = {
  bookmarks: PropTypes.arrayOf(stopType).isRequired,
  onBookmarkSelect: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Bookmarks;
