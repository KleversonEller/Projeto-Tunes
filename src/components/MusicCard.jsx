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

  componentDidMount() {
    this.listaFavorites();
  }

  componentDidUpdate() {

  }

  async listaFavorites() {
    const lista = await getFavoriteSongs();
    this.setState({
      checked: lista,
    });
  }

  async favoritarMusic(event) {
    const { listaMusic } = this.props;
    const { checked } = this.state;
    const musicas = listaMusic.filter((objeto) => objeto.trackName)
      .find((musica) => musica.trackId === +event.target.value);
    this.setState({
      loading: true,
    });
    return checked.some((id) => id.trackId === musicas.trackId)
      ? (await removeSong(musicas),
      this.setState((stateAnt) => ({
        loading: false,
        checked: stateAnt.checked.filter((objeto) => objeto !== musicas),
      })))
      : (await addSong(musicas),
      this.setState((stateAnt) => ({
        loading: false,
        checked: [...stateAnt.checked, musicas],
      })));
  }

  render() {
    const { listaMusic } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
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
                      checked={ checked.some((id) => id.trackId === musicas.trackId) }
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
