import React from 'react';
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
    console.log(usuario.name);
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
          : <span data-testid="header-user-name">{state.nome}</span>}
      </header>
    );
  }
}

export default Header;
