import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
