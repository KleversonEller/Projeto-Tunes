import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { RiHeartAddFill } from 'react-icons/ri';
import { BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import style from '../css/Header.module.css';
import logo from '../images/logo-b.svg';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      nome: '',
      image: '',
    };
    this.userGet = this.userGet.bind(this);
  }

  componentDidMount() {
    this.userGet();
  }

  async userGet() {
    const usuario = await getUser();
    this.setState({
      loading: false,
      nome: usuario.name,
      image: usuario.image
        ? (
          <img
            className={ style.image_user }
            src={ usuario.image }
            alt={ `Imagem do usuário ${usuario.name}` }
          />)
        : <BiUser className={ style.image_user } />,
    });
  }

  render() {
    const { state } = this;
    return (
      <header data-testid="header-component" className={ style.container }>
        <div className={ style.container_user }>
          <img
            width="100px"
            height="50px"
            src={ logo }
            alt="Ilustração de ondas sonoras em formato de torre"
          />
          <div className={ style.container_menu }>
            <Link
              className={ style.link }
              data-testid="link-to-search"
              to="/search"
            >
              <AiFillHome />
              INÍCIO
            </Link>
            <Link
              className={ style.link }
              data-testid="link-to-favorites"
              to="/favorites"
            >
              <RiHeartAddFill />
              FAVORITOS
            </Link>
          </div>
          { state.loading
            ? <Loading wid="140px" />
            : (
              <div className={ style.wrapper_user }>
                <Link data-testid="link-to-profile" to="/profile">
                  {state.image}
                </Link>
                <span data-testid="header-user-name">{state.nome}</span>
              </div>
            )}
        </div>
      </header>
    );
  }
}

export default Header;
