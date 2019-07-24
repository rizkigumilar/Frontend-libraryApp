import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Home from './Routing/Route';
import store from './Publics/redux/store';


// injectTapEventPlugin();
class App extends Component {
  
  render() {

    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

export default App;
