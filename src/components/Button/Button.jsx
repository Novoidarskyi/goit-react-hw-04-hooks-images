import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onClickImage }) => {
  return (
    <button className={css.button} type = "button"  onClick={onClickImage}> Load more </button>
  )
}

Button.propTypes = {
 onClickImage: PropTypes.func.isRequired,
}

export default Button

