import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchInput from '../SearchInput';
import Stops from '../Stops';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5vh;
`;

const ImageContainer = styled.div`
  max-width: 584px;
  padding-left: 18px;
  padding-top: 8px;
  width: 50%;
  display: flex;
  justify-content: flex-end;
`;
const Image = styled.img`
  height: 16px;
`;

const Search = ({
  stops, onQueryUpdate, query, onStopSelect,
}) => (
  <Container>
    <SearchInput onUpdate={onQueryUpdate} query={query} />
    <ImageContainer>
      <Image src="/static/search-by-algolia.svg" alt="Search by Algolia" />
    </ImageContainer>
    <Stops stops={stops} onSelect={onStopSelect} />
  </Container>
);

Search.defaultProps = {
  stops: [],
  query: '',
};

Search.propTypes = {
  stops: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    line: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })),
  onQueryUpdate: PropTypes.func.isRequired,
  onStopSelect: PropTypes.func.isRequired,
  query: PropTypes.string,
};

export default Search;
