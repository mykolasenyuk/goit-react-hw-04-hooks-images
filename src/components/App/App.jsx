import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/imageApi';
import LoaderSpiner from '../Loader/Loader';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import s from './App.module.css';
export default class App extends Component {
  state = {
    imageName: '',
    page: 1,
    images: [],
    modalIsOpen: false,
    selectedImage: null,
    status: 'idle',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageName, page } = this.state;
    if (prevState.imageName !== imageName || prevState.page !== page) {
      this.setState({ status: 'pending' });

      api
        .fetchImages(imageName, page)
        .then(data => data.hits)
        .then(pictures =>
          this.setState(prevState => ({
            images: [...prevState.images, ...pictures],
            status: 'resolved',
          })),
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
    if (prevState.images !== this.state.images) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  resetState = () => {
    this.setState({
      imageName: '',
      page: 1,
      images: [],
      selectedImage: null,
      status: 'idle',
    });
  };

  handleFormSubmit = imageName => {
    this.resetState();
    this.setState({ imageName });
  };

  openModal = (src, alt) => {
    this.setState({
      modalIsOpen: true,
      selectedImage: { src, alt },
    });
  };
  closeModal = () => this.setState({ modalIsOpen: false });

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, error, status, selectedImage, modalIsOpen } = this.state;

    if (status === 'idle') {
      return (
        <div className={s.App}>
          <SearchBar onSubmit={this.handleFormSubmit} />
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div className={s.App}>
          <SearchBar onSubmit={this.handleFormSubmit} />
          <ImageGallery openModal={this.openModal} images={images} />
          <LoaderSpiner />
          {images.length > 0 && <Button onClick={this.onLoadMore} />}
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div className={s.App}>
          <SearchBar onSubmit={this.handleFormSubmit} />
          <h1>{error.message}</h1>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className={s.App}>
          <SearchBar onSubmit={this.handleFormSubmit} />
          <ImageGallery openModal={this.openModal} images={images} />
          {images.length > 0 && <Button onClick={this.onLoadMore} />}
          {modalIsOpen && (
            <Modal image={selectedImage} onClose={this.closeModal} />
          )}
          <ToastContainer />
        </div>
      );
    }
  }
}
