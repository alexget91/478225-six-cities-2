import React from "react";
import ReviewsItem from "../reviews-item/reviews-item";
import PropTypes from "prop-types";
import {reviewsList, sendingStatusType} from "../../common/global-prop-types";
import ReviewsForm from "../reviews-form/reviews-form";
import withReviewSending from "../../hocs/with-review-sending/with-review-sending";

const ReviewsFormWrapped = withReviewSending(ReviewsForm);

const Reviews = (props) => {
  const {offerID, reviews, reviewSendingStatus, isAuthorizationRequired, onCommentSubmit, onCommentSubmitSuccess} = props;

  return <section className="property__reviews reviews">
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
    <ul className="reviews__list">
      {reviews.map((review) => {
        return <ReviewsItem
          key={review.id}
          id={review.id}
          user={review.user}
          rating={Math.round(review.rating)}
          comment={review.comment}
          date={review.date}
        />;
      })}
    </ul>
    {isAuthorizationRequired ? null : <ReviewsFormWrapped
      offerID={offerID}
      sendingStatus={reviewSendingStatus}
      onSubmit={onCommentSubmit}
      onSubmitSuccess={onCommentSubmitSuccess}
    />}
  </section>;
};

Reviews.propTypes = {
  reviews: reviewsList.isRequired,
  offerID: PropTypes.number,
  reviewSendingStatus: sendingStatusType,
  isAuthorizationRequired: PropTypes.bool,
  onCommentSubmit: PropTypes.func,
  onCommentSubmitSuccess: PropTypes.func,
};

export default Reviews;
