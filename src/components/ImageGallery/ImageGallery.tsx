import React, { Component } from 'react';
import searchApi from '../../services/search-api';
import notFound from '../../assets/images/notFound.webp';
import styles from './ImageGallery.module.css';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';

interface Props {
  searchQuery: string;
}

type SearchResults = {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
};

interface State {
  searchResults: SearchResults[];
  error: string | undefined;
  status: 'idle' | 'pending' | 'resolved' | 'error' | 'notFound';
  page: number;
  showModal: boolean;
  modalImage: string;
  tags: string;
}

class ImageGallery extends Component<Props, State> {
  state: State = {
    searchResults: [],
    error: '',
    status: 'idle',
    page: 1,
    showModal: false,
    modalImage: '',
    tags: '',
  };

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any
  ) {
    let { searchQuery } = this.props;
    let { page } = this.state;

    if (searchQuery !== prevProps.searchQuery) {
      this.setState({ status: 'pending' });

      searchApi
        .fetchImages(searchQuery)
        .then(({ hits }) => {
          if (hits.length > 0) {
            this.setState({
              searchResults: hits,
              status: 'resolved',
            });
          } else if (hits.length === 0) {
            this.setState({
              status: 'notFound',
            });
          }
        })
        .catch(error => this.setState({ error, status: 'error' }));
    } else if (page !== prevState.page) {
      searchApi
        .fetchImages(searchQuery, page)
        .then(({ hits }) =>
          this.setState({
            searchResults: [...prevState.searchResults, ...hits],
          })
        )
        .catch(error => this.setState({ error, status: 'error' }));
    }
  }

  loadMoreHandler = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  imgClickHandler = (largeImageURL: string, tags: string) => {
    this.setState({
      modalImage: largeImageURL,
      tags,
    });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    let { searchResults, status, error, modalImage, tags } = this.state;
    let { toggleModal, imgClickHandler, loadMoreHandler } = this;

    if (status === 'resolved') {
      return (
        <>
          {this.state.showModal && (
            <Modal
              modalImage={modalImage}
              tags={tags}
              onCloseModal={toggleModal}
            />
          )}
          {searchResults.length > 0 && (
            <ul className="ImageGallery">
              {searchResults.map(
                ({ id, webformatURL, largeImageURL, tags }) => (
                  <ImageGalleryItem
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    id={id}
                    alt={tags}
                    key={id}
                    onImgClick={() => imgClickHandler(largeImageURL, tags)}
                  />
                )
              )}
            </ul>
          )}

          <Button loadMoreHandler={loadMoreHandler} />
        </>
      );
    }

    if (status === 'pending') {
      return (
        <>
          <Loader />
        </>
      );
    }

    if (status === 'error') {
      return <p>{error}</p>;
    }

    if (status === 'notFound') {
      return (
        <img
          src={notFound}
          className={styles.notFound}
          alt="nothing was found"
        />
      );
    }
  }
}

export default ImageGallery;
