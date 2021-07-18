// import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          tags={tags}
          webformatURL={webformatURL}
          openModal={() => openModal(largeImageURL, tags)}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};

// import LoaderSpiner from '../Loader/Loader';
// import api from '../../services/imageApi';
// export default class ImageGahllery extends Component {
//   state = {
//     images: [],
//     error: null,
//     status: 'idle',
//   };
//   componentDidUpdate(prevProps, prevState) {
//     const prevName = prevProps.imageName;
//     const newName = this.props.imageName;
//     const page = this.props.page;
//     console.log(page);
//     if (prevName !== newName) {
//       //   console.log('changed name');
//       //   console.log('prev', prevName);
//       //   console.log('this', newName);

//       this.setState({ status: 'pending' });

//       api
//         .fetchImages(newName, page)
//         .then(data => data.hits)
//         .then(images => this.setState({ images, status: 'resolved' }))
//         .catch(error => this.setState({ error, status: 'rejected' }));
//     }
//   }

//   render() {
//     const { images, error, status } = this.state;

//     if (status === 'idle') {
//       return <div> Enter Image name</div>;
//     }
//     if (status === 'pending') {
//       return <LoaderSpiner />;
//     }
//     if (status === 'rejected') {
//       return <h1>{error.message}</h1>;
//     }
//     if (status === 'resolved') {
//       return (
//         <ul className="ImageGallery">
//           {images.map(({ id, webformatURL, tags, largeImageURL }) => (
//             <ImageGalleryItem
//               key={id}
//               tags={tags}
//               webformatURL={webformatURL}
//               // largeImageURL={largeImageURL}
//               openModal={this.props.openModal(largeImageURL)}
//             />
//           ))}
//         </ul>
//       );
//     }
//   }
// }
