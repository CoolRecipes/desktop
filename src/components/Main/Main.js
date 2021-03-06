import React, { Component } from "react";
import store from "../../store/store";
import PropTypes from "prop-types";
import "./Main.css";

import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";

import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import Sidebar from "./Sidebar";
import Routes from "../../Router/Routes";
import { MDBBtn, MDBContainer, MDBIcon, MDBNav, MDBNavbar } from "mdbreact";
import { Link, Redirect } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuToggle: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.authButtons = this.authButtons.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  static get propTypes() {
    return {
      signOut: PropTypes.func,
    };
  }

  handleClick(e) {
    e.preventDefault();
    this.props.signOut();
    return <Redirect to="/posts/" />;
  }

  toggleMenu(e) {
    e.preventDefault();
    this.setState(
      this.state.menuToggle ? { menuToggle: false } : { menuToggle: true }
    );
  }

  authButtons() {
    if (
      !store.getState().firebase.auth.isEmpty &&
      store.getState().firebase.auth.isLoaded
    ) {
      return (
        <MDBContainer>
          <Link to="/editor">
            <MDBBtn>
              <MDBIcon icon="plus" className="mr-1" />
              <span>Dodaj przepis</span>
            </MDBBtn>
          </Link>
          <MDBBtn onClick={this.handleClick}>Wyloguj</MDBBtn>
        </MDBContainer>
      );
    } else {
      return (
        <MDBContainer>
          <LoginModal />
          <RegisterModal />
        </MDBContainer>
      );
    }
  }

  render() {
    return (
      <div
        className={`d-flex ${this.state.menuToggle ? "toggled" : ""}`}
        id="wrapper"
      >
        <Sidebar />

        <div id="page-content-wrapper">
          <MDBNavbar className="border-bottom" style={{ boxShadow: "none" }}>
            <button
              type="button"
              className="navbar-toggler"
              onClick={this.toggleMenu}
            >
              <MDBIcon
                icon="bars"
                className="navbar-toggler-icon d-flex align-items-center"
              ></MDBIcon>
            </button>
            <MDBNav className="mr-auto">
              <span>Cool</span>
              <span className="font-weight-bold">Recipes</span>
            </MDBNav>
            <MDBNav>{this.authButtons()}</MDBNav>
          </MDBNavbar>

          <Routes />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoaded: state.firebase.auth.isLoaded,
    isEmpty: state.firebase.auth.isEmpty,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
