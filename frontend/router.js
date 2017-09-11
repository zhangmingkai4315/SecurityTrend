import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import SecurityTrendsList from './components/SecurityTrendsList';

const RouterComponent = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene
          key="securityTrendsList"
          component={SecurityTrendsList}
          title="Security Trends"
        />
        <Scene
          key="login"
          component={Login}
          title="Login"
        />
        <Scene
          key="register"
          component={Register}
          title="Register"
        />
      </Stack>
    </Router>
  );
};

export default RouterComponent;
