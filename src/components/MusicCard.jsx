import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: [],
    };
    this.favoritarMusic = this.favoritarMusic.bind(this);
  }

  async favoritarMusic(event) {
    this.setState({
      loading: true,
    });
    await addSong(event.target.value);
    this.setState((stateAnt) => ({
      loading: false,
      checked: [...stateAnt.checked, event.target.id],
    }));
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
                      value={ musicas }
                      onChange={ this.favoritarMusic }
                      data-testid={ `checkbox-music-${musicas.trackId}` }
                      id={ musicas.trackId }
                      type="checkbox"
                      checked={ checked.some((id) => +id === musicas.trackId) }
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
