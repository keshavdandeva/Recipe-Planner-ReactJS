import React, { Component } from 'react';

class List extends Component {
  render() {
    var ingredients = this.props.ingredients;
    if (ingredients.length > 1) {
        ingredients = ingredients.join("\n"); }
    return (
      <>
        <h1 className="title">{this.props.recipe}</h1>
        <div>
          <p>{this.props.description}</p>
          <br></br>
          <h2 className="subtitle">Ingredients</h2>
          <pre>{ingredients}</pre>
        </div>
      </>
    );
  }
}

export default List;