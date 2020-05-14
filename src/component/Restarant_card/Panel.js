import React from "react";
import { connect } from "react-redux";
import restaurants from "../../defaultData";
import Card from "./Card";
import "./Panel.css";
import RatingPanel from './RatingPanel'

function panel(props) {
  let showBanner;
  let showRecommdation = false;

  // No login
  if (props.user.userName == null) {
    showBanner = (
      <div className="mask-banner">
        You should log in before you check your recommandation
      </div>
    );
  }
  // Didn't finish the review
  else if (props.review.remain > 0) {
    showBanner = (
      <div>
        <div className="mask-banner">
          You have to finish your initial review, {props.review.remain} businesses
          remained
        </div>
      </div>
    );
  } else {
    //User has logged in and given all the initial review.
    showRecommdation = true;
  }

  const restaurantList = restaurants.map((restaurant) => (
    <Card 
      img={restaurant.img}
      name={restaurant.name}
      categories={restaurant.categories}
    />
  ));

  console.log(showRecommdation);

  if (!showRecommdation) {
    return (
      <div>
        <RatingPanel showBanner={showBanner} restaurants = {restaurants}></RatingPanel>
        <div className="App">{restaurantList}</div>
      </div>
    );
  } else {
    return <div className="App">{restaurantList}</div>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    review: state.review,
  };
}

function mapDispatchToProps(state) {}

export default connect(mapStateToProps, mapDispatchToProps)(panel);
