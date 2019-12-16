import * as React from "react";
import * as renderer from "react-test-renderer";
import {App} from "./app";
import {createMapBlock, getMockOfferTransformed} from "../../common/test-stubs";
import {MemoryRouter} from "react-router-dom";

describe(`App correctly renders after relaunch`, () => {
  it(`When offers not loaded`, () => {
    const tree = renderer
      .create(<MemoryRouter><App
        cities={[`city1`, `city2`]}
        onCityClick={jest.fn()}
        onSignIn={jest.fn()}
      /></MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`When offers loaded`, () => {
    createMapBlock();

    const tree = renderer
      .create(<MemoryRouter><App
        isOffersLoaded={true}
        activeCity={`city1`}
        offersInCity={[getMockOfferTransformed(1, `city1`)]}
        cities={[`city1`, `city2`]}
        isAuthorizationRequired={true}
        onCityClick={jest.fn()}
        onSignIn={jest.fn()}
      /></MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
