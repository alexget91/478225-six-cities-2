import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {FormSendingStatus} from "../../common/constants";
import Settings from "../../common/settings";
import {sendingStatusType} from "../../common/global-prop-types";

const withReviewSending = (Component) => {
  class WithReviewSending extends PureComponent {
    constructor(props) {
      super(props);

      this.defaultState = {
        rating: null,
        review: ``,
        isSubmitEnabled: false,
      };

      this.state = this.defaultState;

      this._formChangeHandler = this._formChangeHandler.bind(this);
      this._checkSubmitPossibility = this._checkSubmitPossibility.bind(this);
      this._submitHandler = this._submitHandler.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        rating={this.state.rating}
        review={this.state.review}
        isSubmitEnabled={this.state.isSubmitEnabled}
        isSubmitting={this.props.sendingStatus === FormSendingStatus.SENDING}
        onChange={this._formChangeHandler}
        onSubmit={this._submitHandler}
      />;
    }

    componentDidUpdate() {
      const {sendingStatus, onSubmitSuccess} = this.props;

      if (sendingStatus === FormSendingStatus.SUCCESS) {
        this.setState(this.defaultState, onSubmitSuccess);
      }
    }

    _formChangeHandler(evt) {
      this.setState({
        [evt.target.name]: evt.target.value
      }, this._checkSubmitPossibility);
    }

    _checkSubmitPossibility() {
      const {rating, review} = this.state;

      this.setState({
        isSubmitEnabled: Boolean(rating)
          && review.length >= Settings.COMMENT_LENGTH_MIN
          && review.length < Settings.COMMENT_LENGTH_MAX
      });
    }

    _submitHandler(evt) {
      evt.preventDefault();

      const {onSubmit, offerID} = this.props;
      const {rating, review} = this.state;

      onSubmit(offerID, rating, review);
    }
  }

  WithReviewSending.defaultProps = {
    sendingStatus: FormSendingStatus.READY
  };

  WithReviewSending.propTypes = {
    offerID: PropTypes.number.isRequired,
    sendingStatus: sendingStatusType,
    onSubmit: PropTypes.func.isRequired,
    onSubmitSuccess: PropTypes.func.isRequired,
  };

  return WithReviewSending;
};

export default withReviewSending;
