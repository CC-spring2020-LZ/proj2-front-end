import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import restaurants from "../../defaultData";
import Card from "./Card";
import "./Panel.css";
import RatingPanel from "./RatingPanel";

function getReview() {
  return restaurants;
}

function Panel(props) {
  let showBanner;
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendation, setRecommendation] = useState([]);

  const getRecommendation = (user, setRecommendation) => {
    let restaurantsPromiseArr = restaurants.map((restaurant) => {
      return fetch(
        "http://ec2-3-83-164-100.compute-1.amazonaws.com:8088/yelp-fusion/requestRecommendByID.do",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `restaurantID=${restaurant.business_id}`,
        }
      ).then((response) => response.json());
    });
    Promise.all(restaurantsPromiseArr).then((rawRestaurantsArr) => {
      let restaurantsJSON = rawRestaurantsArr.map((rawRestaurant) => {
        let data = rawRestaurant.data
        return JSON.parse(data);
      });
      setRecommendation(restaurantsJSON);
    });
  };

  useEffect((userID) => {
    getRecommendation(userID, setRecommendation);
  }, []);

  const restaurantList = recommendation.map((restaurant, index) => (
    <Card
      key = {restaurants[index].business_id}
      img={restaurant.image_url}
      name={restaurant.name}
      categories={restaurant.categories}
      url={restaurant.url}
    />
  ));

  return (
    <div>
      <RatingPanel
        style={showRecommendation ? { display: "none" } : {}}
        login={props.userID == null}
        restaurants={recommendation}
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
