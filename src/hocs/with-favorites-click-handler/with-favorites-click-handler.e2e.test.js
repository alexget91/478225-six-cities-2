import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withFavoritesClickHandler from "./with-favorites-click-handler";
import {getMockOfferTransformed} from "../../common/test-stubs";

Enzyme.configure({adapter: new Adapter()});

it(`HOC withFavoritesClickHandler set correct data to favorites click callback`, () => {
  const favoritesClickHandler = jest.fn();
  const MockComponent = () => <div/>;
  const MockComponentWrapped = withFavoritesClickHandler(MockComponent);

  const wrapper = shallow(<MockComponentWrapped
    offer={getMockOfferTransformed(1, ``, true)}
    onFavoritesClick={favoritesClickHandler}
  />);

  wrapper.instance()._favoritesClickHandler();

  expect(favoritesClickHandler).toHaveBeenCalledTimes(1);
  expect(favoritesClickHandler).toHaveBeenCalledWith(1, true);
});
