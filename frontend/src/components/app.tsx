import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/home-page';
import GuildPage from './pages/guild-page';
import LoginPage from './pages/auth/login-page';
import RegisterPage from './pages/auth/register-page';
import OverviewPage from './pages/overview-page';
import LogoutPage from './pages/auth/logout-page';
import PrivateRoute from './routing/private-route';
import NotFoundPage from './pages/not-found-page';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import fetchEntities from '../store/actions/fetch-entities';
import { ready } from '../store/auth';
import { initPings } from '../store/pings';
import VerifyPage from './pages/auth/verify-page';

export default function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(ready());
    dispatch(fetchEntities());
    dispatch(initPings());
  }, []);
  
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/logout" component={LogoutPage} />
        <Route exact path="/verify" component={VerifyPage} />

        <PrivateRoute exact path="/channels/@me" component={OverviewPage} />
        <PrivateRoute exact path="/channels/:guildId/:channelId?" component={GuildPage} />

        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
}
