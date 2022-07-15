import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

type Props = {
  onCloseModal: () => void;
  modalImage: string;
};

export default class Modal extends Component<Props> {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscClosesModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscClosesModal);
  }

  handleEscClosesModal = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = (e: React.SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    let { modalImage } = this.props;
    let { handleBackdropClick } = this;
    console.log(modalImage);
    return createPortal(
      <div className={css.Overlay} onClick={handleBackdropClick}>
        <div className={css.Modal}>
          <img src={modalImage} alt="" />
        </div>
      </div>,
      modalRoot!
    );
  }
}
