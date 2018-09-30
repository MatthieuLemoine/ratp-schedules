import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  padding: 15px;
  padding-right: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = ({ children, ...props }) => (
  <Container {...props}>
    <span style={{ fontSize: 25 }} role="img" aria-label="action">
      {children}
    </span>
  </Container>
);

Button.defaultProps = {
  children: '',
};

Button.propTypes = {
  children: PropTypes.string,
};

export default Button;
