import React from "react";
import { NavLink } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import "./Header.scss";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const Header = (props) => {
  const { isSignedIn } = props;
  return (
    <header className="header">
      <Container>
        <Row className="justify-content-between">
          <Col xs="auto">
            <NavLink exact className="header__link header__title" to="/photos">
              Photo App Project
            </NavLink>
          </Col>
          <Col xs="auto">
            <NavLink
              className="header__link "
              to="/sign-in"
              activeClassName="header__link--active"
            >
              {isSignedIn ? (
                <p>Hello {firebase.auth().currentUser.displayName}</p>
              ) : (
                "Sign In"
              )}
            </NavLink>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

Header.propTypes = {};

export default Header;
