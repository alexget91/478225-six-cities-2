import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withReviewSending from "./with-review-sending";
import {FormSendingStatus} from "../../common/constants";

interface Props {
  rating?: string,
  review?: string,
  onChange: () => void,
  onSubmit: () => void,
}

Enzyme.configure({adapter: new Adapter()});

describe(`HOC withReviewSending`, () => {
  const MockComponent = (props: Props) => {
    const {onChange, onSubmit} = props;
    return <form className="js-form" onSubmit={onSubmit}>
      <input className="js-rating" onChange={onChange}/>
      <input className="js-review" onChange={onChange}/>
    </form>;
  };

  const MockComponentWrapped = withReviewSending(MockComponent);

  const handleSubmit = jest.fn();
  const handleSubmitSuccess = jest.fn();
  const wrapper = Enzyme.mount(<MockComponentWrapped
    offerID={1}
    sendingStatus={FormSendingStatus.READY}
    onSubmit={handleSubmit}
    onSubmitSuccess={handleSubmitSuccess}
  />);

  const form = wrapper.find(`.js-form`);
  const reviewInput = wrapper.find(`.js-review`);
  const ratingInput = wrapper.find(`.js-rating`);

  it(`Render component correctly`, () => {
    expect(form.length).toBe(1);
    expect(reviewInput.length).toBe(1);
    expect(ratingInput.length).toBe(1);
  });

  describe(`Change state correctly`, () => {
    it(`When review changed`, () => {
      reviewInput.simulate(`change`, {
        target: {
          name: `review`,
          value: `comment`,
        }
      });

      expect(wrapper.state().review).toEqual(`comment`);
    });

    it(`When rating changed`, () => {
      ratingInput.simulate(`change`, {
        target: {
          name: `rating`,
          value: `2`,
        }
      });

      expect(wrapper.state().rating).toEqual(`2`);
    });

    it(`When "submit enabled" changed`, () => {
      wrapper.setState({
        review: `11111111111111111111111111111111111111111111111111`,
      });

      ratingInput.simulate(`change`);
      expect(wrapper.state().isSubmitEnabled).toEqual(true);
    });
  });

  it(`Calls submit callback with correct data`, () => {
    form.simulate(`submit`);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith(1, `2`, `11111111111111111111111111111111111111111111111111`);
  });

  it(`Calls callback when submit success`, () => {
    wrapper.setProps({sendingStatus: FormSendingStatus.SUCCESS});
    expect(handleSubmitSuccess).toHaveBeenCalled();
  });
});
