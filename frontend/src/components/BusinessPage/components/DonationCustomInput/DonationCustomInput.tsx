import React from "react";

class DonationCustomInput extends React.Component<any, any> {
  state = {
    donation: "1",
    typing: false,
    typingTimeout: null,
    donationWidth: "36px",
  };

  componentDidMount() {
    this.props.setDonationAmountState(this.state.donation);
    this.props.handleCustomClrMatchingAmount(this.state.donation);
  }

  changeDonation = (event) => {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    const donationWidth = `${(event.target.value.length + 1) * 18}px`;
    this.setState(
      {
        donation: event.target.value,
        typing: false,
        donationWidth,
      },
      () => {
        this.setState({
          typingTimeout: setTimeout(() => {
            if (this.state.donation) {
              this.props.setDonationAmountState(this.state.donation);
              this.props.handleCustomClrMatchingAmount(this.state.donation);
            }
          }, 1000),
        });
      },
    );
  };

  render() {
    const { donation, donationWidth } = this.state;
    return (
      <input
        type="number"
        className="business-donation-custom-input-number"
        min="1"
        value={donation}
        style={{ width: donationWidth }}
        onChange={this.changeDonation}
      />
    );
  }
}

export default DonationCustomInput;
