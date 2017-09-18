import React from 'react';
import { Scene, Router, Stack, Actions} from 'react-native-router-flux';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import SecurityTrendsList from './components/SecurityTrendsList';
import SecurityTrendDetail from './components/SecurityTrendDetail';
import AboutMe from './components/AboutMe';

const RouterComponent = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene
          key="securityTrendsList"
          component={SecurityTrendsList}
          title="每日新闻"
        />
        <Scene
          key="securityTrendDetail"
          component={SecurityTrendDetail}
          onLeft={() => Actions.securityTrendsList() } 
          title="新闻详情" />
        <Scene
          key="aboutme"
          component={AboutMe}
          title="我的主页" />
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
