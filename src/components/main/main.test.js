import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";
import {createMapBlock, getMockOffer} from "../../common/test-stubs";
import {MemoryRouter} from "react-router-dom";


describe(`Main page correctly renders after relaunch`, () => {
  it(`With offers`, () => {
    createMapBlock();

    const tree = renderer
      .create(<MemoryRouter><Main
        offers={[
          getMockOffer(1, `city1`),
          getMockOffer(2, `city1`),
        ]}
        cities={[`city1`, `city2`]}
        activeCity={`city1`}
        onCityClick={jest.fn()}
      /></MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Without offers`, () => {
    const tree = renderer
      .create(<Main
        offers={[]}
        cities={[`1`, `2`]}
        activeCity={`1`}
        onCityClick={jest.fn()}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
