import React, { useState, useEffect } from 'react';
import './App.css';
import ImageGallery from 'components/ImageGallery';
import Searchbar from 'components/Searchbar';
import Loader from 'react-loader-spinner';
import css from 'components/Loader/Loader.module.css';
import Button from 'components/Button';
import Error from 'components/Error';
import fetchImage from './service/api';

const App = () => {
  const [images, setImages] = useState([]);
  const [pictureName, setPictureName] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');

  const BASE_URL = 'https://pixabay.com/api';
  const KEY_API = '21851432-4720cbd8c8a1bfa0aa0ff2c82&';
  const URL = `${BASE_URL}/?q=${pictureName}&page=${page}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`;

  // Метод для рендера страницы при первой загрузке / загрузки дополнительных изображений на странице

  useEffect(() => {
    setStatus('pending');
    async function fetchImageAPI() {
      let images = await fetchImage(URL);
      setImages(
        page === 1 ? images.hits : prevState => [...prevState, ...images.hits],
      );
      setStatus('resolved');
    }
    fetchImageAPI();
  }, [URL, page]);

  //  Метод для обновления страницы при запросе от клиента

  //  useEffect(() => {
  //   setStatus('pending');
  //    setPictureName([]);
  //    setPage(1)
  //   fetchImage(URL).then(images => setImages(images.hits), setStatus('resolved'))
  //     .catch(error => setError(error), setStatus('resolved'))
  //  }, [URL, pictureName]);

  // Метод для получения введеного значения для поиска от клиента в Searchbar

  const handleFormSubmit = pictureName => setPictureName(pictureName);

  // Метод для добавления изображений на странице при нажатии клиентом кнопки Load more

  const imageTotalList = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'idle' && (
        <div className="App">
          <ImageGallery images={images} pictureName={pictureName} />
        </div>
      )}
      {status === 'pending' && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={150}
          width={150}
          className={css.loader}
        />
      )}
      {status === 'rejected' && <Error message={error} />}
      {status === 'resolved' && (
        <div className="App">
          <ImageGallery images={images} pictureName={pictureName} />
          {images.length > 0 && <Button onClickImage={imageTotalList} />}
        </div>
      )}
    </>
  );
};

export default App;

// useEffect(() => {
//   setStatus('pending');
//   async function fetchImageAPI() {
//     let images = await fetchImage(URL);
//     setImages(
//       page === 1 ? images.hits : prevState => [...prevState, ...images.hits],
//     );
//     setStatus('resolved');
//   }
//   fetchImageAPI();
// }, [URL, page]);
