import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";
import {createMapBlock} from "../../common/test-stubs";

const mockOffers = {
  1: {
    city: {
      name: `1`,
      location: {
        latitude: 0,
        longitude: 0,
      },
    },
    offers: [
      {
        id: 1,
        title: `Title`,
        type: `apartment`,
        priceByNight: 0,
        location: {
          latitude: 0,
          longitude: 0,
        },
      },
      {
        id: 2,
        title: `Title`,
        type: `apartment`,
        priceByNight: 0,
        location: {
          latitude: 0,
          longitude: 0,
        },
      },
    ],
  },
  2: {
    city: {
      name: `2`,
      location: {
        latitude: 0,
        longitude: 0,
      }
    },
    offers: [
      {
        id: 3,
        title: `Title`,
        type: `apartment`,
        priceByNight: 0,
        location: {
          latitude: 0,
          longitude: 0,
        },
      },
    ],
  },
};

describe(`Main page correctly renders after relaunch`, () => {
  it(`With offers`, () => {
    createMapBlock();

    const tree = renderer
      .create(<Main
        offers={mockOffers}
        cities={[`1`, `2`]}
        activeCity={`1`}
        onCityClick={jest.fn()}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Without offers`, () => {
    const tree = renderer
      .create(<Main
        isEmpty={true}
        cities={[`1`, `2`]}
        activeCity={`1`}
        onCityClick={jest.fn()}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
