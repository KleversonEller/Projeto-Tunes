import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import logo from '../images/logo.svg';
import style from '../css/Login.module.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      validateBtn: true,
      inputLogin: '',
      logado: false,
      loading: <Loading wid="300px" />,
    };
    this.btnValidate = this.btnValidate.bind(this);
    this.loginInput = this.loginInput.bind(this);
    this.parameterObject = this.parameterObject.bind(this);
  }

  loginInput(event) {
    this.setState({
      [event.target.name]: event.target.value,
    }, this.btnValidate);
  }

  btnValidate() {
    const { inputLogin } = this.state;
    const qntCharacter = 3;
    return inputLogin.length >= qntCharacter
      ? this.setState({
        validateBtn: false,
      })
      : this.setState({
        validateBtn: true,
      });
  }

  async parameterObject(event) {
    event.preventDefault();
    const { inputLogin } = this.state;
    this.setState({
      logado: true,
    });
    await createUser({ name: inputLogin });
    this.setState({
      loading: <Redirect to="/search" />,
    });
  }

  render() {
    const { state } = this;
    return (
      <div data-testid="page-login" className={ style.container }>
        {state.logado
          ? state.loading
          : (
            <form className={ style.wrapper }>
              <img src={ logo } alt="Ilustração de ondas sonoras em formato de torre" />
              <input
                data-testid="login-name-input"
                placeholder="Login"
                id="name"
                type="text"
                name="inputLogin"
                value={ state.inputLogin }
                onChange={ this.loginInput }
              />
              <button
                disabled={ state.validateBtn }
                data-testid="login-submit-button"
                type="submit"
                onClick={ this.parameterObject }
              >
                Entrar
              </button>
            </form>
          )}
      </div>
    );
  }
}

export default Login;
