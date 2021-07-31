import React, { Component } from 'react';
import './App.css';
import ImageGallery from 'components/ImageGallery';
import Searchbar from 'components/Searchbar';
import Loader from 'react-loader-spinner';
import css from 'components/Loader/Loader.module.css';
import Button from 'components/Button';
import Error from 'components/Error';
import fetchImage from './service/api';

const BASE_URL = 'https://pixabay.com/api';
const KEY_API = '21851432-4720cbd8c8a1bfa0aa0ff2c82&';

export default class App extends Component {
  state = {
    images: [],
    pictureName: '',
    page: 1,
    error: null,
    status: 'idle',
  };

  // Метод для рендера страницы при первой загрузке

  componentDidMount() {
    const url = `${BASE_URL}/?q=${this.state.pictureName}&page=${this.state.page}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`;
    this.setState({ status: 'pending' });
    fetch(url)
      .then(res => res.json())
      .then(images =>
        this.setState({ images: images.hits, status: 'resolved' }),
      );
  }

  // Метод для обновления страницы при запросе от клиента

  componentDidUpdate(prevProps, prevState) {
    const url = `${BASE_URL}/?q=${this.state.pictureName}&page=${this.state.page}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`;
    if (prevState.pictureName !== this.state.pictureName) {
      this.setState({ status: 'pending', images: [], page: 1 });
      fetchImage(url)
        .then(images =>
          this.setState({ images: images.hits, status: 'resolved' }),
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
    if (prevState.page !== this.state.page) {
      fetchImage(url)
        .then(images =>
          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
            status: 'resolved',
          })),
        )
        .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        });
    }
  }

  // Метод для получения введеного значения для поиска от клиента в Searchbar

  handleFormSubmit = pictureName => {
    this.setState({ pictureName });
  };

  // Метод для добавления изображений на странице при нажатии клиентом кнопки Load more

  imageTotalList = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, pictureName, error, status } = this.state;

    if (status === 'idle') {
      return (
        <div className="App">
          <Searchbar onSubmit={this.handleFormSubmit} />;
          <ImageGallery images={images} pictureName={pictureName} />
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={150}
          width={150}
          className={css.loader}
        />
      );
    }

    if (status === 'rejected') {
      return <Error message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <div className="App">
          <Searchbar onSubmit={this.handleFormSubmit} />;
          <ImageGallery images={images} pictureName={pictureName} />
          {images.length > 0 && <Button onClickImage={this.imageTotalList} />}
        </div>
      );
    }
  }
}
