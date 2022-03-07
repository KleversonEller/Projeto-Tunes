import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Profiles from '../pages/Profile';
import ProfilesEdit from '../pages/ProfileEdit';
import NotFound from '../pages/NotFound';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/search" component={ Search } />
        <Route exact path="/album/:id" render={ (props) => <Album { ...props } /> } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profiles } />
        <Route exact path="/profile/edit" component={ ProfilesEdit } />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default Routes;
