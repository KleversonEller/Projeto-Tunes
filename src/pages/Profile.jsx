import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import style from '../css/Profile.module.css';
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
    this.editPerfilBtn = this.editPerfilBtn.bind(this);
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

  editPerfilBtn() {
    const { history } = this.props;
    history.push('/profile/edit');
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile" className={ style.container }>
        <Header />
        <div className={ style.container_perfil }>
          {loading
            ? <Loading wid="300px" />
            : (
              <div className={ style.container_perfil }>
                <div className={ style.container_user }>
                  <div className={ style.image_user }>
                    {user.image
                      ? (
                        <img
                          data-testid="profile-image"
                          width="100vw"
                          src={ user.image }
                          alt={ `Imagem do usuaio ${user.name}` }
                        />)
                      : (
                        <img
                          data-testid="profile-image"
                          width="100vw"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png"
                          alt="Imagem do usuaio padrão"
                        />)}
                  </div>
                  <span className={ style.name_user }>
                    { user.name }
                  </span>
                  <div className={ style.email_user }>
                    {user.email
                      ? <span>{ user.email }</span>
                      : <span>E-mail ainda não definido.</span>}
                  </div>
                  <div className={ style.description_user }>
                    {user.description
                      ? <span>{ user.description }</span>
                      : (
                        <span>
                          Edite seu perfil para adicionar uma descrição sobre você.
                        </span>)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={ this.editPerfilBtn }
                >
                  Editar perfil
                </button>
              </div>
            )}
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  history: PropTypes.objectOf,
}.isRequired;

export default Profiles;
