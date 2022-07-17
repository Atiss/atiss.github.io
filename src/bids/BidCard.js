import React from "react";
import { useInView } from "react-intersection-observer";

const BidCard = (props) => {
  const [ref, inView] = useInView();
  return <div className="card-wrapper" ref={ref} onClick={props.onClick}>
    {inView ?
      <div className="card" >
        <div className="card__title">{props.client.name}</div>
        <div className="card__description">
          <div>{props.bid.type === "delivery" ? "Доставка" : "Забор"}</div>
          <div className={props.bid.type === "delivery" ? "card__description-arrow-right" : "card__description-arrow-left"}></div>
          <div>Цена: {props.bid.price}</div>
        </div>
      </div>
      : null}
  </div>
};

export default BidCard;