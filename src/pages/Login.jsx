import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            Digite seu nome:
            <input data-testid="login-name-input" id="name" type="text" />
          </label>
        </form>
      </div>
    );
  }
}

export default Login;
