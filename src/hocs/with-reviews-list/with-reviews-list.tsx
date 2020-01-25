import * as React from "react";
import {PlaceCard, ReviewsList} from "../../common/types";

interface ReviewsListProps {
  reviews?: ReviewsList,
}

interface Props {
  offer?: PlaceCard,
  reviews?: ReviewsList,
  loadReviews?: (offerID: number) => void,
}

const withReviewsList = (Component: React.FunctionComponent<ReviewsListProps>): React.ComponentType<Props> => {
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
