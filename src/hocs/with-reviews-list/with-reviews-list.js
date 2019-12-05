import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {placeCard, reviewsList} from "../../common/global-prop-types";

const withReviewsList = (Component) => {
  class WithReviewsList extends PureComponent {
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

  WithReviewsList.propTypes = {
    offer: PropTypes.exact(placeCard),
    reviews: reviewsList,
    loadReviews: PropTypes.func,
  };

  return WithReviewsList;
};

export default withReviewsList;
