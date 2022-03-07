import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      disable: true,
    };
    this.validateBtn = this.validateBtn.bind(this);
  }

  validateBtn(event) {
    return event.target.value.length >= 2
      ? this.setState({
        disable: false,
      })
      : this.setState({
        disable: true,
      });
  }

  render() {
    const { disable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            name="disable"
            data-testid="search-artist-input"
            type="text"
            onChange={ this.validateBtn }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disable }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
