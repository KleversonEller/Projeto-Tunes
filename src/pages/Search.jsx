import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      disable: true,
      valorPesquisado: '',
      pesquisando: true,
      album: '',
      nomeArtista: '',
    };
    this.validateBtn = this.validateBtn.bind(this);
    this.getAlbum = this.getAlbum.bind(this);
    this.pesquisaInput = this.pesquisaInput.bind(this);
    this.validaAlbum = this.validaAlbum.bind(this);
  }

  async getAlbum() {
    const { valorPesquisado } = this.state;
    this.setState({
      pesquisando: false,
    });
    const albuns = await searchAlbumsAPI(valorPesquisado);
    this.setState({
      album: albuns,
      nomeArtista: valorPesquisado,
      valorPesquisado: '',
    }, this.validaAlbum);
  }

  validaAlbum() {
    const { album } = this.state;
    return album.length > 0
      ? this.setState({
        pesquisando: true,
      })
      : this.setState({
        pesquisando: true,
        album: 'Nenhum álbum foi encontrado',
      });
  }

  pesquisaInput(event) {
    this.setState({
      [event.target.name]: event.target.value,
    }, this.validateBtn);
  }

  validateBtn() {
    const { valorPesquisado } = this.state;
    return valorPesquisado.length >= 2
      ? this.setState({
        disable: false,
      })
      : this.setState({
        disable: true,
      });
  }

  render() {
    const { disable, valorPesquisado, pesquisando, album, nomeArtista } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {pesquisando
          ? (
            <form>
              <input
                value={ valorPesquisado }
                name="valorPesquisado"
                data-testid="search-artist-input"
                type="text"
                onChange={ this.pesquisaInput }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ disable }
                onClick={ this.getAlbum }
              >
                Pesquisar
              </button>
            </form>)
          : <Loading /> }
        {Array.isArray(album)
          ? (
            <div>
              <p>
                {`Resultado de álbuns de: ${nomeArtista}`}
              </p>
              {album.map((objeto) => (
                <Link
                  data-testid={ `link-to-album-${objeto.collectionId}` }
                  key={ objeto.collectionId }
                  to={ `/album/${objeto.collectionId}` }
                >
                  <div>
                    <div>
                      <img
                        src={ objeto.artworkUrl100 }
                        alt={ `Imagem ilustrativa do album ${objeto.collectionName}` }
                      />
                      <p>
                        { objeto.collectionName }
                      </p>
                      <p>
                        { objeto.artistName }
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>)
          : <p>{album}</p>}
      </div>
    );
  }
}

export default Search;
