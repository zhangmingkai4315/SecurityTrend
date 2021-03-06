import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';
import Router from './router';
import FooterTabComponent from './components/FooterTabComponent';

class App extends Component {
  componentWillMount() {
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Router />
          <FooterTabComponent />
        </View>
      </Provider>
    );
  }
}

export default App;
