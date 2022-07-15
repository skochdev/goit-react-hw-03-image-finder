import styles from './Searchbar.module.css';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import { Component, FormEvent, ChangeEvent } from 'react';

interface Props {
  onSubmit: (searchQuery: string) => void;
}

interface State {
  searchQuery: string;
}

class Searchbar extends Component<Props, State> {
  state: State = {
    searchQuery: '',
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      toast.error('Search for what? nothing?!');
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    let { handleFormSubmit, handleInputChange } = this;
    let { searchQuery } = this.state;

    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={handleFormSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <span>
              <ImSearch />
            </span>
          </button>

          <input
            className={styles.SearchFormInput}
            type="text"
            name="searchQuery"
            autoComplete="off"
            autoFocus
            value={searchQuery}
            placeholder="Search for images and photos"
            onChange={handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
