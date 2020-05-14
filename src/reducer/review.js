import {START_REVIEW, MAKE_REVIEW} from '../action/review'

function review(state={}, action){
    switch(action.type){
        case START_REVIEW:
            return {
                restaurants: action.restaurants,
                review: [],
                remain: action.restaurants.length
            };
        case MAKE_REVIEW:
            let newReview = state.review.slice();
            newReview[action.reviewIdx] = action.score;
            return {
                ...state,
                review: newReview,
                remain: state.remain - 1
            };
        default:
            return state
    }
}

export default review;