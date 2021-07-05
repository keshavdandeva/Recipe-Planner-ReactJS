import React, { Component } from 'react';
import List from './list';
import postData from './update';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'recipes': {},
    }
  }

  componentDidMount(){
    fetch('/index')
      .then(response => response.json())
      .then(data => this.setState({'recipes': data}));
  }

  handleEdit(recipe, e){
    window.location.href = "/edit/" + recipe 
  }

  handleAdd(){
    window.location.href = "/add_recipe" 
  }

  handleDelete(recipe, e){
    var data = {"delete": recipe}
    postData('http://localhost:5000/destroy/' + recipe, data, 'DELETE')
      .then(data => console.log(data))
    console.log(data)
    var rec = {};
    var obj = this.state.recipes
    for (var key in obj) {
      if ( key === recipe ) {
        continue;
      } else {
        rec[key] = obj[key];
      }
    }
    this.setState({'recipes': rec})
  }

  render() {
    var recipes = [];
    var obj = this.state.recipes
    for (var key in obj) {
      var ingredients = [];
      console.log(key);
      var val = obj[key];
      console.log(val)
      var description = val["recipe"];
      for (var k in val) {
        if ( k === "recipe" ) {
          continue;
        } else {
          var value = val[k]
          console.log(value);
          ingredients.push(k + ": " + value);
        }
      }
      var insert = (
        <>
          <div className="column is-5">
              <List recipe={key} key={key} description={description} ingredients={ingredients}/>
              <div className="card-footer">
              <button class="button is-primary" onClick={this.handleEdit.bind(this, key)}>Edit Recipe</button>
              <button class="button is-danger" onClick={this.handleDelete.bind(this, key)}>Delete Recipe</button>
              </div>
            </div>
          
        </>
      )
      recipes.push(insert);
    }
    console.log(this.state.recipes)
    return (
      <>
        <div className="container p-3">
           <div className="level">
            <div className="level-left">
              <p className="is-size-3">List of Available Recipes:</p>
            </div>
            <div className="level-right">
              <button class="button is-dark" onClick={this.handleAdd}>Add New Recipe</button>
            </div>
          </div>
          <div className="columns is-multiline">
            {recipes}
          </div>
        </div>
        </>
    );
  }
}

export default Home;