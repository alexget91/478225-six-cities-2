import * as React from "react";
import {Redirect, Route} from "react-router-dom";
import Path from "../../common/path";

interface Props {
  isAuthorizationRequired?: boolean,
  render: () => React.ReactElement,
  [propName: string]: any,
}

const PrivateRoute = (props: Props) => {
  const Component = props.render;

  return <Route
    {...props}
    render={(routerProps) => props.isAuthorizationRequired
      ? <Redirect to={Path.LOGIN}/>
      : <Component {...routerProps}/>
    }
  />;
};

export default PrivateRoute;
