import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withCurrentOffer from "./with-current-offer";
import {getMockOfferTransformed} from "../../common/test-stubs";

Enzyme.configure({adapter: new Adapter()});

describe(`HOC withCurrentOffer`, () => {
  const MockComponent = () => <div/>;
  const MockComponentWrapped = withCurrentOffer(MockComponent);

  const mockOffers = [
    getMockOfferTransformed(1, ``),
    getMockOfferTransformed(2, ``),
  ];

  const wrapper = shallow(<MockComponentWrapped
    match={{params: {id: `1`}}}
    offers={mockOffers}
  />);

  it(`Correctly set current offer`, () => {
    expect(wrapper.state().offer).toEqual(mockOffers[0]);
  });

  it(`Correctly change current offer`, () => {
    wrapper.setProps({
      match: {params: {id: `2`}}
    });
    expect(wrapper.state().offer).toEqual(mockOffers[1]);
  });
});
