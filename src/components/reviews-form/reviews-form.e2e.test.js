import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReviewsForm from "./reviews-form";

Enzyme.configure({adapter: new Adapter()});

const changeHandler = jest.fn();
const submitHandler = jest.fn();
const reviewsForm = mount(<ReviewsForm
  onChange={changeHandler}
  onSubmit={submitHandler}
/>);

describe(`Reviews form correctly calls callbacks`, () => {
  it(`On form submitting`, () => {
    reviewsForm.simulate(`submit`);
    expect(submitHandler).toHaveBeenCalledTimes(1);
  });

  it(`On rating change`, () => {
    const ratingInput = reviewsForm.find(`.js-rating`).first();
    expect(ratingInput.length).toBe(1);

    ratingInput.simulate(`change`);
    expect(changeHandler).toHaveBeenCalledTimes(1);
  });

  it(`On review change`, () => {
    const reviewInput = reviewsForm.find(`.js-review`);
    expect(reviewInput.length).toBe(1);

    reviewInput.simulate(`change`);
    expect(changeHandler).toHaveBeenCalledTimes(2);
  });
});
