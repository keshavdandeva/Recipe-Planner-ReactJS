import React, { Component } from 'react';
import postData from './update';


class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'ingredients': {},
      'quantity': '',
      'title': '',
      'directions': '',
      'unit': '',
      'ingredient': ''
    }
    this.onChange = this.onChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state)
  }

  handleAdd(){
    var float = parseFloat(this.state.quantity).toFixed(2);
    var uAndQ = float.toString() + " " + this.state.unit;
    console.log(uAndQ);
    var data = this.state.ingredients
    data[this.state.ingredient] = uAndQ
    this.setState({'ingredients': data})
  }

  handleDelete(key, e){
    var obj = this.state.ingredients;
    var data = {};
    for (var keys in obj) {
      if (keys === key) {
        continue;
      } else {
        data[keys] = obj[keys]
      }
    }
    this.setState({'ingredients': data})
  }

  handleSubmit(){
    if (this.state.title !== "") {
      var data = {}
      data[this.state.title] = {}
      data[this.state.title]["recipe"] = this.state.directions.split("\n");
      var obj = this.state.ingredients
      for ( var key in obj ) {
        data[this.state.title][key] = obj[key];
      }
      console.log(data)
      postData('http://localhost:5000/add_recipe', data, "POST")
    }
    window.location.href = '/'
  }

  render() {
    var obj = this.state.ingredients
    var insert = [];
    for (var key in obj) {
      if ( key === 'recipe' ) {
        var directions = obj[key]
        directions = directions.join("\n");
      } else {
        var ingredients = key
          var quantity = obj[key]
          var holder = (
            <div class="columns">
              <div class="column">
                 <p>{ingredients}</p>
              </div>
              <div className="column">
                <p>{quantity}</p>
              </div>
              <div class="column">
                  <div class="field">
                      <div class="control">
                          <button class="button is-danger" onClick={this.handleDelete.bind(this, key)}>
                          Delete Ingredient
                          </button>
                      </div>
                  </div>
              </div>
          </div>
          )
          insert.push(holder);
        }
      }
    return (
         <>
        <div className="columns">
          <div className="column">
            <p className="is-size-2">Create a New Recipe</p>
            <p className="is-size-6">Fill in the name, description and ingredients of the recipe below. Click on Save Recipe and your recipe will be added to the collection :)</p>
          </div>
        </div>  

      <div class="columns">
        <div class="column">
            <div class="field">
                <label class="label">Name of Recipe</label>
                <div class="control">
                    <input class="input" type="text" placeholder="e.g Lasagna" name="title" onChange={this.onChange}/>
                </div>
            </div>
        </div>
        
    </div>
    <div class="field">
        <label class="label">Description</label>
        <div class="control">
            <textarea class="textarea" placeholder="e.g Order from pyszne" name="directions" onChange={this.onChange}>
            </textarea>
        </div>
    </div>
    {insert}
    <label class="label">Ingredients</label>
    <div class="columns">
        
              <div class="column">
                  <div class="field">
                      <div class="control">
                          <input class="input" type="text" placeholder="e.g Mozarella Cheese" name="ingredient" onChange={this.onChange}/>
                      </div>
                  </div>
              </div>
              <div class="column">
                  <div class="field">
                      <div class="control">
                          <input class="input" type="text" placeholder="e.g 255.5" name="quantity" onChange={this.onChange}/>
                      </div>
                  </div>
              </div>
              <div class="column">
                  <div class="field">
                      <div class="control">
                          <input class="input" type="text" placeholder="e.g gram" name="unit" onChange={this.onChange}/>
                      </div>
                  </div>
              </div>
              <div class="column">
                  <div class="field">
                      <div class="control">
                          <button class="button is-info" onClick={this.handleAdd}>
                          Add Ingredient
                          </button>
                      </div>
                  </div>
              </div>
          </div>
          <button type="submit" class="button is-success" onClick={this.handleSubmit}>Save Recipe</button>

        </>
    );
  }
}

export default AddRecipe;