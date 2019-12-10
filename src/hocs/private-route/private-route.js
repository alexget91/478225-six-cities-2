import React from "react";
import PropTypes from "prop-types";
import {Redirect, Route} from "react-router-dom";
import Path from "../../common/path";

const PrivateRoute = (props) => {
  const Component = props.render;

  return <Route
    {...props}
    render={(routerProps) => props.isAuthorizationRequired
      ? <Redirect to={Path.LOGIN}/>
      : <Component {...routerProps}/>
    }
  />;
};

PrivateRoute.propTypes = {
  isAuthorizationRequired: PropTypes.bool,
  render: PropTypes.func.isRequired,
};


export default PrivateRoute;
