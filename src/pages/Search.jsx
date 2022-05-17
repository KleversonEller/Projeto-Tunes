import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';
import Header from '../components/Header';
import AlbunsDefault from '../services/albunsDefault';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import style from '../css/Search.module.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      valorPesquisado: '',
      pesquisando: true,
      album: AlbunsDefault,
      title: 'Álbuns para você',
    };

    this.scrollBar = React.createRef();

    this.getAlbum = this.getAlbum.bind(this);
    this.pesquisaInput = this.pesquisaInput.bind(this);
    this.validaAlbum = this.validaAlbum.bind(this);
    this.handleLeft = this.handleLeft.bind(this);
    this.handleRight = this.handleRight.bind(this);
  }

  handleLeft(event) {
    event.preventDefault();
    this.scrollBar.current.scrollLeft -= this.scrollBar.current.offsetWidth;
  }

  handleRight(event) {
    event.preventDefault();
    this.scrollBar.current.scrollLeft += this.scrollBar.current.offsetWidth;
  }

  async getAlbum(event) {
    event.preventDefault();
    if (this.scrollBar.current !== null) this.scrollBar.current.scrollLeft = 0;
    const { valorPesquisado } = this.state;
    this.setState({
      pesquisando: false,
    });
    const albuns = await searchAlbumsAPI(valorPesquisado);
    this.setState({
      album: albuns,
      valorPesquisado: '',
      title: `Resultados da busca para "${valorPesquisado}"`,
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
    const { valorPesquisado, pesquisando, album, title } = this.state;
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
                  type="submit"
                  data-testid="search-artist-button"
                  onClick={ this.getAlbum }
                >
                  Pesquisar
                </button>
              </form>)
            : <Loading wid="250px" /> }
          {Array.isArray(album)
            ? (
              <div className={ style.container_menu }>
                <div className={ style.container_button }>
                  <samp className={ style.title }>{title}</samp>
                  <div>
                    <button
                      type="button"
                      onClick={ this.handleLeft }
                    >
                      <BsFillCaretLeftFill />
                    </button>
                    <button
                      type="button"
                      onClick={ this.handleRight }
                    >
                      <BsFillCaretRightFill />
                    </button>
                  </div>
                </div>
                <div className={ style.container_cards } ref={ this.scrollBar }>
                  {album.map((objeto) => (
                    <Link
                      data-testid={ `link-to-album-${objeto.collectionId}` }
                      key={ objeto.collectionId }
                      to={ `/album/${objeto.collectionId}` }
                    >
                      <span className={ style.titles_cards }>
                        {objeto.artistName}
                      </span>
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
                </div>
              </div>)
            : <h1>{album}</h1>}
        </div>
      </div>
    );
  }
}

export default Search;
