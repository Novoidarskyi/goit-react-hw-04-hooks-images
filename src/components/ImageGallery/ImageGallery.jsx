import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, pictureName }) => { 
  return (
    <ul className={css.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem id={id} url={webformatURL} largeImageURL = {largeImageURL} pictureName ={pictureName} />
             ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired,).isRequired,
  pictureName: PropTypes.string.isRequired,
}


export default ImageGallery;

