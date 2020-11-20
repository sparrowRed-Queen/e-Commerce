import React, {Component} from 'react';
import {Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Start from './component/start';
import AdminLogin from './component/AdminLogin';
import User from './component/Form';
import Register from './component/Register';
import AdminHome from './component/admin/AdminHome';
import Home from './component/Home';
import Product from './component/Product';
import WishList from './component/WishList';
import Cart from './component/Cart';
import Default from './component/Default';

class App extends Component {
  render()  {
    return(
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Start} />
          <Route path="/adminlogin" component={AdminLogin} />
          <Route path="/adminhome" component={AdminHome} />
          <Route path="/user" component={User} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={Home} />
          <Route path="/product" component={Product} />
          <Route path="/wishlist" component={WishList} />
          <Route path="/cart" component={Cart} />
          <Route component={Default} />
        </Switch>
      </React.Fragment>
    )
  }
}

export default App;
