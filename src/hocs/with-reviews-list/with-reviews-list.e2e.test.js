import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withReviewsList from "./with-reviews-list";
import {getMockOfferTransformed} from "../../common/test-stubs";

configure({adapter: new Adapter()});

it(`Calls callback to load review list for current offer`, () => {
  const MockComponent = () => <div/>;
  const MockComponentWrapped = withReviewsList(MockComponent);

  const loadReviewsHandler = jest.fn();
  shallow(<MockComponentWrapped
    offer={getMockOfferTransformed(1, ``)}
    loadReviews={loadReviewsHandler}
  />);

  expect(loadReviewsHandler).toHaveBeenCalledTimes(1);
  expect(loadReviewsHandler).toHaveBeenCalledWith(1);
});
