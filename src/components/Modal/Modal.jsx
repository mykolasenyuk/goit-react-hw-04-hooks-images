import React, { Component, createRef } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const ModalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  backdrop = createRef();

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress = e => {
    if (e.code !== 'Escape') {
      return;
    }
    this.props.onClose();
  };

  handleBackdropClick = e => {
    if (this.backdropRef.current && e.target !== this.backdropRef.current) {
      return;
    }

    this.props.onClose();
  };

  render() {
    const { image } = this.props;
    return createPortal(
      <div
        className={s.Overlay}
        ref={this.backdropRef}
        onClick={this.props.onClose}
        role="presentation"
      >
        <div className={s.Modal}>
          <img src={image.src} alt={image.alt} />
        </div>
      </div>,
      ModalRoot,
    );
  }
}
