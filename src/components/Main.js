require('normalize.css/normalize.css');
require('styles/Home.css');
require('styles/Common.css');
require('styles/BigMenuItem.css');
require('styles/LoadingIndicator.css');



import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import PrivateRoute from './Util/PrivateRoute';
import Home from './ViewController/Home';
import UserPage from './ViewController/UserPage';


class AppComponent extends React.Component {
  render() {
    return(
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/user" component={UserPage}/>
        </div>
      </Router>
    );

  }
}


AppComponent.defaultProps = {
};

export default AppComponent;
