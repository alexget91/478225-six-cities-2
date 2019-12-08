import React from "react";
import PropTypes from "prop-types";
import {Redirect, Route} from "react-router-dom";
import Path from "../../common/path";

const PrivateRoute = ({render: Component, ...rest}) => {
  return <Route
    {...rest}
    render={(props) => rest.isAuthorizationRequired
      ? <Redirect to={Path.LOGIN}/>
      : <Component {...props}/>
    }
  />;
};

PrivateRoute.propTypes = {
  isAuthorizationRequired: PropTypes.bool,
  render: PropTypes.func.isRequired,
};


export default PrivateRoute;
