import React from "react";
import PropTypes from "prop-types";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MemoryRouter, Route, Switch} from "react-router-dom";
import Path from "../../common/path";
import PrivateRoute from "./private-route";

Enzyme.configure({adapter: new Adapter()});

describe(`HOC PrivateRoute`, () => {
  const MockComponent = () => <div/>;
  const MockLoginPage = () => <div/>;

  const MockRouter = (props) => <MemoryRouter>
    <Switch>
      <Route exact path={Path.LOGIN} component={MockLoginPage}/>
      <PrivateRoute
        isAuthorizationRequired={props.isAuthorizationRequired}
        render={() => <MockComponent/>}
      />
    </Switch>
  </MemoryRouter>;

  MockRouter.propTypes = {
    isAuthorizationRequired: PropTypes.bool,
  };

  it(`Return component if user is authorized`, () => {
    const wrapper = mount(<MockRouter/>);
    expect(wrapper.find(MockComponent)).toHaveLength(1);
  });

  it(`Return redirect to main page if user is not authorized`, () => {
    const wrapper = mount(<MockRouter isAuthorizationRequired={true}/>);
    expect(wrapper.find(MockLoginPage)).toHaveLength(1);
  });
});
