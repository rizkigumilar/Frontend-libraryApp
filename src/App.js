import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Route from './Routing/Route';
import store from './Publics/redux/store';


// injectTapEventPlugin();
class App extends Component {
  
  render() {

    return (
      <Provider store={store}>
        <Route />
      </Provider>
    );
  }
}

export default App;
