import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose, path } from 'ramda';

const Container = styled.div``;

const Input = styled.input``;

const getValue = path(['target', 'value']);

const SearchInput = ({ onUpdate, query }) => (
  <Container>
    <Input type="text" value={query} onChange={compose(onUpdate, getValue)} />
  </Container>
);

SearchInput.propTypes = {
  query: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default SearchInput;
