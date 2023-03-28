import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Search, Album, Favorites, Profile,
  ProfileEdit, NotFound } from './pages';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/search" component={ Search } />
      <Route exact path="/album/:id" component={ Album } />
      <Route exact path="/favorites" component={ Favorites } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/profile/edit" component={ ProfileEdit } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}
