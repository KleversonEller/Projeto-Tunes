import React from 'react';
import style from '../css/Album.module.css';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import FavoritesCard from '../components/FavoritesCard';
import Header from '../components/Header';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
    this.listaFavorites = this.listaFavorites.bind(this);
  }

  componentDidMount() {
    this.listaFavorites();
  }

  async listaFavorites() {
    await getFavoriteSongs();
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-album">
          {loading ? (
            <div className={ style.loading }>
              <Loading wid="300px" />
            </div>)
            : <FavoritesCard />}
        </div>
      </div>
    );
  }
}

export default Favorites;
