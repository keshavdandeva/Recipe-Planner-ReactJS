import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './home';
import AddRecipe from './add_recipe';
import ShoppingList from './shopping_list';
import Edit from './edit';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import logo from './logo.png'


class App extends Component {
  render() {
    return (
     <Router>
      <div className="App">
        <AppBar position="dynamic">
          <Toolbar>
          <img src={logo} alt="Logo" />
            <Typography variant="h5" >
              RecipePlanner
            </Typography>
            <Button color="inherit" href="/">Home</Button>
            <Button color="inherit" href="/shopping_list">Shopping List</Button>
            <div className="container p-3">
            <div className="level">
            <div className="level-right">
            <Typography variant="subtitle">
              - EGUI Lab-3 by Keshav Dandeva [302333] -
            </Typography>
            </div>
            </div>
            </div>
          </Toolbar>
        </AppBar>
        <hr/>
         
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/add_recipe' component={AddRecipe} />
              <Route path='/shopping_list' component={ShoppingList} />
              <Route path='/edit/:key' component={Edit} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;




