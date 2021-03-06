import React, { Component } from "react";
import { MDBContainer } from "mdbreact";
import List from "./List";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import { fetchRecipes } from "../../store/actions/recipesActions";

class Catalog extends Component {
  constructor(props) {
    super(props);

    this.props.fetchRecipes(this.props.filter ? this.props.filter : null);

    this.handleSort = this.handleSort.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.filter && prevProps.filter[0] !== this.props.filter[0]) {
      if (prevProps.isLoading) {
        setTimeout(this.props.fetchRecipes(this.props.filter ? this.props.filter : null), 500);
      } else {
        this.props.fetchRecipes(this.props.filter ? this.props.filter : null);
      }
    }
  }

  static get propTypes() {
    return {
      fetchRecipes: PropTypes.func,
      searchRecipes: PropTypes.func,
      recipes: PropTypes.array,
      filter: PropTypes.array,
    };
  }

  handleSort(order) {
    this.props.fetchRecipes(
      this.props.filter ? this.props.filter : null,
      order
    );
  }

  handleSearch(searchString) {
    this.props.fetchRecipes(
      this.props.filter ? this.props.filter : null,
      ["name", "asc"],
      searchString
    );
  }

  render() {
    return (
      <MDBContainer fluid>
        <SearchBar
          handleSort={this.handleSort}
          handleSearch={this.handleSearch}
        />
        <List recipes={this.props.recipes} />
      </MDBContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.data,
    isLoading: state.recipes.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: (order, filter, searchString) =>
    dispatch(fetchRecipes(order, filter, searchString)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
