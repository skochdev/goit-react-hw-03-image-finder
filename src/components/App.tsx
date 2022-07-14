import React, { Component } from 'react';
import Searchbar from './Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ImageGallery from './ImageGallery';

interface State {
  searchQuery: string;
}

class App extends Component<{}, State> {
  state: State = {
    searchQuery: '',
  };

  handleSubmit = (searchQuery: string) => {
    this.setState({ searchQuery });
  };
  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery searchQuery={this.state.searchQuery} />

        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

export default App;
