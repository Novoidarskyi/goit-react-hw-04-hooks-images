import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal';

const ImageGalleryItem = ({ id, url, largeImageURL, pictureName }) => {
  const [status, setStatus] = useState('idle');

  // Метод добавления/снятия слушателя keydown на window

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPressESC);

    return () => {
      window.removeEventListener('keydown', handleKeyPressESC);
    };
  }, []);

  // Метод для открытия модального окна

  const openModal = () => setStatus('resolved');

  // Метод для закрытия модального окна по клику мышки

  const onClickCloseModal = () => setStatus('idle');

  // Метод для закрытия модального окна по нажатию клавиши Escape

  const handleKeyPressESC = e => {
    if (e.key === 'Escape') {
      setStatus('idle');
    }
  };

return (
  status === 'idle' ?
      <>
          <li key={id} className={css.imageGalleryItem}>
            <img
              src={url}
              alt={pictureName}
              className={css.imageGalleryItemImage}
              onClick={openModal}
            />
          </li>
  </>
    :
  <Modal
          largeImageURL={largeImageURL}
          pictureName={pictureName}
          onClickModal={onClickCloseModal}
          onChange={handleKeyPressESC}
        />  
)
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  pictureName: PropTypes.string.isRequired,
};

export default ImageGalleryItem;



