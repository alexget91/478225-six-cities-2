import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Path from "../../common/path";
import {App} from "./app";
import {MemoryRouter} from "react-router-dom";
import {getMockOffer} from "../../common/test-stubs";
import Main from "../main/main";
import SignIn from "../sign-in/sign-in";
import Offer from "../offer/offer";

Enzyme.configure({adapter: new Adapter()});

jest.mock(`../main/main`, () => jest.fn().mockReturnValue(null));
jest.mock(`../sign-in/sign-in`, () => jest.fn().mockReturnValue(null));
jest.mock(`../offer/offer`, () => jest.fn().mockReturnValue(null));

const mockOffer = getMockOffer(1, `city1`);
const mockOffers = {
  allOffers: {
    1: mockOffer
  },
  offersByCities: {
    city1: [mockOffer],
    city2: []
  },
};

describe(`Routes works correctly`, () => {
  it(`To main page`, () => {
    mount(<MemoryRouter initialEntries={[Path.INDEX, Path.LOGIN]}>
      <App
        activeCity={`city1`}
        offers={mockOffers}
        cities={[`city1`, `city2`]}
        onCityClick={jest.fn()}
        onSignIn={jest.fn()}
      />
    </MemoryRouter>);

    expect(Main).toHaveBeenCalled();
  });

  it(`To login page`, () => {
    mount(<MemoryRouter initialEntries={[Path.LOGIN]}>
      <App
        cities={[`city1`, `city2`]}
        isAuthorizationRequired={true}
        onCityClick={jest.fn()}
        onSignIn={jest.fn()}
      />
    </MemoryRouter>);

    expect(SignIn).toHaveBeenCalled();
  });

  it(`To offer page`, () => {
    mount(<MemoryRouter initialEntries={[`${Path.OFFER}/0`]}>
      <App
        cities={[`city1`, `city2`]}
        offers={mockOffers}
        onCityClick={jest.fn()}
        onSignIn={jest.fn()}
      />
    </MemoryRouter>);

    expect(Offer).toHaveBeenCalled();
  });
});
