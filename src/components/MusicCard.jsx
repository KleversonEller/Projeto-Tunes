import React from 'react';
import PropTypes from 'prop-types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import style from '../css/MusicCard.module.css';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: [],
    };
    this.favoritarMusic = this.favoritarMusic.bind(this);
    this.listaFavorites = this.listaFavorites.bind(this);
    this.isChecked = this.isChecked.bind(this);
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
    return checked.some((id) => id === musicas.trackId)
      ? (await removeSong(musicas),
      this.setState((prev) => ({
        checked: prev.checked.filter((id) => id !== +event.target.value),
      })))
      : (await addSong(musicas),
      this.setState((prev) => ({
        checked: [...prev.checked, +event.target.value],
      })));
  }

  isChecked(id) {
    const { checked } = this.state;
    const heart = checked.some((value) => value === id);
    return heart ? <AiFillHeart size={ 30 } /> : <AiOutlineHeart size={ 30 } />;
  }

  render() {
    const { listaMusic } = this.props;
    const { checked } = this.state;
    return (
      <div className={ style.container }>
        {listaMusic.filter((objeto) => objeto.trackName)
          .map((musicas) => (
            <div className={ style.music } key={ musicas.trackId }>
              <img src={ musicas.artworkUrl100 } alt="" />
              <div className={ style.play }>
                <span>
                  {musicas.trackName}
                </span>
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
              </div>
              <div className={ style.favorite }>
                <label htmlFor={ musicas.trackId }>
                  {this.isChecked(musicas.trackId)}
                </label>
                <input
                  value={ musicas.trackId }
                  onChange={ this.favoritarMusic }
                  data-testid={ `checkbox-music-${musicas.trackId}` }
                  id={ musicas.trackId }
                  type="checkbox"
                  checked={ checked.some((id) => id === musicas.trackId) }
                />
              </div>
            </div>
          ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  listaMusic: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default MusicCard;
