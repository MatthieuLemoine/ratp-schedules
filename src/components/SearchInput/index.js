import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose, path } from 'ramda';

const Container = styled.div`
  background-color: #fff;
  height: 44px;
  vertical-align: top;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
  transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  border: none;
  padding: 0px;
  margin: 0px 9px 0;
  height: auto;
  background-color: white;
  line-height: 34px;
  height: 34px;
  font: 16px arial, sans-serif;
  outline: none;
  padding-left: 6px;
  text-overflow: ellipsis;
  flex: 1;
`;

const getValue = path(['target', 'value']);

const SearchInput = ({ onUpdate, query }) => (
  <Container>
    <Input
      type="text"
      value={query}
      onChange={compose(
        onUpdate,
        getValue,
      )}
      autoFocus
      placeholder="When is the next bus/metro/tramway/RER at..."
    />
  </Container>
);

SearchInput.propTypes = {
  query: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default SearchInput;
