/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { signIn } from "../store/actions/authActions";
import { connect } from "react-redux";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email.")
    .required("The email is required."),
  password: Yup.string().required("The passoword is required."),
});

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.showModal}>
          Login
        </Button>

        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header>Login</Modal.Header>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(credentials, { setSubmitting }) => {
              this.props.onSubmit(credentials);
            }}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <Modal.Body>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Password</label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      placeholder="Your password..."
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isValid}
                  >
                    Login
                  </button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (credentials) => dispatch(signIn(credentials)),
});

export default connect(null, mapDispatchToProps)(LoginModal);
