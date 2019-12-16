import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import ReviewsForm from "./reviews-form";

Enzyme.configure({adapter: new Adapter()});

const handleChange = jest.fn();
const handleSubmit = jest.fn();
const reviewsForm = Enzyme.mount(<ReviewsForm
  onChange={handleChange}
  onSubmit={handleSubmit}
/>);

describe(`Reviews form correctly calls callbacks`, () => {
  it(`On form submitting`, () => {
    reviewsForm.simulate(`submit`);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it(`On rating change`, () => {
    const ratingInput = reviewsForm.find(`.js-rating`).first();
    expect(ratingInput.length).toBe(1);

    ratingInput.simulate(`change`);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it(`On review change`, () => {
    const reviewInput = reviewsForm.find(`.js-review`);
    expect(reviewInput.length).toBe(1);

    reviewInput.simulate(`change`);
    expect(handleChange).toHaveBeenCalledTimes(2);
  });
});
