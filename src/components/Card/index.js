import React from "react";
import "./style.css";

const Card = props => (
  <div className="card-wrapper" onClick={() => props.clickCount(props.id)}>
    <img src={props.image} alt={props.id}></img>
  </div>
);

export default Card;
