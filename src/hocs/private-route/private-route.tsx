import * as React from "react";
import {Redirect, Route} from "react-router-dom";
import Path from "../../common/path";
import {AnyProps} from "../../common/types";

interface Props {
  isAuthorizationRequired?: boolean,
  render: () => React.ReactElement,
  [propName: string]: any,
}

const PrivateRoute = (props: Props): React.ReactElement => {
  const Component = props.render;

  return <Route
    {...props}
    render={(routerProps: AnyProps): React.ReactElement => props.isAuthorizationRequired
      ? <Redirect to={Path.LOGIN}/>
      : <Component {...routerProps}/>
    }
  />;
};

export default PrivateRoute;
