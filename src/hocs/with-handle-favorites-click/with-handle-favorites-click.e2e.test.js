import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withHandleFavoritesClick from "./with-handle-favorites-click";
import {getMockOfferTransformed} from "../../common/test-stubs";

Enzyme.configure({adapter: new Adapter()});

it(`HOC withHandleFavoritesClick set correct data to favorites click callback`, () => {
  const handleFavoritesClick = jest.fn();
  const MockComponent = () => <div/>;
  const MockComponentWrapped = withHandleFavoritesClick(MockComponent);

  const wrapper = shallow(<MockComponentWrapped
    offer={getMockOfferTransformed(1, ``, true)}
    onFavoritesClick={handleFavoritesClick}
  />);

  wrapper.instance()._handleFavoritesClick();

  expect(handleFavoritesClick).toHaveBeenCalledTimes(1);
  expect(handleFavoritesClick).toHaveBeenCalledWith(1, true);
});
