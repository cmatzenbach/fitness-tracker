import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './config/theme.config';

const App: FunctionComponent = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
