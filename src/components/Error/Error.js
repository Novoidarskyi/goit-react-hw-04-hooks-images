import PropTypes from 'prop-types';

const Error = ({ message }) => {
  return <p>{message}</p>;
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
