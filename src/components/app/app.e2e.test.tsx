import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import Path from "../../common/path";
import {App} from "./app";
import {MemoryRouter} from "react-router-dom";
import {getMockOffer} from "../../common/test-stubs";
import Main from "../main/main";
import SignIn from "../sign-in/sign-in";
import Offer from "../offer/offer";
import Favorites from "../favorites/favorites";

Enzyme.configure({adapter: new Adapter()});

jest.mock(`../main/main`, () => ({'default': jest.fn().mockReturnValue(null)}));
jest.mock(`../sign-in/sign-in`, () => ({'default': jest.fn().mockReturnValue(null)}));
jest.mock(`../offer/offer`, () => ({'default': jest.fn().mockReturnValue(null)}));
jest.mock(`../favorites/favorites`, () => ({'default': jest.fn().mockReturnValue(null)}));

const mockOffers = [getMockOffer(0, `city1`)];

describe(`Routes works correctly`, () => {
  it(`To main page`, () => {
    Enzyme.mount(<MemoryRouter initialEntries={[Path.INDEX]}>
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
    Enzyme.mount(<MemoryRouter initialEntries={[Path.LOGIN]}>
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
    Enzyme.mount(<MemoryRouter initialEntries={[`${Path.OFFER}/0`]}>
      <App
        cities={[``]}
        offers={mockOffers}
        isOffersLoaded={true}
        loadReviews={jest.fn()}
        onCityClick={jest.fn()}
        onSignIn={jest.fn()}
      />
    </MemoryRouter>);

    expect(Offer).toHaveBeenCalled();
  });

  it(`To favorites page`, () => {
    Enzyme.mount(<MemoryRouter initialEntries={[`${Path.FAVORITES}`]}>
      <App
        cities={[``]}
        favorites={mockOffers}
        isOffersLoaded={true}
        onCityClick={jest.fn()}
        onSignIn={jest.fn()}
      />
    </MemoryRouter>);

    expect(Favorites).toHaveBeenCalled();
  });
});
