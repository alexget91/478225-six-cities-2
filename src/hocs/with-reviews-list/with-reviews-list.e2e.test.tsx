import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withReviewsList from "./with-reviews-list";
import {getMockOffer} from "../../common/test-stubs";

configure({adapter: new Adapter()});

it(`Calls callback to load review list for current offer`, () => {
  const MockComponent = () => <div/>;
  const MockComponentWrapped = withReviewsList(MockComponent);

  const handleLoadReviews = jest.fn();
  shallow(<MockComponentWrapped
    offer={getMockOffer(1, ``)}
    loadReviews={handleLoadReviews}
  />);

  expect(handleLoadReviews).toHaveBeenCalledTimes(1);
  expect(handleLoadReviews).toHaveBeenCalledWith(1);
});
