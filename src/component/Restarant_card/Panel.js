import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import restaurants from "../../defaultData";
import Card from "./Card";
import "./Panel.css";
import RatingPanel from "./RatingPanel";

function getRecommendation(user) {
  return restaurants;
}

function getReview() {
  return restaurants;
}

function Panel(props) {
  let showBanner;
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendation, setRecommendation] = useState([]);

  useEffect((userID) => {
    setRecommendation(getRecommendation(userID));
  }, props.userID);

  const restaurantList = recommendation.map((restaurant) => (
    <Card
      img={restaurant.img}
      name={restaurant.name}
      categories={restaurant.categories}
    />
  ));

  return (
    <div>
      <RatingPanel style={(showRecommendation)?{display:'none'}:{}}
        login={props.userID == null}
        restaurants={restaurants}
        closeRatingPanel={setShowRecommendation}
      ></RatingPanel>
      <div className="App">{restaurantList}</div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(Panel);
