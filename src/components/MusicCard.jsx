import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { listaMusic } = this.props;
    return (
      <div>
        {
          listaMusic.filter((objeto) => objeto.trackName)
            .map((musicas) => (
              <div key={ musicas.trackId }>
                <p>
                  {musicas.trackName}
                </p>
                <audio data-testid="audio-component" src={ musicas.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                  .
                </audio>
              </div>
            ))
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  listaMusic: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default MusicCard;
