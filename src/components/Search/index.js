import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchInput from 'components/SearchInput';
import Stops from 'components/Stops';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Search = ({
  stops, onQueryUpdate, query, onStopSelect,
}) => (
  <Container>
    <SearchInput onUpdate={onQueryUpdate} query={query} />
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
