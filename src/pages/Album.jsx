import React from 'react';
import PropTypes from 'prop-types';
import style from '../css/Album.module.css';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
    };
    this.musicsGet = this.musicsGet.bind(this);
  }

  componentDidMount() {
    this.musicsGet();
  }

  async musicsGet() {
    const { match } = this.props;
    const music = await getMusics(match.params.id);
    this.setState({
      album: music,
    });
  }

  render() {
    const { album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className={ style.container }>
          <span data-testid="artist-name">
            {album.length > 0 && album[0].artistName}
          </span>
          <span data-testid="album-name">
            {album.length > 0 && album[0].collectionName}
          </span>
        </div>
        <MusicCard listaMusic={ album } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.number),
}.isRequired;

export default Album;
