import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: [],
    };
    this.favoritarMusic = this.favoritarMusic.bind(this);
    this.listaFavorites = this.listaFavorites.bind(this);
  }

  async componentDidMount() {
    this.listaFavorites();
  }

  async listaFavorites() {
    const lista = await getFavoriteSongs();
    const ids = lista.map((objeto) => objeto.trackId);
    this.setState({
      checked: ids,
    });
  }

  async favoritarMusic(event) {
    const { listaMusic } = this.props;
    const { checked } = this.state;
    const musicas = listaMusic
      .find((musica) => musica.trackId === +event.target.value);
    this.setState({
      loading: true,
    });
    return checked.some((id) => id === musicas.trackId)
      ? (await removeSong(musicas),
      this.setState((prev) => ({
        loading: false,
        checked: prev.checked.filter((id) => id !== +event.target.value),
      })))
      : (await addSong(musicas),
      this.setState((prev) => ({
        loading: false,
        checked: [...prev.checked, +event.target.value],
      })));
  }

  render() {
    const { listaMusic } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        {loading
          ? <Loading wid="250px" />
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

MusicCard.propTypes = {
  listaMusic: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default MusicCard;
