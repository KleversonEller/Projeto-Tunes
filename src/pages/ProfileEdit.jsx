import React from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class ProfilesEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
      email: '',
      image: '',
      description: '',
      redirect: false,
    };
    this.inputsValues = this.inputsValues.bind(this);
    this.validateBtn = this.validateBtn.bind(this);
    this.userGet = this.userGet.bind(this);
    this.redirecionando = this.redirecionando.bind(this);
  }

  componentDidMount() {
    this.userGet();
  }

  inputsValues(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  validateBtn() {
    const { state } = this;
    const valida = [state.name, state.email, state.description, state.image];
    const validado = valida.every((valor) => valor.length > 0)
    && /\S+@\S+\.\S+/.test(state.email);
    return !validado;
  }

  userGet() {
    this.setState({
      loading: true,
    }, async () => {
      const usuario = await getUser();
      this.setState({
        name: usuario.name,
        email: usuario.email,
        image: usuario.image,
        description: usuario.description,
        loading: false,
      });
    });
  }

  async redirecionando(event) {
    event.preventDefault();
    this.setState({
      redirect: true,
    });
    const { state } = this;
    await updateUser({
      name: state.name,
      email: state.email,
      image: state.image,
      description: state.description,
    });
  }

  render() {
    const { loading, name, email, image, description, redirect } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading
          ? <Loading wid="250px" />
          : (
            <div>
              <label htmlFor="name">
                Name:
                <input
                  name="name"
                  onChange={ this.inputsValues }
                  id="name"
                  data-testid="edit-input-name"
                  type="text"
                  value={ name }
                />
              </label>
              <label htmlFor="email">
                E-mail:
                <input
                  name="email"
                  onChange={ this.inputsValues }
                  id="email"
                  data-testid="edit-input-email"
                  type="text"
                  value={ email }
                />
              </label>
              <label htmlFor="description">
                Description:
                <input
                  name="description"
                  onChange={ this.inputsValues }
                  id="description"
                  data-testid="edit-input-description"
                  type="text"
                  value={ description }
                />
              </label>
              <label htmlFor="image">
                URL Image:
                <input
                  name="image"
                  onChange={ this.inputsValues }
                  id="image"
                  data-testid="edit-input-image"
                  type="text"
                  value={ image }
                />
              </label>
              <button
                onClick={ this.redirecionando }
                disabled={ this.validateBtn() }
                data-testid="edit-button-save"
                type="submit"
              >
                Salvar
              </button>
            </div>
          )}
        {redirect && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfilesEdit;
