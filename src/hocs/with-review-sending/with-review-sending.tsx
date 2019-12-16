import * as React from "react";
import {FormSendingStatus} from "../../common/constants";

enum CommentLength {
  MIN = 50,
  MAX = 300,
}

interface Props {
  offerID: number,
  sendingStatus?: FormSendingStatus,
  onSubmit: (offerID: number, rating: number, review: string) => void,
  onSubmitSuccess: () => void,
}

interface State {
  rating: number,
  review: string,
  isSubmitEnabled: boolean,
}

const withReviewSending = (Component) => {
  class WithReviewSending extends React.PureComponent<Props, State> {
    private readonly defaultState: Readonly<State>;

    constructor(props) {
      super(props);

      this.defaultState = {
        rating: null,
        review: ``,
        isSubmitEnabled: false,
      };

      this.state = this.defaultState;

      this._checkSubmitPossibility = this._checkSubmitPossibility.bind(this);
      this._handleFormChange = this._handleFormChange.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
    }

    componentDidUpdate() {
      const {sendingStatus = FormSendingStatus.READY, onSubmitSuccess} = this.props;

      if (sendingStatus === FormSendingStatus.SUCCESS) {
        this.setState(this.defaultState, onSubmitSuccess);
      }
    }

    render() {
      return <Component
        {...this.props}
        rating={this.state.rating}
        review={this.state.review}
        isSubmitEnabled={this.state.isSubmitEnabled}
        isSubmitting={this.props.sendingStatus === FormSendingStatus.SENDING}
        onChange={this._handleFormChange}
        onSubmit={this._handleSubmit}
      />;
    }

    _handleFormChange(evt) {
      this.setState(Object.assign({}, this.state, {
        [evt.target.name]: evt.target.value
      }), this._checkSubmitPossibility);
    }

    _checkSubmitPossibility() {
      const {rating, review} = this.state;

      this.setState({
        isSubmitEnabled: Boolean(rating)
          && review.length >= CommentLength.MIN
          && review.length < CommentLength.MAX
      });
    }

    _handleSubmit(evt) {
      evt.preventDefault();

      const {onSubmit, offerID} = this.props;
      const {rating, review} = this.state;

      onSubmit(offerID, rating, review);
    }
  }

  return WithReviewSending;
};

export default withReviewSending;
