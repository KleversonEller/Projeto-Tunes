/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import style from '../css/ProfileEdit.module.css';
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
    const { name } = event.target;
    if (name === 'cancelar') {
      this.setState({
        redirect: true,
      });
    } else {
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
  }

  render() {
    const { loading, name, email, image, description, redirect } = this.state;
    return (
      <div data-testid="page-profile-edit" className={ style.container }>
        <Header />
        <div className={ style.container_edit }>
          {loading
            ? <Loading wid="300px" />
            : (
              <div className={ style.container_edit }>
                <div className={ style.container_infos }>
                  <div className={ style.infos_input }>
                    <label htmlFor="name">Name:</label>
                    <input
                      name="name"
                      onChange={ this.inputsValues }
                      id="name"
                      data-testid="edit-input-name"
                      type="text"
                      value={ name }
                    />
                  </div>
                  <div className={ style.infos_input }>
                    <label htmlFor="email">E-mail:</label>
                    <input
                      name="email"
                      onChange={ this.inputsValues }
                      id="email"
                      data-testid="edit-input-email"
                      type="text"
                      value={ email }
                    />
                  </div>
                  <div className={ style.infos_textarea }>
                    <label htmlFor="description">Description:</label>
                    <textarea
                      name="description"
                      onChange={ this.inputsValues }
                      id="description"
                      data-testid="edit-input-description"
                      type="text"
                      rows="3"
                      maxLength={ 150 }
                      value={ description }
                    />
                  </div>
                  <div className={ style.infos_input }>
                    <label htmlFor="image">Image:</label>
                    <input
                      name="image"
                      onChange={ this.inputsValues }
                      id="image"
                      data-testid="edit-input-image"
                      type="text"
                      value={ image }
                    />
                  </div>
                </div>
                <div className={ style.container_buttons }>
                  <button
                    name="cancelar"
                    onClick={ this.redirecionando }
                    data-testid="edit-button-save"
                    type="submit"
                  >
                    Cancelar
                  </button>
                  <button
                    name="salvar"
                    onClick={ this.redirecionando }
                    disabled={ this.validateBtn() }
                    data-testid="edit-button-save"
                    type="submit"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            )}
        </div>
        {redirect && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfilesEdit;
