import * as React from "react";
import {getRatingPercent} from "../../common/utils";
import {ReviewItem} from "../../common/types";

const ReviewsItem = (props: ReviewItem) => {
  const {user, rating, comment, date} = props;

  const dateFormatter = new Intl.DateTimeFormat(`en`, {
    month: `long`,
    year: `numeric`,
  });

  return <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54"
          alt="Reviews avatar"/>
      </div>
      <span className="reviews__user-name">{user.name}</span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: getRatingPercent(rating) + `%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">{comment}</p>
      <time className="reviews__time" dateTime={date}>{dateFormatter.format(new Date(date))}</time>
    </div>
  </li>;
};

export default ReviewsItem;
