import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Path from "../../common/path";
import {App} from "./app";
import {MemoryRouter} from "react-router-dom";
import {getMockOfferTransformed} from "../../common/test-stubs";
import Main from "../main/main";
import SignIn from "../sign-in/sign-in";
import Offer from "../offer/offer";

Enzyme.configure({adapter: new Adapter()});

jest.mock(`../main/main`, () => jest.fn().mockReturnValue(null));
jest.mock(`../sign-in/sign-in`, () => jest.fn().mockReturnValue(null));
jest.mock(`../offer/offer`, () => jest.fn().mockReturnValue(null));

const mockOffers = [getMockOfferTransformed(0, `city1`)];

describe(`Routes works correctly`, () => {
  it(`To main page`, () => {
    mount(<MemoryRouter initialEntries={[Path.INDEX]}>
      <App
        activeCity={`city1`}
        offersInCity={mockOffers}
        isOffersLoaded={true}
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
        cities={[``]}
        isOffersLoaded={true}
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
        cities={[``]}
        offers={mockOffers}
        isOffersLoaded={true}
        onCityClick={jest.fn()}
        onSignIn={jest.fn()}
      />
    </MemoryRouter>);

    expect(Offer).toHaveBeenCalled();
  });
});
