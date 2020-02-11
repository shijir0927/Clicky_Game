import React from "react";
import "./style.css";

class Popup extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup\_inner">
          <h1>{this.props.text}</h1>
          <h2 className="loose-score">Your Score: {this.props.score}</h2>
          <button className="popup-btn" onClick={this.props.closePopup}>
            OK
          </button>
        </div>
      </div>
    );
  }
}

export default Popup;
