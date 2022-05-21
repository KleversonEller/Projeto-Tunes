import React from 'react';
import PropTypes from 'prop-types';
import style from '../css/Album.module.css';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
      loading: true,
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
      loading: false,
    });
  }

  render() {
    const { album, loading } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-album">
          {loading ? (
            <div className={ style.loading }>
              <Loading wid="300px" />
            </div>)
            : (
              <div>
                <div className={ style.title }>
                  <span data-testid="artist-name">
                    {album.length > 0 && album[0].artistName}
                  </span>
                  <span data-testid="album-name">
                    {album.length > 0 && album[0].collectionName}
                  </span>
                </div>
                <MusicCard listaMusic={ album } />
              </div>)}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.number),
}.isRequired;

export default Album;
