import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      nome: '',
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
    });
  }

  render() {
    const { state } = this;
    return (
      <header data-testid="header-component">
        { state.loading
          ? <Loading />
          : (
            <div>
              <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
              <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
              <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
              <span data-testid="header-user-name">{state.nome}</span>
            </div>
          )}
      </header>
    );
  }
}

export default Header;
