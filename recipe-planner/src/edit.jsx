import React, { Component } from 'react';
import postData from './update';


class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "recipes": {}
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.directionsChange = this.directionsChange.bind(this);
  }

  componentDidMount(){
    var data = {}
    console.log(window.location.pathname)
    console.log("http://localhost:5000" + window.location.pathname)
    fetch("http://localhost:5000" + window.location.pathname)
      .then(response => response.json())
      .then(data => this.setState({'recipes': JSON.parse(data)}), console.log(data));
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  nameChange(e){
    var recipeName = Object.keys(this.state.recipes);
    var data = this.state.recipes.[recipeName[0]]
    this.setState({'recipes': {[e.target.value]: data}})
    console.log(this.state)
  }

  directionsChange(e){
    var recipeName = Object.keys(this.state.recipes);
    var data = e.target.value.split("\n");
    var state = this.state.recipes;
    state[recipeName[0]]['recipe'] = data;
    this.setState({'recipes': state})
  }

  handleAdd(){
    var recipeName = Object.keys(this.state.recipes);
    var float = parseFloat(this.state.quantity).toFixed(2);
    var uAndQ = float.toString() + " " + this.state.unit;
    console.log(uAndQ);
    var data = this.state.recipes.[recipeName[0]]
    data[this.state.ingredient] = uAndQ
    this.setState({'recipes': {[recipeName[0]]: data}})
  }

  handleDelete(key, e){
    var recipeName = Object.keys(this.state.recipes);
    var obj = this.state.recipes.[recipeName[0]];
    var data = {};
    for (var keys in obj) {
      if (keys === key) {
        continue;
      } else {
        data[keys] = obj[keys]
      }
    }
    this.setState({'recipes': {[recipeName[0]]: data}})
  }

  handleSubmit(){
    var data = this.state.recipes
    console.log(data);
    postData('http://localhost:5000' + window.location.pathname, data, "POST")
      .then(data => console.log(data))
    window.location.href = '/'
  }

  render() {
    console.log(this.state)
    var recipeName = Object.keys(this.state.recipes);
    var obj = this.state.recipes.[recipeName[0]]
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
            <p className="is-size-2">Edit Recipe</p>
            <p className="is-size-6">Edit the name, description and ingredients of the recipe below. Click on Save Changes and the changed recipe will be added to the collection :)</p>
          </div>
        </div>  

      <div class="columns">
        <div class="column">
            <div class="field">
                <label class="label">Name of Recipe</label>
                <div class="control">
                    <input class="input" type="text" placeholder="e.g Lasagna" defaultValue={recipeName[0]} onChange={this.nameChange}/>
                </div>
            </div>
        </div>
        
    </div>
    <div class="field">
        <label class="label">Description</label>
        <div class="control">
            <textarea class="textarea" placeholder="e.g Order from pyszne" name="description" defaultValue={directions} onChange={this.directionsChange}>
            </textarea>
        </div>
    </div>
    <label class="label">Ingredients</label>
    {insert}
    
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
                          <button class="button is-primary" onClick={this.handleAdd}>
                          Add Ingredient
                          </button>
                      </div>
                  </div>
              </div>
          </div>
          <button type="submit" class="button is-link" onClick={this.handleSubmit}>Save Changes</button>

        </>
    );
  }
}

export default Edit;