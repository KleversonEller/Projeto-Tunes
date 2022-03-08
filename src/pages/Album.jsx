import React from 'react';
import PropTypes from 'prop-types';
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
        <div>
          <p data-testid="artist-name">
            {album.length > 0 && album[0].artistName}
          </p>
          <p data-testid="album-name">
            {album.length > 0 && album[0].collectionName}
            <br />
            {album.length > 0 && album[0].artistName}
          </p>
          <MusicCard listaMusic={ album } />
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.number),
}.isRequired;

export default Album;
