import * as React from "react";
import * as renderer from "react-test-renderer";
import Favorites from "./favorites";
import {getMockOfferTransformed} from "../../common/test-stubs";
import {MemoryRouter} from "react-router-dom";

describe(`Favorites correctly renders after relaunch`, () => {
  it(`With content`, () => {
    const tree = renderer
      .create(<MemoryRouter><Favorites
        isLoaded={true}
        offers={{
          city: [getMockOfferTransformed(1, `city`, true)],
        }}
      /></MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`When empty`, () => {
    const tree = renderer
      .create(<Favorites
        isLoaded={true}
        offers={{}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`When is not loaded`, () => {
    const tree = renderer
      .create(<Favorites/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
