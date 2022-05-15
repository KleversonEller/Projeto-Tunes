import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import style from '../css/Search.module.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      valorPesquisado: '',
      pesquisando: true,
      album: '',
    };

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
    });
  }

  render() {
    const { valorPesquisado, pesquisando, album } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search" className={ style.container }>
          {pesquisando
            ? (
              <form className={ style.container_search }>
                <input
                  className={ style.input_search }
                  value={ valorPesquisado }
                  name="valorPesquisado"
                  data-testid="search-artist-input"
                  type="text"
                  onChange={ this.pesquisaInput }
                />
                <button
                  className={ style.button_search }
                  type="button"
                  data-testid="search-artist-button"
                  onClick={ this.getAlbum }
                >
                  Pesquisar
                </button>
              </form>)
            : <Loading wid="250px" /> }
          {Array.isArray(album)
            ? (
              <div className={ style.container_cards }>
                {album.map((objeto) => (
                  <Link
                    data-testid={ `link-to-album-${objeto.collectionId}` }
                    key={ objeto.collectionId }
                    to={ `/album/${objeto.collectionId}` }
                  >
                    <img
                      className={ style.image_cards }
                      src={ objeto.artworkUrl100 }
                      alt={ `Imagem ilustrativa do album ${objeto.collectionName}` }
                    />
                    <span className={ style.titles_cards }>
                      { objeto.collectionName }
                    </span>
                  </Link>
                ))}
              </div>)
            : <h1>{album}</h1>}
        </div>
      </div>
    );
  }
}

export default Search;
