import PropTypes from 'prop-types';
import css from './Modal.module.css'



const Modal = ({ largeImageURL, pictureName, onClickModal, onChange }) => {
  return (
    <div className={css.overlay} onClick={onClickModal} onKeyDown={onChange}>
  <div className={ css.modal}>
        <img src={largeImageURL} alt={pictureName } />
  </div>
</div>
  )
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  pictureName: PropTypes.string.isRequired,
  onClickModal: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}


export default Modal
