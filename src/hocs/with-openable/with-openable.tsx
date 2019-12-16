import * as React from "react";

interface Props {
  [propName: string]: any
}

interface State {
  isVisible: boolean,
}

const withOpenable = (Component) => class WithOpenable extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    };

    this._handleVisibilityChange = this._handleVisibilityChange.bind(this);
    this._handleDocumentClick = this._handleDocumentClick.bind(this);
  }

  componentDidUpdate() {
    const {isVisible} = this.state;

    if (isVisible) {
      document.addEventListener(`click`, this._handleDocumentClick);
    }
  }

  render() {
    const {isVisible} = this.state;

    return <Component
      {...this.props}
      isVisible={isVisible}
      onVisibilityChange={this._handleVisibilityChange}
    />;
  }

  _handleDocumentClick() {
    this.setState({isVisible: false});
    document.removeEventListener(`click`, this._handleDocumentClick);
  }

  _handleVisibilityChange() {
    this.setState({isVisible: !this.state.isVisible});
  }
};

export default withOpenable;
