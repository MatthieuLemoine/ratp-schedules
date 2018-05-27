import PropTypes from 'prop-types';
import styled from 'styled-components';

const regex = /<\/?em>/g;

const Text = styled.div``;

const Bold = styled.b`
  font-weight: bold;
`;

const HighlightText = ({ children }) => (
  <Text>
    {children.split(regex).map((item, index) => {
      if (index % 2) {
        return <Bold key={index}>{item}</Bold>;
      }
      return item;
    })}
  </Text>
);

HighlightText.defaultProps = {
  children: '',
};

HighlightText.propTypes = {
  children: PropTypes.string,
};

export default HighlightText;
