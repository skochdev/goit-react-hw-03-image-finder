import React, { Component } from 'react';
import searchApi from '../../services/search-api';
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
  status: 'idle' | 'pending' | 'resolved' | 'error';
}

class ImageGallery extends Component<Props, State> {
  state: State = {
    searchResults: [],
    error: '',
    status: 'idle',
  };

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any
  ) {
    let { searchQuery } = this.props;

    if (searchQuery !== prevProps.searchQuery) {
      this.setState({ status: 'pending' });

      searchApi
        .fetchImages(searchQuery)
        .then(searchResults =>
          this.setState({
            searchResults: searchResults.hits,
            status: 'resolved',
          })
        )
        .catch(error => this.setState({ error, status: 'error' }));
    }
  }

  render() {
    let { searchResults, status, error } = this.state;

    if (status === 'resolved') {
      return (
        <>
          <ImageGalleryItemsList searchResults={searchResults} />
          <Button />
        </>
      );
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'error') {
      return <p>{error}</p>;
    }
  }
}

export default ImageGallery;
