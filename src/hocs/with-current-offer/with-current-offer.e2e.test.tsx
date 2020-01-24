import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withCurrentOffer from "./with-current-offer";
import {getMockOffer} from "../../common/test-stubs";

Enzyme.configure({adapter: new Adapter()});

describe(`HOC withCurrentOffer`, () => {
  const MockComponent = () => <div/>;
  const MockComponentWrapped = withCurrentOffer(MockComponent);

  const mockOffers = [
    getMockOffer(1, ``),
    getMockOffer(2, ``),
    getMockOffer(3, ``),
    getMockOffer(4, ``),
    getMockOffer(5, ``),
  ];

  const wrapper = Enzyme.shallow(<MockComponentWrapped
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

  it(`Correctly set component props`, () => {
    expect(wrapper.props().offer).toEqual(mockOffers[1]);
    expect(wrapper.props().neighbourhood).toEqual([mockOffers[0], mockOffers[2], mockOffers[3]]);
  });
});
