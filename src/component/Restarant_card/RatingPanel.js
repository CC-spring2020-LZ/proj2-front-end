import React, { useState } from "react";
import Dialog from "../Dialog/Dialog";
import RatingCard from "./RatingCard";

function RatingPanel(props) {
  const [index, nextRestaurant] = useState(0);
  const [showRestaurantCard, toggleShow] = useState(true);
  const restaurantCard = (
    <RatingCard
      classList="DialogContent Diaglog-card"
      img={props.restaurants[index].img}
      name={props.restaurants[index].name}
      categories={props.restaurants[index].categories}
      nextRestaurant = {nextRestaurant}
      index = {index}
    />
  );

  return (
    <div className="mask">
      <div className="mask-layer"></div>
      <div className="mask-banner">
        <h1 style={{ flex: "0 0 100%" }}>{props.showBanner}</h1>
        <button
          onClick={() => {
            toggleShow(true);
          }}
          style={{ background: "rgb(136,167,179)", color: "white" }}
          className="btn mask-button"
        >
          show it!
        </button>
      </div>
      <Dialog show={showRestaurantCard} toggleShow={toggleShow}>
        {restaurantCard}
      </Dialog>
    </div>
  );
}

export default RatingPanel;
