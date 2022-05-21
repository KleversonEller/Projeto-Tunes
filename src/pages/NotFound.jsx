import React from 'react';
import { Link } from 'react-router-dom';
import style from '../css/NotFound.module.css';

class NotFound extends React.Component {
  render() {
    return (
      <div className={ style.container } data-testid="page-not-found">
        <span> Não foi possível encontrar a página que você está procurando.</span>
        <span>
          Por favor, volte para a página inicial do
          <Link className={ style.link } to="/search"> Trybe Tunes</Link>
        </span>
      </div>
    );
  }
}

export default NotFound;
