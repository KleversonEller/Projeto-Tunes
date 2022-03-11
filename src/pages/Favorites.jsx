import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong, addSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: [],
      listaMusic: [],
    };
    this.favoritarMusic = this.favoritarMusic.bind(this);
    this.listaFavorites = this.listaFavorites.bind(this);
  }

  async componentDidMount() {
    this.listaFavorites();
  }

  async listaFavorites() {
    this.setState({
      loading: true,
    });
    const lista = await getFavoriteSongs();
    const ids = lista.map((objeto) => objeto.trackId);
    this.setState({
      checked: ids,
      listaMusic: lista,
      loading: false,
    });
  }

  async favoritarMusic(event) {
    this.setState({
      loading: true,
    });
    const { checked, listaMusic } = this.state;
    const lista = await getFavoriteSongs();
    const musicas = listaMusic
      .find((musica) => musica.trackId === +event.target.value);
    return checked.some((id) => id === musicas.trackId)
      ? (await removeSong(musicas),
      this.setState((prev) => ({
        loading: false,
        checked: prev.checked.filter((id) => id !== +event.target.value),
        listaMusic: prev.listaMusic.filter((id) => id.trackId !== +event.target.value),
      })))
      : (await addSong(musicas),
      this.setState((prev) => ({
        loading: false,
        checked: [...prev.checked, +event.target.value],
        listaMusic: lista,
      })));
  }

  render() {
    const { loading, checked, listaMusic } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading
          ? <Loading />
          : (
            listaMusic.filter((objeto) => objeto.trackName)
              .map((musicas) => (
                <div key={ musicas.trackId }>
                  <p>
                    {musicas.trackName}
                  </p>
                  <audio
                    data-testid="audio-component"
                    src={ musicas.previewUrl }
                    controls
                  >
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    <code>audio</code>
                    .
                  </audio>
                  <br />
                  <label htmlFor={ musicas.trackId }>
                    Favorita
                    <input
                      value={ musicas.trackId }
                      onChange={ this.favoritarMusic }
                      data-testid={ `checkbox-music-${musicas.trackId}` }
                      id={ musicas.trackId }
                      type="checkbox"
                      checked={ checked.some((id) => id === musicas.trackId) }
                    />
                  </label>
                </div>
              )))}
      </div>
    );
  }
}

export default Favorites;
