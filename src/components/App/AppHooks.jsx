import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/imageApi';
import LoaderSpiner from '../Loader/Loader';
import SearchBarHooks from '../SearchBar/SearchBarHooks';
// import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
// import Modal from '../Modal/Modal';
import ModalHooks from '../Modal/ModalHooks';
import s from './App.module.css';

export default function AppHooks() {
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (!imageName) {
      return;
    }

    setStatus('pending');
    api
      .fetchImages(imageName, page)
      .then(data => data.hits)
      .then(pictures => {
        if (pictures.length === 0) {
          setStatus('rejected');
          toast.error(`'${imageName}' not found!`);
        } else {
          toast.success(`'${imageName}' is finded`);
        }

        setImages(prevImages => [...prevImages, ...pictures]);

        setStatus('resolved');
        if (page > 1) {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => {
        setStatus('rejected');
      });
  }, [imageName, page]);

  const resetState = () => {
    setImageName('');
    setPage(1);
    setImages([]);
    setSelectedImage(null);
    setStatus('idle');
    setModalIsOpen(false);
  };

  const formSubmit = imageName => {
    resetState();
    setImageName(imageName);
  };
  const openModal = (src, alt) => {
    setModalIsOpen(true);
    setSelectedImage({ src, alt });
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };
  if (status === 'idle') {
    return (
      <div className={s.App}>
        <SearchBarHooks onSubmit={formSubmit} />
        <ToastContainer />
      </div>
    );
  }
  if (status === 'pending') {
    return (
      <div className={s.App}>
        <SearchBarHooks onSubmit={formSubmit} />
        <ImageGallery openModal={openModal} images={images} />
        <LoaderSpiner />
        {images.length > 0 && <Button onClick={onLoadMore} />}
      </div>
    );
  }
  if (status === 'rejected') {
    return (
      <div className={s.App}>
        <SearchBarHooks onSubmit={formSubmit} />
      </div>
    );
  }
  if (status === 'resolved') {
    return (
      <div className={s.App}>
        <SearchBarHooks onSubmit={formSubmit} />
        <ImageGallery openModal={openModal} images={images} />
        {images.length > 0 && <Button onClick={onLoadMore} />}
        {modalIsOpen && (
          <ModalHooks image={selectedImage} onClose={closeModal} />
        )}
        <ToastContainer />
      </div>
    );
  }
}
