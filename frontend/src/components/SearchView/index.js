import React from "react";
import Search from './../Search'

class SearchView extends React.Component {
    constructor(props)
    {
        super(props)
        console.log(props)
    }
  render() {
    return (
      <div className = "searchView">
        <div className="container">
        <Search keyword = {this.props.match.params.id}/>
        </div>
        </div>
    );
  }
}

export default SearchView;
