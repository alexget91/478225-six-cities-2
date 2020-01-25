import * as React from "react";

interface Props {
  rating?: string,
  review?: string,
  isSubmitEnabled?: boolean,
  isSubmitting?: boolean,
  onChange: () => void,
  onSubmit: () => void,
}

type RatingText = {
  [id: number]: string
}

const RatingText: RatingText = {
  1: `terribly`,
  2: `badly`,
  3: `not bad`,
  4: `good`,
  5: `perfect`,
};

const ratingOrder = Object.keys(RatingText).sort((a: string, b: string): number => parseInt(b) - parseInt(a));

const ReviewsForm = (props: Props): React.ReactElement => {
  const {rating, review, isSubmitEnabled, isSubmitting, onChange, onSubmit} = props;

  return <form className="reviews__form form" method="post" onSubmit={onSubmit}>
    <label className="reviews__label form__label" htmlFor="review">Your review</label>
    <div className="reviews__rating-form form__rating">
      {ratingOrder.map((value: string) => <React.Fragment key={value}>
        <input className="form__rating-input visually-hidden js-rating" name="rating" value={value} id={`${value}-stars`}
          type="radio" disabled={isSubmitting} checked={rating === value} onChange={onChange}/>
        <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={RatingText[value]}>
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </React.Fragment>)}
    </div>
    <textarea className="reviews__textarea form__textarea js-review" id="review" name="review" value={review} onChange={onChange}
      placeholder="Tell how was your stay, what you like and what can be improved" disabled={isSubmitting}/>
    <div className="reviews__button-wrapper">
      <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe
        your stay with at least <b className="reviews__text-amount">50 characters</b>.
      </p>
      <button className="reviews__submit form__submit button" type="submit" disabled={!isSubmitEnabled || isSubmitting}>
        {isSubmitting ? `Submitting...` : `Submit`}
      </button>
    </div>
  </form>;
};

export default ReviewsForm;
