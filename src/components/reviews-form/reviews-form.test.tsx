import * as React from "react";
import * as renderer from "react-test-renderer";
import ReviewsForm from "./reviews-form";

describe(`Reviews form correctly renders after relaunch`, () => {
  it(`With data`, () => {
    const tree = renderer
      .create(<ReviewsForm
        rating={`4`}
        review={`comment`}
        onChange={jest.fn()}
        onSubmit={jest.fn()}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With submit enabled`, () => {
    const tree = renderer
      .create(<ReviewsForm
        isSubmitEnabled={true}
        onChange={jest.fn()}
        onSubmit={jest.fn()}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`When submitting`, () => {
    const tree = renderer
      .create(<ReviewsForm
        isSubmitting={true}
        onChange={jest.fn()}
        onSubmit={jest.fn()}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With submit enabled and submitting`, () => {
    const tree = renderer
      .create(<ReviewsForm
        isSubmitting={true}
        isSubmitEnabled={true}
        onChange={jest.fn()}
        onSubmit={jest.fn()}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
