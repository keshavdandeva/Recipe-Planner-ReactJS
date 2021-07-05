import React, { Component } from 'react';

class ShoppingList extends Component {
  constructor(props){
    super(props);
    this.state = {
      'recipes': {},
      "addedRecipes": [],
      "ingredients": [],
      "recipe": "",
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount(){
    fetch('http://localhost:5000/index')
      .then(response => response.json())
      .then((data) => {this.setState({
        'recipes': data, 
        'recipe':  Object.keys(data)[0]
      },
    )
      for (var key in data) {
        for (var k in data[key]) {
          if (k !== "recipe") {
            var holder = this.state.ingredients
            holder[k] = []
            this.setState({"ingredients": holder}) 
          }
        }
    }
    });

  }

  handleAdd(){
    var data = this.state.addedRecipes;
    data.push(this.state.recipe)
    this.setState({"addedRecipes": data})
    var obj = this.state.recipes[this.state.recipe]
    for (var key in obj) {
      if (key !== "recipe") {
        var holder = this.state.ingredients[key]
        var store = obj[key]
        if (holder.length > 0) {
          var array = this.state.ingredients[key]
          var i = 0
          store = store.split(' ')
          var storeValue = store.shift()
          holder.forEach((element) => {
            var compare = element.split(' ');
            var value = compare.shift()
            if (store[0] === compare[0]) {
              value = parseFloat(storeValue) + parseFloat(value)
              var composition = value.toFixed(2) + " " + compare[0]
              array.splice(i, i + 1);
              array.push(composition)
            } else {
              composition = storeValue + " " + store[0];
              array.push(composition)
            }
            i++;
          })
          var state = this.state.ingredients
          state[key] = array
          this.setState({"ingredients": state})
        } else {
          holder.push(store)
          state = this.state.ingredients
          state[key] = holder
          this.setState({"ingredients": state})
        }
      }
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDelete(key, e){
    var array = this.state.addedRecipes
    for( var i = 0; i < array.length; i++){ 
      if ( array[i] === key) { 
        array.splice(i, 1);
        break; 
      }
    }
    this.setState({"addedRecipes": array});
    var obj = this.state.recipes[key]
    for (var k in obj) {
      if (k !== "recipe") {
        var holder = this.state.ingredients[k]
        var store = obj[k]
        if (holder.length > 0) {
          array = this.state.ingredients[k]
          i = 0
          store = store.split(' ')
          var storeValue = store.shift()
          holder.forEach((element) => {
            var compare = element.split(' ');
            var value = compare.shift()
            if (store[0] === compare[0]) {
              value =  parseFloat(value) - parseFloat(storeValue)
              if (value > 0 ) {
                var composition = value.toFixed(2) + " " + compare[0]
                array.splice(i, i + 1);
                array.push(composition)  
              } else {
                array.splice(i, 1)
              }
            }
            i++;
          })
          var state = this.state.ingredients
          state[k] = array
          this.setState({"ingredients": state})
        }
        }
      }
    }

  render() {
    var options = []
    var obj = this.state.recipes
    for ( var key in obj) {
      options.push(<option value={key}>{key}</option>)
    }
    var addedRecipes = []
    var o = this.state.addedRecipes
    o.forEach((element) => {
      for (var key in obj) {
        if (key === element ) {
          addedRecipes.push(
            <div class="columns">
              <div class="column ">
                  <p> {key} </p>
                </div>
                <div class="column">
                  <button class="button is-warning" onClick={this.handleDelete.bind(this, key)}>Remove</button>
                </div>
            </div>
          )
        }
      }
    })
    var shoppingList = [];
    var object = this.state.ingredients
    var counter = 0;
    var array = Object.keys(object).sort()
    for (var i = 0; i < array.length; i++ ) {
      counter++;
      if ( object[array[i]].length > 0) {
        object[array[i]].forEach((element) => {
          shoppingList.push(
            <div class="columns">
              <div class="column">
                  <p> {array[i]} </p>
                </div>
                <div class="column">
                  <p>{element}</p>
                </div>
            </div>
          )
        })
      }
    }
    return (
        <div>
          <p class="is-size-2">Shopping List</p>
          <p className="is-size-6">Welcome to your shopping list. Add recipes you want to cook and see the ingredients you need to buy. Have fun :)</p>
              <div class="column">
                  <div class="select is-success">
                      <select name="recipe" class="select" onChange={this.onChange} defaultValue="Pizza">
                        {options}
                      </select>
                  </div>
              </div>
              <div class="column">
                <button class="button is-primary" onClick={this.handleAdd}>Add Recipe</button>
              </div>
            
              <div class="columns">
                  <div class="column ">
                    <p class="is-size-5">Recipes to Cook:</p>
                    {addedRecipes}
                  </div>
                  <div class="column ">
                    <p class="is-size-5">Ingredients to Buy:</p>
                      {shoppingList}
                  </div>
                </div>
        </div>
    );
  }
}

export default ShoppingList;