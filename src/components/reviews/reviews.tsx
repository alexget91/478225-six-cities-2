import * as React from "react";
import ReviewsItem from "../reviews-item/reviews-item";
import ReviewsForm from "../reviews-form/reviews-form";
import withReviewSending from "../../hocs/with-review-sending/with-review-sending";
import {ReviewsList} from "../../common/types";
import {FormSendingStatus} from "../../common/constants";

interface Props {
  reviews: ReviewsList,
  offerID?: number,
  reviewSendingStatus?: FormSendingStatus,
  isAuthorizationRequired?: boolean,
  onCommentSubmit?: () => void,
  onCommentSubmitSuccess?: () => void,
}

const ReviewsFormWrapped = withReviewSending(ReviewsForm);

const Reviews = (props: Props) => {
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

export default Reviews;
