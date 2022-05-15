import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Profiles extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: [],
    };
    this.userGet = this.userGet.bind(this);
  }

  componentDidMount() {
    this.userGet();
  }

  async userGet() {
    this.setState({
      loading: true,
    });
    const usuario = await getUser();
    this.setState({
      user: usuario,
      loading: false,
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading
          ? <Loading wid="250" />
          : (
            <div>
              <p>
                { user.name }
              </p>
              <p>
                { user.email }
              </p>
              <p>
                { user.description }
              </p>
              <img
                data-testid="profile-image"
                src={ user.image }
                alt={ `Imagem do usuaio ${user.name}` }
              />
              <br />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profiles;
