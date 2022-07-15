import React, { Component } from 'react';
import searchApi from '../../services/search-api';
import notFound from '../../assets/images/notFound.webp';
import styles from './ImageGallery.module.css';
import ImageGalleryItemsList from '../ImageGalleryItemsList';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

interface Props {
  searchQuery: string;
}

interface State {
  searchResults: {
    id: number;
    webformatURL: string;
    largeImageURL: string;
    tags: string;
  }[];
  error: string | undefined;
  status: 'idle' | 'pending' | 'resolved' | 'error' | 'notFound';
  page: number;
}

class ImageGallery extends Component<Props, State> {
  state: State = {
    searchResults: [],
    error: '',
    status: 'idle',
    page: 1,
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
          } else if (hits.length == 0) {
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

  render() {
    let { searchResults, status, error } = this.state;

    if (status === 'resolved') {
      return (
        <>
          <ImageGalleryItemsList searchResults={searchResults} />
          <Button loadMoreHandler={this.loadMoreHandler} />
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
