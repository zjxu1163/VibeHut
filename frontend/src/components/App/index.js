import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import AddNewSong from '../AddNewSong';
import Landing from '../Landing';
import GeneratePlaylist from '../GeneratePlaylist';
import Recommendations from '../Recommendations';
import SongForm from '../SongForm';
import playlistform from '../PlaylistForm';
import Login from '../Login';
import CreateAccount from '../CreateAccount';
import UserDashboard from '../UserDashboard';
import Settings from '../Settings';

/*
function requireAuth(nextState, replace, next) {
  if (!authenticated) {
    replace({
      pathname: "/login",
      state: {nextPathname: nextState.location.pathname}
    });
  }
  next();
}
*/
function requireAuth() {

};

const App = () => (
  <Router>
    <div>
    <Route exact path={ROUTES.LANDING} component={Landing} />
    <Route path={ROUTES.ADD_NEW_SONG} component={AddNewSong} onEnter={requireAuth} />
    <Route path={ROUTES.GENERATE_PLAYLIST} component={GeneratePlaylist} onEnter={requireAuth} />
    <Route path={ROUTES.PLAYLISTFORM} component={playlistform} onEnter={requireAuth} />
    <Route path={ROUTES.RECOMMENDATIONS} component={Recommendations} onEnter={requireAuth} />
    <Route path={ROUTES.SONGFORM} component={SongForm} onEnter={requireAuth} />
    <Route path={ROUTES.LOGIN} component={Login} />
    <Route path={ROUTES.USERDASHBOARD} component={UserDashboard} onEnter={requireAuth} />
    <Route path={ROUTES.CREATEACCOUNT} component={CreateAccount} /> 
    <Route path={ROUTES.SETTINGS} component={Settings} />
    </div>
  </Router>
  
);

export default App;