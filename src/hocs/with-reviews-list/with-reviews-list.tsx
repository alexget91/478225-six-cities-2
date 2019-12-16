import * as React from "react";
import {PlaceCard, ReviewsList} from "../../common/types";

interface Props {
  offer?: PlaceCard,
  reviews?: ReviewsList,
  loadReviews?: () => void,
}

const withReviewsList = (Component) => {
  class WithReviewsList extends React.PureComponent<Props, null> {
    constructor(props) {
      super(props);

      props.loadReviews(props.offer.id);
    }

    render() {
      return <Component
        {...this.props}
        reviews={this.props.reviews}
      />;
    }
  }

  return WithReviewsList;
};

export default withReviewsList;
